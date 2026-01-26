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
    /**
     * Handle SSLCommerz Payment Initiation
     * Follows the "Order First" pattern: Create Pending -> Pay -> Update Status
     */
    public function initiateSslCommerzPayment(array $data)
    {
        $user = Auth::user();
        $carId = $data['car_id'];
        $amount = $data['amount'];
        $startDate = $data['start_date'];
        $endDate = $data['end_date'];
        
        // 1. Generate Unique Transaction ID
        $tran_id = 'car_' . $carId . '_' . uniqid();

        // 2. Create Pending Booking & Payment in DB FIRST
        DB::beginTransaction();
        try {
            $booking = Booking::create([
                'user_id' => $user->id,
                'car_id' => $carId,
                'start_date' => $startDate,
                'end_date' => $endDate,
                // Assuming defaults for location if not provided
                'pickup_location' => 'Dhaka', 
                'dropoff_location' => 'Dhaka',
                'total_price' => $amount,
                'status' => 'pending', // Initial status
            ]);

            Payment::create([
                'booking_id' => $booking->id,
                'amount' => $amount,
                'status' => 'pending',
                'payment_method' => 'sslcommerz',
                'transaction_id' => $tran_id,
            ]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new \Exception("Failed to create pending order: " . $e->getMessage());
        }

        // 3. Prepare SSLCommerz Data
        $post_data = [
            'total_amount' => $amount,
            'currency' => 'BDT',
            'tran_id' => $tran_id,
            'cus_name' => $user->name,
            'cus_email' => $user->email,
            'cus_add1' => 'Dhaka',
            'cus_city' => 'Dhaka',
            'cus_country' => 'Bangladesh',
            'cus_phone' => $user->phone ?? '01700000000',
            'cus_postcode' => '1000',
            'shipping_method' => 'NO',
            'product_name' => 'Car Rental',
            'product_category' => 'Service',
            'product_profile' => 'non-physical-goods',
            'value_a' => $user->id, // Fallback user tracking
        ];

        try {
            $sslc = new SslCommerzNotification;
            $payment_options = $sslc->makePayment($post_data, 'checkout', 'json');

            if (is_string($payment_options)) {
                $payment_options = json_decode($payment_options, true);
            }

            if (is_array($payment_options) && isset($payment_options['status']) && ($payment_options['status'] === 'success' || $payment_options['status'] === 'SUCCESS')) {
                return [
                    'status' => 'success',
                    'GatewayPageURL' => $payment_options['data'],
                ];
            }

            $errorMessage = isset($payment_options['message']) ? $payment_options['message'] : 'SSLCommerz Initiation Failed';
            throw new \Exception($errorMessage);
        } catch (\Exception $e) {
            Log::error('SSLCommerz Error: '.$e->getMessage());
            // Optionally delete the pending booking if initiation fails entirely
            throw new \Exception('SSLCommerz Error: '.$e->getMessage());
        }
    }

    /**
     * Validate and Complete Transaction after success return
     */
    public function validateAndCompleteTransaction($tran_id, $amount, $currency = 'BDT', $post_data = [])
    {
        $sslc = new SslCommerzNotification;
        
        Log::info("Attempting validation for Tran ID: $tran_id", [
            'amount' => $amount,
            'currency' => $currency,
            'post_data' => $post_data
        ]);

        // Validate with SSLCommerz Server
        $validation = $sslc->orderValidate($post_data, $tran_id, $amount, $currency);

        Log::info("Validation Result for $tran_id: " . ($validation ? 'Valid' : 'Invalid'));

        if ($validation) {
            // Transaction is Valid
            $payment = Payment::where('transaction_id', $tran_id)->first();

            if ($payment) {
                Log::info("Found payment record. Current Status: " . $payment->status);
                
                if ($payment->status == 'pending' || $payment->status == 'failed') {
                    DB::transaction(function () use ($payment) {
                        $payment->update(['status' => 'completed']);
                        
                        if ($payment->booking) {
                            $payment->booking->update(['status' => 'confirmed']);
                        }
                    });
                    Log::info("Payment and Booking updated to completed/confirmed.");
                    return true;
                } elseif ($payment->status == 'completed') {
                    Log::info("Payment already completed.");
                    return true; // Already processed
                }
            } else {
                Log::error("No payment record found for Tran ID: $tran_id");
            }
        } else {
             Log::error("SSLCommerz Validation Failed for Tran ID: $tran_id");
        }
        
        return false;
    }
}
