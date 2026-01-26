<?php

namespace App\Http\Controllers\User\Booking;

use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index()
    {
        $user = Auth::user();
        $payments = $user->payments()
            ->with(['booking.car.brand'])
            ->latest()
            ->get();

        return Inertia::render('User/Payments/Index', [
            'payments' => $payments,
            'stats' => [
                'total_bookings' => $user->bookings()->count(),
                'active_bookings' => $user->bookings()->where('status', 'confirmed')->count(),
            ],
        ]);
    }

    /**
     * Handle SSLCommerz Payment Initiation
     */
    public function sslCommerzPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Check Availability
        $isAvailable = !\App\Models\Booking::where('car_id', $request->car_id)
            ->whereIn('status', ['confirmed', 'pending'])
            ->where(function ($query) use ($request) {
                $query->where('start_date', '<', $request->end_date)
                      ->where('end_date', '>', $request->start_date);
            })
            ->exists();

        if (!$isAvailable) {
            return response()->json(['error' => 'Car is not available for the selected dates.'], 422);
        }

        session(['payment_user_id' => Auth::id()]);
        try {
            // Pass all necessary data to the service
            $result = $this->paymentService->initiateSslCommerzPayment([
                'amount' => $request->amount,
                'car_id' => $request->car_id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function sslCommerzSuccess(Request $request)
    {
        $data = $request->all();
        $tran_id = $data['tran_id'];
        $amount = $data['amount'];
        $currency = $data['currency'] ?? 'BDT';

        // Validate and complete
        $success = $this->paymentService->validateAndCompleteTransaction($tran_id, $amount, $currency, $data);

        if ($success) {
            // REDIRECT to the secure GET route to restore session
            return redirect()->route('user.payment.finish', ['status' => 'success', 'tran_id' => $tran_id, 'amount' => $amount]);
        }

        return redirect()->route('user.payment.finish', ['status' => 'fail', 'message' => 'Payment validation failed.']);
    }

    /**
     * Final GET route to show success/fail page with Authentication intact
     */
    public function paymentFinish(Request $request)
    {
        $status = $request->query('status');
        $tran_id = $request->query('tran_id');
        
        // 1. Force Restore Login if Session Missing
        if (!Auth::check() && $tran_id) {
            $payment = \App\Models\Payment::with('booking.user')
                ->where('transaction_id', $tran_id)
                ->first();
                
            if ($payment && $payment->booking && $payment->booking->user) {
                Auth::login($payment->booking->user);
            }
        }

        // 2. Ensure User is Logged In
        $user = Auth::user();
        if (!$user) return redirect()->route('login');

        if ($status === 'success') {
            // 3. Security Check
            $payment = \App\Models\Payment::where('transaction_id', $tran_id)->first();
            
            if (!$payment || !$payment->booking || $payment->booking->user_id !== $user->id) {
                return redirect()->route('dashboard')->with('error', 'Unauthorized access.');
            }

            return Inertia::render('User/Payments/Success', [
                'data' => [
                    'transaction_id' => $tran_id,
                    'amount' => $payment->amount,
                ],
                // CRITICAL FIX: Manually pass the fresh user to frontend 
                // because Middleware ran BEFORE we logged in!
                'auth' => [
                    'user' => $user
                ]
            ]);
        }

        return Inertia::render('User/Payments/Failure', [
            'status' => $status ?? 'fail',
            'message' => $request->query('message') ?? 'Payment transaction failed.',
            // Pass auth here too just in case
            'auth' => [
                'user' => $user
            ]
        ]);
    }


    public function sslCommerzFail(Request $request)
    {
        $tran_id = $request->input('tran_id');
        
        // Mark as failed in DB
        $payment = \App\Models\Payment::where('transaction_id', $tran_id)->first();
        if ($payment) {
            $payment->update(['status' => 'failed']);
            if($payment->booking) $payment->booking->update(['status' => 'cancelled']);
        }

        return redirect()->route('user.payment.finish', [
            'status' => 'fail', 
            'message' => 'The payment transaction was unsuccessful. Please check your bank status.'
        ]);
    }

    public function sslCommerzCancel(Request $request)
    {
        $tran_id = $request->input('tran_id');

        // Mark as canceled in DB
        $payment = \App\Models\Payment::where('transaction_id', $tran_id)->first();
        if ($payment) {
            $payment->update(['status' => 'canceled']);
            if($payment->booking) $payment->booking->update(['status' => 'cancelled']);
        }

        return redirect()->route('user.payment.finish', [
            'status' => 'cancel',
            'message' => 'You have cancelled the payment process. No charges were made.'
        ]);
    }

    public function sslCommerzIpn(Request $request)
    {
        // Log IPN for debugging
        Log::info('SSLCommerz IPN Received:', $request->all());
        return response()->json(['status' => 'success']);
    }
}
