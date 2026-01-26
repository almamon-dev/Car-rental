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
        $query = Car::query()->select([
            'id', 'brand_id', 'category_id', 'make', 'model', 'status', 'created_at', 'year', 'seats', 'rental_type', 'description',
        ]);
        // dd($query);
        // ২. Eager Loading with constraints
        $query->with([
            'brand:id,name',
            'category:id,name',
            'priceDetails:id,car_id,daily_rate,currency',
            'images:id,car_id,file_path,thumbnail_path',
            'specifications',
            'policeDocuments',
            'features',
        ]);

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($sub) use ($search) {
                $sub->where('make', 'like', "%{$search}%")
                    ->orWhere('model', 'like', "%{$search}%");
            });
        }

        // Filters
        if ($request->filled('brand')) {
            $query->whereHas('brand', fn ($q) => $q->where('name', $request->brand));
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('transmission')) {
            $query->whereHas('specifications', fn ($q) => $q->where('transmission', $request->transmission));
        }

        if ($request->filled('fuel_type')) {
            $query->whereHas('specifications', fn ($q) => $q->where('fuel_type', $request->fuel_type));
        }

        // ৪. Fast Pagination
        $cars = $query->latest()->paginate($request->per_page ?? 10)->withQueryString();

        //
        $counts = Cache::remember('car_counts', 3600, function () {
            return [
                'all' => Car::count('*'),
                'available' => Car::where('status', '=', 'available')->count('*'),
                'reserved' => Car::where('status', '=', 'reserved')->count('*'),
                'sold' => Car::where('status', '=', 'sold')->count('*'),
            ];
        });

        return Inertia::render('Admin/Car/Index', [
            'cars' => $cars,
            'brands' => Brand::all(['id', 'name']),
            'categories' => Category::all(['id', 'name']),
            'filters' => $request->only(['search', 'brand', 'status', 'transmission', 'fuel_type']),
            'counts' => $counts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Car/Create', [
            'brands' => Brand::all(['id', 'name']),
            'categories' => Category::all(['id', 'name']),
            'locations' => \App\Models\Location::all(['id', 'name']),
        ]);
    }

    public function store(CarStoreRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                // 1. Create orange-600 car record
                $car = Car::create($request->only([
                    'brand_id',
                    'category_id',
                    'location_id',
                    'make',
                    'model',
                    'year',
                    'seats',
                    'rental_type',
                    'description',
                    'status',
                ]));

                // 2. Create Specifications
                $car->specifications()->create($request->only([
                    'transmission',
                    'mileage',
                    'fuel_type',
                    'steering',
                    'model_year',
                    'vehicle_type',
                    'engine_capacity',
                    'color',
                ]));

                // 3. Create Pricing Details
                $car->priceDetails()->create($request->only([
                    'daily_rate',
                    'weekly_rate',
                    'monthly_rate',
                    'security_deposit',
                    'tax_percentage',
                    'currency',
                ]));

                // 4. Create Documents
                $car->policeDocuments()->create($request->only([
                    'registration_number',
                    'chassis_number',
                    'engine_number',
                    'tax_token_expiry',
                    'fitness_expiry',
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

                        $uploadData = Helper::uploadFile($image, 'cars/gallery', true);

                        if ($uploadData) {
                            $car->images()->create([
                                'file_path' => $uploadData['original'],
                                'thumbnail_path' => $uploadData['thumbnail'] ?? $uploadData['original'],
                            ]);
                        }
                    }
                }
            });

            // Clear counts cache after creating a car
            Cache::forget('car_counts');

            return redirect()
                ->route('admin.cars.index')
                ->with('success', 'Vehicle listed successfully in the marketplace.');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create car. Please check logs.']);
        }
    }

    public function show(Car $car)
    {
        $car->load(['brand', 'category', 'specifications', 'priceDetails', 'policeDocuments', 'features', 'faqs', 'images']);
        
        return Inertia::render('Admin/Car/Show', [
            'car' => $car
        ]);
    }

    public function edit(Car $car)
    {
        // Load all relationships needed for the form
        $car->load(['specifications', 'priceDetails', 'policeDocuments', 'features', 'faqs', 'images', 'location']);

        return Inertia::render('Admin/Car/Edit', [
            'car' => $car,
            'brands' => Brand::all(['id', 'name']),
            'categories' => Category::all(['id', 'name']),
            'locations' => \App\Models\Location::all(['id', 'name']),
        ]);
    }

    public function update(Request $request, Car $car)
    {
        try {
            DB::transaction(function () use ($request, $car) {
                // 1. Update car record
                $car->update($request->only([
                    'brand_id',
                    'category_id',
                    'location_id',
                    'make',
                    'model',
                    'year',
                    'seats',
                    'rental_type',
                    'description',
                    'status',
                ]));

                // 2. Update Specifications
                $car->specifications()->updateOrCreate([], $request->only([
                    'transmission',
                    'mileage',
                    'fuel_type',
                    'steering',
                    'model_year',
                    'vehicle_type',
                    'engine_capacity',
                    'color',
                ]));

                // 3. Update Pricing Details
                $car->priceDetails()->updateOrCreate([], $request->only([
                    'daily_rate',
                    'weekly_rate',
                    'monthly_rate',
                    'security_deposit',
                    'tax_percentage',
                    'currency',
                ]));

                // 4. Update Documents
                if ($request->filled('registration_number')) {
                    $car->policeDocuments()->updateOrCreate([], $request->only([
                        'registration_number',
                        'chassis_number',
                        'engine_number',
                        'tax_token_expiry',
                        'fitness_expiry',
                    ]));
                }

                // 5. Update Features - delete and recreate
                $car->features()->delete();
                if ($request->has('features')) {
                    $features = collect($request->features)
                        ->filter(fn ($f) => ! empty($f['feature_name']))
                        ->map(fn ($f) => ['feature_name' => $f['feature_name']])
                        ->toArray();

                    if (! empty($features)) {
                        $car->features()->createMany($features);
                    }
                }

                // 6. Update FAQs
                if ($request->has('has_faqs') && $request->has_faqs) {
                    $car->faqs()->delete();
                    if ($request->has('faqs')) {
                        $faqs = collect($request->faqs)
                            ->filter(fn ($f) => ! empty($f['question']))
                            ->map(fn ($f) => [
                                'question' => $f['question'],
                                'answer' => $f['answer'] ?? '',
                            ])
                            ->toArray();

                        if (! empty($faqs)) {
                            $car->faqs()->createMany($faqs);
                        }
                    }
                } else {
                    $car->faqs()->delete();
                }

                // 7. Handle New Image Uploads
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        if ($image->isValid()) {
                            $uploadData = Helper::uploadFile($image, 'cars/gallery');
                            if ($uploadData) {
                                $car->images()->create([
                                    'file_path' => $uploadData['original'],
                                    'thumbnail_path' => $uploadData['thumbnail'] ?? $uploadData['original'],
                                ]);
                            }
                        }
                    }
                }
            });

            // Clear counts cache after updating a car
            Cache::forget('car_counts');

            return redirect()->route('admin.cars.index')
                ->with('success', 'Vehicle updated successfully.');

        } catch (\Exception $e) {
            Log::error('Car Update Error: '.$e->getMessage());
            Log::error($e->getTraceAsString());

            return back()
                ->withErrors(['error' => 'Update failed. Please try again.'])
                ->withInput();
        }
    }

    public function destroyImage($id)
    {
        try {
            $image = CarImage::findOrFail($id);

            // 1. Delete image from server
            Helper::deleteFile($image->file_path);

            // 2. Delete from database
            $image->delete();

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

            // Clear counts cache after deleting a car
            Cache::forget('car_counts');

            return redirect()->route('admin.cars.index')
                ->with('success', 'Vehicle and all related data deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Car Deletion Error: '.$e->getMessage());

            return back()->withErrors([
                'error' => 'Failed to delete vehicle. Please try again.',
            ]);
        }
    }

    public function bulkDestroy(Request $request)
    {
        $selectAllGlobal = filter_var($request->all, FILTER_VALIDATE_BOOLEAN);
        $ids = $request->ids;

        try {
            DB::beginTransaction();

            // ১. কোন কারগুলো ডিলিট হবে তা নির্ধারণ করা
            if ($selectAllGlobal) {
                $cars = Car::with('images')->get();
            } elseif (! empty($ids) && is_array($ids)) {
                $cars = Car::with('images')->whereIn('id', $ids)->get();
            } else {
                return back()->with('error', 'No vehicles selected.');
            }

            foreach ($cars as $car) {

                foreach ($car->images as $image) {
                    Helper::deleteFile($image->file_path);
                }

                $car->images()->delete();
                $car->specifications()->delete();
                $car->features()->delete();
                $car->faqs()->delete();
                $car->policeDocuments()->delete();
                $car->priceDetails()->delete();

                // মূল কার রেকর্ড ডিলিট
                $car->delete();
            }

            DB::commit();

            // ৩. ক্যাশ ক্লিয়ার করা
            Cache::forget('car_counts');

            return back()->with('success', 'Selected vehicles deleted successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Bulk Delete Error: '.$e->getMessage());

            return back()->with('error', 'Something went wrong while deleting items.');
        }
    }
}
