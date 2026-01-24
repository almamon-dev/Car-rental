<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PaymentService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Create a Stripe Payment Intent
     */
    public function createStripeIntent($amount, $carId)
    {
        try {
            return PaymentIntent::create([
                'amount' => $amount * 100, // Cents
                'currency' => 'bdt',
                'metadata' => [
                    'car_id' => $carId,
                    'user_id' => Auth::id(),
                ],
            ]);
        } catch (\Exception $e) {
            throw new \Exception("Stripe Error: " . $e->getMessage());
        }
    }

    /**
     * Handle bKash Payment (Placeholder for actual API integration)
     */
    public function initiateBkashPayment($amount, $carId, $phone)
    {
        // Integration logic for bKash would go here
        // For now, we simulate a successful initiation
        return [
            'status' => 'success',
            'message' => 'bKash payment initiated for +88' . $phone,
            'amount' => $amount
        ];
    }

    /**
     * Handle Nagad Payment (Placeholder for actual API integration)
     */
    public function initiateNagadPayment($amount, $carId, $phone)
    {
        // Integration logic for Nagad would go here
        return [
            'status' => 'success',
            'message' => 'Nagad payment initiated for +88' . $phone,
            'amount' => $amount
        ];
    }

    /**
     * Finalize the booking and payment record after successful transaction
     */
    public function finalizeTransaction($data)
    {
        return DB::transaction(function () use ($data) {
            // 1. Create Booking
            $booking = Booking::create([
                'user_id' => Auth::id(),
                'car_id' => $data['car_id'],
                'start_date' => now(), // Placeholder, should come from request
                'end_date' => now()->addDays(1),
                'total_price' => $data['amount'],
                'status' => 'confirmed'
            ]);

            // 2. Create Payment Record
            Payment::create([
                'booking_id' => $booking->id,
                'amount' => $data['amount'],
                'status' => 'completed',
                'payment_method' => $data['method'],
                'transaction_id' => $data['transaction_id'] ?? 'TRX-' . uniqid(),
            ]);

            return $booking;
        });
    }
}
