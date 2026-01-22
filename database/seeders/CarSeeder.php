<?php

namespace Database\Seeders;

use App\Helpers\Helper;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $total = 15;
        $chunkSize = 5;

        for ($i = 1; $i <= $total; $i++) {

            $carId = DB::table('cars')->insertGetId([
                'brand_id' => rand(1, 5),
                'category_id' => rand(1, 4),
                'make' => 'Brand '.$i,
                'model' => 'Model '.$i,
                'year' => rand(2019, 2024),
                'rental_type' => 'daily',
                'description' => 'This vehicle is well-maintained and designed to provide a smooth, comfortable, and reliable driving experience.',
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $this->insertRelatedData($carId, $i);

            $allImages = [
                'pexels-bylukemiller-34985779.jpg', 'pexels-denniz-futalan-339724-13118999.jpg',
                'pexels-freestockpro-376729.jpg', 'pexels-hazardos-804130.jpg', 'pexels-ingo-13781.jpg',
                'pexels-ingo-543605.jpg', 'pexels-introspectivedsgn-19410463.jpg', 'pexels-ishankulshrestha69-7126208.jpg',
                'pexels-jan-reichelt-911302335-30313725.jpg', 'pexels-jarod-8454084.jpg', 'pexels-junpei-337114116-16101088.jpg',
                'pexels-karola-g-4870690.jpg', 'pexels-mateusz-dach-99805-1135379.jpg', 'pexels-mikebirdy-100651.jpg',
                'pexels-mikebirdy-100653.jpg', 'pexels-mikebirdy-100654.jpg', 'pexels-mikebirdy-100656.jpg',
                'pexels-mikebirdy-116675.jpg', 'pexels-mikebirdy-170811.jpg', 'pexels-mikebirdy-195632.jpg',
                'pexels-mikebirdy-244206.jpg', 'pexels-mikebirdy-244818.jpg',
                'pexels-mikebirdy-441179.jpg', 'pexels-mikebirdy-810357.jpg',
                'pexels-mikebirdy-1007410.jpg', 'pexels-mikebirdy-1104768.jpg', 'pexels-mohit-hambiria-92377455-20123590.jpg',
                'pexels-pripicart-620335.jpg', 'pexels-rpnickson-2526128.jpg', 'pexels-sofianunezph-18167805.jpg',
                'pexels-wolfart-10822041.jpg',
            ];

            $selectedImages = Arr::random($allImages, 3);

            foreach ($selectedImages as $imgName) {
                $sourcePath = public_path('images/cars/'.$imgName);

                if (File::exists($sourcePath)) {
                    $file = new UploadedFile(
                        $sourcePath,
                        $imgName,
                        mime_content_type($sourcePath),
                        null,
                        true
                    );

                    $uploadData = Helper::uploadFile($file, 'cars/gallery', true);

                    if ($uploadData) {
                        DB::table('car_images')->insert([
                            'car_id' => $carId,
                            'file_path' => $uploadData['original'],
                            'thumbnail_path' => $uploadData['thumbnail'],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }

            if ($i % $chunkSize == 0) {
                $this->command->info("Inserted $i cars with optimized WebP images...");
            }
        }
    }

    private function insertRelatedData($carId, $i)
    {
        // Specifications
        DB::table('car_specifications')->insert([
            'car_id' => $carId,
            'transmission' => 'Automatic',
            'mileage' => '12 km/l',
            'fuel_type' => 'Petrol',
            'steering' => 'Power',
            'model_year' => 2022,
            'vehicle_type' => 'Sedan',
            'engine_capacity' => '1800cc',
            'color' => 'White',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        // Pricing
        DB::table('car_price_details')->insert([
            'car_id' => $carId,
            'daily_rate' => rand(40, 120),
            'weekly_rate' => rand(250, 800),
            'monthly_rate' => rand(900, 3000),
            'security_deposit' => rand(200, 800),
            'tax_percentage' => 5,
            'currency' => 'USD',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        // Documents
        DB::table('car_police_documents')->insert([
            'car_id' => $carId,
            'registration_number' => 'DHA-'.(1000 + $i).rand(10, 99),
            'chassis_number' => 'CHS-'.strtoupper(uniqid()),
            'engine_number' => 'ENG-'.strtoupper(uniqid()),
            'tax_token_expiry' => now()->addYears(2),
            'fitness_expiry' => now()->addYears(2),
            'created_at' => now(), 'updated_at' => now(),
        ]);
    }
}
