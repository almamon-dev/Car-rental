<?php

namespace Database\Seeders;

use App\Helpers\Helper;
use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        // Get existing brands and categories
        $brands = Brand::all();
        $categories = Category::all();

        if ($brands->isEmpty() || $categories->isEmpty()) {
            $this->command->error('Brands or Categories table is empty. Please seed them first.');

            return;
        }

        $carModels = [
            ['make' => 'Toyota', 'model' => 'Camry SE Hybrid', 'category' => 'Sedan'],
            ['make' => 'Honda', 'model' => 'Civic Type R', 'category' => 'Sports Car'],
            ['make' => 'BMW', 'model' => 'M4 Competition', 'category' => 'Coupe'],
            ['make' => 'Mercedes-Benz', 'model' => 'S-Class S580', 'category' => 'Luxury Car'],
            ['make' => 'Audi', 'model' => 'RS7 Sportback', 'category' => 'Luxury Car'],
            ['make' => 'Tesla', 'model' => 'Model XL Plaid', 'category' => 'Electric Vehicle'],
            ['make' => 'Ford', 'model' => 'Mustang Dark Horse', 'category' => 'Sports Car'],
            ['make' => 'Nissan', 'model' => 'GT-R NISMO', 'category' => 'Sports Car'],
            ['make' => 'Land Rover', 'model' => 'Defender 110 V8', 'category' => 'Off-Road Vehicle'],
            ['make' => 'Porsche', 'model' => '911 Turbo S', 'category' => 'Sports Car'],
            ['make' => 'Lamborghini', 'model' => 'Urus Performante', 'category' => 'SUV'],
            ['make' => 'Lexus', 'model' => 'LS 500h', 'category' => 'Luxury Car'],
            ['make' => 'Hyundai', 'model' => 'Ioniq 5 N', 'category' => 'Electric Vehicle'],
            ['make' => 'Kia', 'model' => 'EV6 GT', 'category' => 'Electric Vehicle'],
            ['make' => 'Chevrolet', 'model' => 'Corvette Z06', 'category' => 'Sports Car'],
        ];

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

        $total = 20; // Seeding 20 realistic cars

        for ($i = 0; $i < $total; $i++) {
            $modelData = $carModels[$i % count($carModels)];

            $brand = $brands->firstWhere('name', $modelData['make']);
            $category = $categories->firstWhere('name', $modelData['category']);

            $brandId = $brand ? $brand->id : $brands->random()->id;
            $categoryId = $category ? $category->id : $categories->random()->id;

            $transmission = Arr::random(['Automatic', 'Manual']);
            $fuelType = Arr::random(['Petrol', 'Hybrid', 'Electric', 'Diesel']);
            if ($modelData['category'] === 'Electric Vehicle') {
                $fuelType = 'Electric';
                $transmission = 'Automatic';
            }
            $baseRate = rand(150, 500) * 100;

            $car = \App\Models\Car::create([
                'brand_id' => $brandId,
                'category_id' => $categoryId,
                'location_id' => \App\Models\Location::inRandomOrder()->first()->id,
                'make' => $modelData['make'],
                'model' => $modelData['model'],
                'year' => rand(2023, 2025),
                'rental_type' => 'daily',
                'description' => "This is a premium {$modelData['make']} {$modelData['model']} available for executive rental. Perfect for business trips or luxury leisure. Maintained to Startech-grade standards.",
                'status' => 'available',
                'transmission' => $transmission,
                'seats' => Arr::random([2, 4, 5, 7]),
                'fuel_type' => $fuelType,
                'mileage' => rand(8, 18).' km/L (Combined)',
                'steering' => 'Precision Electronic Power Steering',
                'engine_capacity' => ($fuelType === 'Electric' ? 'Electric Drive' : rand(2000, 4800).'cc Displacement'),
                'color' => Arr::random(['Mineral White Metallic', 'Obsidion Black Pearl', 'Quicksilver Metallic', 'Deep Sea Blue Metallic', 'Guards Red Core', 'Daytona Grey Silk']),
                'daily_rate' => $baseRate,
                'weekly_rate' => $baseRate * 6,
                'monthly_rate' => $baseRate * 22,
                'currency' => '৳',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $carId = $car->id;

            $this->insertRelatedData($carId, $i, $modelData, $transmission, $fuelType, $baseRate);

            // Gallery Images - Optimized for large seeding
            // For first 20 cars, we do real uploads, then reuse paths
            static $uploadedPaths = [];

            if (count($uploadedPaths) < 15) {
                $selectedImages = Arr::random($allImages, min(4, count($allImages)));
                foreach ($selectedImages as $imgName) {
                    $sourcePath = public_path('images/cars/'.$imgName);
                    if (File::exists($sourcePath)) {
                        $file = new UploadedFile($sourcePath, $imgName, mime_content_type($sourcePath), null, true);
                        $uploadData = Helper::uploadFile($file, 'cars/gallery', true);
                        if ($uploadData) {
                            $pathData = [
                                'file_path' => $uploadData['original'],
                                'thumbnail_path' => $uploadData['thumbnail'],
                            ];
                            $uploadedPaths[] = $pathData;
                            DB::table('car_images')->insert(array_merge($pathData, [
                                'car_id' => $carId,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]));
                        }
                    }
                }
            } else {
                // Reuse existing paths to speed up significantly
                $pathsToUse = Arr::random($uploadedPaths, 3);
                foreach ($pathsToUse as $p) {
                    DB::table('car_images')->insert(array_merge($p, [
                        'car_id' => $carId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]));
                }
            }

            if (($i + 1) % 50 == 0) {
                $this->command->info('Inserted '.($i + 1).' realistic cars...');
            }
        }
    }

    private function insertRelatedData($carId, $i, $modelData, $transmission, $fuelType, $dailyRate)
    {
        // Specifications (Duplicate for backward compatibility if needed)
        DB::table('car_specifications')->insert([
            'car_id' => $carId,
            'transmission' => $transmission,
            'mileage' => rand(8, 18).' km/L (Combined)',
            'fuel_type' => $fuelType,
            'steering' => 'Precision Electronic Power Steering',
            'model_year' => rand(2023, 2025),
            'vehicle_type' => $modelData['category'],
            'engine_capacity' => ($fuelType === 'Electric' ? 'Electric Drive' : rand(2000, 4800).'cc Displacement'),
            'color' => Arr::random(['Mineral White Metallic', 'Obsidion Black Pearl', 'Quicksilver Metallic', 'Deep Sea Blue Metallic', 'Guards Red Core', 'Daytona Grey Silk']),
            'created_at' => now(), 'updated_at' => now(),
        ]);

        // Pricing
        DB::table('car_price_details')->insert([
            'car_id' => $carId,
            'daily_rate' => $dailyRate,
            'weekly_rate' => $dailyRate * 6,
            'monthly_rate' => $dailyRate * 22,
            'security_deposit' => 10000,
            'tax_percentage' => 5,
            'currency' => '৳',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        // Features
        $features = ['360° Camera', 'Adaptive Cruise Control', 'Apple CarPlay', 'Heated Seats', 'Panoramic Sunroof', 'Premium Sound System', 'Blind Spot Monitor', 'Lane Departure Warning', 'Keyless Entry'];
        $selected = Arr::random($features, rand(4, 7));
        foreach ($selected as $feat) {
            DB::table('car_features')->insert([
                'car_id' => $carId,
                'feature_name' => $feat,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // FAQs
        $faqs = [
            ['q' => 'What is the refueling policy?', 'a' => 'The car should be returned with the same fuel level as picked up.'],
            ['q' => 'Is insurance included?', 'a' => 'Basic insurance is included. Premium coverage can be added at checkout.'],
            ['q' => 'Can I drive it across city lines?', 'a' => 'Yes, but mileage restrictions may apply based on your plan.'],
        ];
        foreach ($faqs as $faq) {
            DB::table('car_f_a_q_s')->insert([
                'car_id' => $carId,
                'question' => $faq['q'],
                'answer' => $faq['a'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
