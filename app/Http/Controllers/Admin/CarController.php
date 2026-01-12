<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CarStoreRequest;
use App\Models\Brand;
use App\Models\Car;
use App\Models\CarImage;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index(Request $request)
    {

        $filters = json_encode($request->all());
        $cacheKey = 'cars_list_'.md5($filters);

        $cars = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($request) {
            $query = Car::with(['brand', 'category', 'images', 'specifications', 'priceDetails', 'features', 'policeDocuments']);

            // Search by Make, Model or Description
            if ($request->search) {
                $query->where(function ($q) use ($request) {
                    $q->where('make', 'like', "%{$request->search}%")
                        ->orWhere('model', 'like', "%{$request->search}%")
                        ->orWhere('description', 'like', "%{$request->search}%");
                });
            }

            // Advanced Filters
            if ($request->brand) {
                $query->whereHas('brand', fn ($q) => $q->where('name', $request->brand));
            }
            if ($request->category) {
                $query->whereHas('category', fn ($q) => $q->where('name', $request->category));
            }
            if ($request->status && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            // Filtering via Specification Relationship
            if ($request->transmission) {
                $query->whereHas('specifications', fn ($q) => $q->where('transmission', $request->transmission));
            }
            if ($request->fuel_type) {
                $query->whereHas('specifications', fn ($q) => $q->where('fuel_type', $request->fuel_type));
            }

            return $query->latest()->paginate($request->per_page ?? 10)->withQueryString();
        });

        $counts = Cache::remember('cars_counts_list', now()->addMinutes(60), function () {
            return [
                'all' => Car::count(),
                'available' => Car::where('status', 'available')->count(),
                'reserved' => Car::where('status', 'reserved')->count(),
                'sold' => Car::where('status', 'sold')->count(),
            ];
        });

        return Inertia::render('Admin/Car/Index', [
            'cars' => $cars,
            'brands' => Brand::all(['id', 'name']),
            'categories' => Category::all(['id', 'name']),
            'filters' => $request->all(),
            'counts' => $counts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Car/Create', [
            'brands' => Brand::all(['id', 'name']),
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function store(CarStoreRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                // 1. Create primary car record
                $car = Car::create($request->only([
                    'brand_id', 'category_id', 'make', 'model', 'year',
                    'rental_type', 'description', 'status',
                ]));

                // 2. Create Specifications
                $car->specifications()->create($request->only([
                    'transmission', 'mileage', 'fuel_type', 'steering',
                    'model_year', 'vehicle_type', 'engine_capacity', 'color',
                ]));

                // 3. Create Pricing Details
                $car->priceDetails()->create($request->only([
                    'daily_rate', 'weekly_rate', 'monthly_rate',
                    'security_deposit', 'tax_percentage', 'currency',
                ]));

                // 4. Create Documents
                $car->policeDocuments()->create($request->only([
                    'registration_number', 'chassis_number', 'engine_number',
                    'tax_token_expiry', 'fitness_expiry',
                ]));

                // 5. Create Features
                if ($request->has('features') && is_array($request->features)) {
                    $features = array_filter($request->features, function ($feature) {
                        return ! empty($feature['feature_name']);
                    });

                    if (! empty($features)) {
                        $car->features()->createMany($features);
                    }
                }

                // 6. Create FAQs
                if ($request->has('faqs') && is_array($request->faqs)) {
                    $faqs = array_filter($request->faqs, function ($faq) {
                        return ! empty($faq['question']) && ! empty($faq['answer']);
                    });

                    if (! empty($faqs)) {
                        $car->faqs()->createMany($faqs);
                    }
                }

                // 7. Handle Image Uploads
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = Helper::uploadFile($image, 'cars/gallery');
                        $car->images()->create(['file_path' => $path]);
                    }
                }
            });

            return redirect()
                ->route('admin.cars.index')
                ->with('success', 'Vehicle listed successfully in the marketplace.');

        } catch (\Exception $e) {
            Log::info('Error details:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all(),
            ]);

            return back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create car. Please check logs.']);
        }
    }

    public function edit(Car $car)
    {
        // Load all relationships needed for the form
        $car->load(['specifications', 'priceDetails', 'policeDocuments', 'features', 'faqs', 'images']);

        return Inertia::render('Admin/Car/Edit', [
            'car' => $car,
            'brands' => Brand::all(['id', 'name']),
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, Car $car)
    {
        try {
            DB::transaction(function () use ($request, $car) {
                // 1. Update primary car record
                $car->update($request->only([
                    'brand_id', 'category_id', 'make', 'model', 'year',
                    'rental_type', 'description', 'status',
                ]));

                // 2. Update Specifications
                $car->specifications()->updateOrCreate([], $request->only([
                    'transmission', 'mileage', 'fuel_type', 'steering',
                    'model_year', 'vehicle_type', 'engine_capacity', 'color',
                ]));

                // 3. Update Pricing Details
                $car->priceDetails()->updateOrCreate([], $request->only([
                    'daily_rate', 'weekly_rate', 'monthly_rate',
                    'security_deposit', 'tax_percentage', 'currency',
                ]));

                // 4. Update Documents
                $car->policeDocuments()->updateOrCreate([], $request->only([
                    'registration_number', 'chassis_number', 'engine_number',
                    'tax_token_expiry', 'fitness_expiry',
                ]));

                // 5. Update Features
                $car->features()->delete();
                if ($request->has('features')) {
                    $features = array_filter($request->features, fn ($f) => ! empty($f['feature_name']));
                    if (! empty($features)) {
                        $car->features()->createMany($features);
                    }
                }

                // 6. Update FAQs
                $car->faqs()->delete();
                if ($request->has('faqs')) {
                    $faqs = array_filter($request->faqs, fn ($f) => ! empty($f['question']));
                    if (! empty($faqs)) {
                        $car->faqs()->createMany($faqs);
                    }
                }

                // 7. Handle New Image Uploads using your Helper
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $path = Helper::uploadFile($image, 'cars/gallery');
                        if ($path) {
                            $car->images()->create(['file_path' => $path]);
                        }
                    }
                }
            });

            return redirect()->route('admin.cars.index')->with('success', 'Vehicle updated successfully.');
        } catch (\Exception $e) {
            Log::error('Car Update Error: '.$e->getMessage());

            return back()->withErrors(['error' => 'Update failed. Check logs for details.']);
        }
    }

    /**
     * Image Delete Method using your Helper class
     */
    public function destroyImage($id)
    {
        try {
            $image = CarImage::findOrFail($id);

            // 1. Delete image from server
            Helper::deleteFile($image->file_path);

            // 2. Delete from database
            $image->delete();
            Cache::flush();

            return back()->with('success', 'Image deleted successfully from database and server.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Image delete failed.']);
        }
    }

    // destroy
    public function destroy(Car $car)
    {
        try {
            DB::transaction(function () use ($car) {
                // 1. Delete physical image files from storage
                foreach ($car->images as $image) {
                    Helper::deleteFile($image->file_path);
                }
                // 2. Delete all related records
                $car->images()->delete();
                $car->specifications()->delete();
                $car->features()->delete();
                $car->faqs()->delete();
                $car->policeDocuments()->delete();
                $car->priceDetails()->delete();

                // 3. Delete the car record itself
                $car->delete();
            });

            return redirect()->route('admin.cars.index')
                ->with('success', 'Vehicle and all related data deleted successfully.');

        } catch (\Exception $e) {
            Log::error('Car Deletion Error: '.$e->getMessage());

            return back()->withErrors([
                'error' => 'Failed to delete vehicle. Please try again.',
            ]);
        }
    }
}
