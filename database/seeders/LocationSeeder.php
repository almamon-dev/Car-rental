<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['name' => 'Banani Branch', 'city' => 'Dhaka'],
            ['name' => 'Gulshan Terminal', 'city' => 'Dhaka'],
            ['name' => 'Uttara Hub', 'city' => 'Dhaka'],
            ['name' => 'Chittagong Port', 'city' => 'Chittagong'],
            ['name' => 'Sylhet Airport', 'city' => 'Sylhet'],
        ];

        foreach ($locations as $location) {
            \App\Models\Location::create($location);
        }
    }
}
