<?php

namespace App\Http\Controllers\User\Booking;

use App\Http\Controllers\Controller;
use App\Models\Payment;
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
        ]);

        try {
            $result = $this->paymentService->initiateSslCommerzPayment($request->amount, $request->car_id);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function sslCommerzSuccess(Request $request)
    {
        // SSLCommerz returns data in POST
        $data = $request->all();
        
        $tran_id = $data['tran_id'] ?? null;
        if ($tran_id) {
            $parts = explode('_', $tran_id);
            if ($parts[0] === 'car' && isset($parts[1])) {
                $carId = $parts[1];
                $amount = $data['amount'] ?? 0;
                
                $this->paymentService->finalizeTransaction([
                    'car_id' => $carId,
                    'amount' => $amount,
                    'method' => 'sslcommerz',
                    'transaction_id' => $data['bank_tran_id'] ?? $tran_id,
                ]);

                return Inertia::render('User/Payments/Success', [
                    'data' => [
                        'transaction_id' => $data['bank_tran_id'] ?? $tran_id,
                        'amount' => $amount,
                    ]
                ]);
            }
        }

        return Inertia::render('User/Payments/Failure', [
            'status' => 'fail',
            'message' => 'Payment validation failed or invalid data received.'
        ]);
    }

    public function sslCommerzFail(Request $request)
    {
        return Inertia::render('User/Payments/Failure', [
            'status' => 'fail',
            'message' => 'The payment transaction was unsuccessful. Please check your bank status.'
        ]);
    }

    public function sslCommerzCancel(Request $request)
    {
        return Inertia::render('User/Payments/Failure', [
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
