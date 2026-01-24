<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Car;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'user@gmail.com')->first();
        if (! $user) {
            return;
        }

        $cars = Car::all();
        if ($cars->isEmpty()) {
            return;
        }

        // 1. Confirmed Booking (Active)
        $booking1 = Booking::create([
            'user_id' => $user->id,
            'car_id' => $cars[0]->id,
            'start_date' => Carbon::now()->addDays(2),
            'end_date' => Carbon::now()->addDays(5),
            'pickup_location' => 'Dhaka Airport Hub',
            'dropoff_location' => 'Dhaka Airport Hub',
            'status' => 'confirmed',
        ]);

        Payment::create([
            'booking_id' => $booking1->id,
            'amount' => 15000,
            'status' => 'completed',
            'payment_method' => 'Visa Card',
            'transaction_id' => 'TXN_'.rand(100000, 999999),
        ]);

        // 2. Completed Booking (History)
        $booking2 = Booking::create([
            'user_id' => $user->id,
            'car_id' => $cars[1]->id ?? $cars[0]->id,
            'start_date' => Carbon::now()->subDays(10),
            'end_date' => Carbon::now()->subDays(7),
            'pickup_location' => 'Banani Executive Center',
            'dropoff_location' => 'Uttara Hub',
            'status' => 'completed',
        ]);

        Payment::create([
            'booking_id' => $booking2->id,
            'amount' => 8500,
            'status' => 'completed',
            'payment_method' => 'bKash',
            'transaction_id' => 'TXN_'.rand(100000, 999999),
        ]);

        // 3. Pending/Incoming Booking
        Booking::create([
            'user_id' => $user->id,
            'car_id' => $cars[2]->id ?? $cars[0]->id,
            'start_date' => Carbon::now()->addDays(15),
            'end_date' => Carbon::now()->addDays(18),
            'pickup_location' => 'Gulshan Plaza',
            'dropoff_location' => 'Gulshan Plaza',
            'status' => 'pending',
        ]);

        // 4. Favorites
        $user->favorites()->create(['car_id' => $cars[3]->id ?? $cars[0]->id]);
        $user->favorites()->create(['car_id' => $cars[4]->id ?? $cars[0]->id]);
    }
}
