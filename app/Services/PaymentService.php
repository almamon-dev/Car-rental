<?php

namespace App\Services;

use App\Library\SslCommerz\SslCommerzNotification;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    /**
     * Handle SSLCommerz Payment Initiation
     */
    public function initiateSslCommerzPayment($amount, $carId)
    {
        $user = Auth::user();
        $tran_id = 'car_'.$carId.'_'.time();

        $post_data = [
            'total_amount' => $amount,
            'currency' => 'BDT',
            'tran_id' => $tran_id,
            'cus_name' => $user->name,
            'cus_email' => $user->email,
            'cus_add1' => 'Dhaka',
            'cus_city' => 'Dhaka',
            'cus_country' => 'Bangladesh',
            'cus_phone' => $user->phone ?? '01XXXXXXXXX',
            'cus_postcode' => '1000',
            'shipping_method' => 'NO',
            'product_name' => 'Car Rental',
            'product_category' => 'Service',
            'product_profile' => 'non-physical-goods',
        ];

        try {
            $sslc = new SslCommerzNotification;
            $payment_options = $sslc->makePayment($post_data, 'checkout', 'json');

            // The library returns a JSON string when pattern is 'json'
            if (is_string($payment_options)) {
                $payment_options = json_decode($payment_options, true);
            }

            if (is_array($payment_options) && isset($payment_options['status']) && ($payment_options['status'] === 'success' || $payment_options['status'] === 'SUCCESS')) {
                return [
                    'status' => 'success',
                    'GatewayPageURL' => $payment_options['data'],
                ];
            }

            $errorMessage = isset($payment_options['message']) ? $payment_options['message'] : (is_string($payment_options) ? $payment_options : 'SSLCommerz Initiation Failed');

            throw new \Exception($errorMessage);
        } catch (\Exception $e) {
            Log::error('SSLCommerz Error: '.$e->getMessage());
            throw new \Exception('SSLCommerz Error: '.$e->getMessage());
        }
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
                'start_date' => now(), // Placeholder
                'end_date' => now()->addDays(1),
                'total_price' => $data['amount'],
                'status' => 'confirmed',
            ]);

            // 2. Create Payment Record
            Payment::create([
                'booking_id' => $booking->id,
                'amount' => $data['amount'],
                'status' => 'completed',
                'payment_method' => $data['method'],
                'transaction_id' => $data['transaction_id'] ?? 'TRX-'.uniqid(),
            ]);

            return $booking;
        });
    }
}
