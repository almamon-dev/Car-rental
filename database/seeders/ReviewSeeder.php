<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();
        $cars = \App\Models\Car::take(10)->get();

        foreach ($cars as $car) {
            foreach ($users as $user) {
                if (rand(0, 1)) {
                    \App\Models\CarReview::create([
                        'user_id' => $user->id,
                        'car_id' => $car->id,
                        'rating' => rand(4, 5),
                        'comment' => "Amazing car! The " . $car->model . " was very smooth and fuel efficient. Highly recommended for long trips.",
                        'is_verified' => true,
                        'status' => 'approved',
                    ]);
                }
            }
        }
    }
}
