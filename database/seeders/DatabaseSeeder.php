<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'is_admin' => true,
        ]);

        // Create Regular User
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'user@gmail.com',
            'is_admin' => false,
        ]);
        // -- seeder call
        $this->call([
            \Database\Seeders\SettingSeeder::class,
            \Database\Seeders\CategorySeeder::class,
            \Database\Seeders\BrandSeeder::class,
            \Database\Seeders\LocationSeeder::class,
            \Database\Seeders\CarSeeder::class,
            \Database\Seeders\BookingSeeder::class,
        ]);
    }
}
