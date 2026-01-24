<?php

namespace App\Http\Controllers\User\Booking;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Services\PaymentService;

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
     * Create Stripe Intent
     */
    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'car_id' => 'required|exists:cars,id',
        ]);

        try {
            $intent = $this->paymentService->createStripeIntent($request->amount, $request->car_id);
            return response()->json(['clientSecret' => $intent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Handle bKash Payment Initiation
     */
    public function bkashPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'car_id' => 'required|exists:cars,id',
            'phone' => 'required|string|min:11',
        ]);

        $result = $this->paymentService->initiateBkashPayment($request->amount, $request->car_id, $request->phone);
        return response()->json($result);
    }

    /**
     * Handle Nagad Payment Initiation
     */
    public function nagadPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'car_id' => 'required|exists:cars,id',
            'phone' => 'required|string|min:11',
        ]);

        $result = $this->paymentService->initiateNagadPayment($request->amount, $request->car_id, $request->phone);
        return response()->json($result);
    }

    /**
     * Finalize Transaction
     */
    public function success(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'car_id' => 'required|exists:cars,id',
            'method' => 'required|string',
            'transaction_id' => 'nullable|string'
        ]);

        try {
            $booking = $this->paymentService->finalizeTransaction($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Payment processed and booking confirmed',
                'booking_id' => $booking->id
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
