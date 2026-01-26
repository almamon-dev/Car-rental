<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Display the landing page with categories and cars.
     */
    public function index()
    {
        $categories = Category::withCount(['cars' => function($query) {
            $query->where('status', 'available');
        }])->where('status', 'active')->get();

        $cars = Car::with(['brand', 'category', 'priceDetails', 'images', 'specifications', 'features'])
            ->where('status', 'available')
            ->latest()
            ->take(8)
            ->get();

        if (Auth::check()) {
            $userId = Auth::id();
            $cars->each(function($car) use ($userId) {
                // Check if car is favorited by the current user
                $car->is_favorited = $car->favorites()->where('user_id', $userId)->exists();
            });
        }

        $brands = \App\Models\Brand::withCount(['cars' => function($query) {
            $query->where('status', 'available');
        }])->get();

        $locations = \App\Models\Location::where('status', 1)->get();

        return Inertia::render('Guest/Home/Index', [
            'categories' => $categories,
            'cars' => $cars,
            'brands' => $brands,
            'locations' => $locations,
        ]);
    }

    /**
     * Display the list of all available cars.
     */
    public function list(\Illuminate\Http\Request $request)
    {
        $query = Car::with(['brand', 'category', 'priceDetails', 'images', 'specifications', 'features']);

        // ... existing filters ...
        // Search Filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('make', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhereHas('brand', function($bq) use ($search) {
                      $bq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by Category
        if ($request->filled('category')) {
            $categorySlugs = explode(',', $request->category);
            $query->whereHas('category', function($q) use ($categorySlugs) {
                $q->whereIn('slug', $categorySlugs);
            });
        }

        // Filter by Brand
        if ($request->filled('brand')) {
            $brandSlugs = explode(',', $request->brand);
            $query->whereHas('brand', function($q) use ($brandSlugs) {
                $q->whereIn('slug', $brandSlugs);
            });
        }

        // Filter by Availability (Status)
        if ($request->filled('status')) {
            $statuses = explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }

        // Filter by Location
        if ($request->filled('location')) {
            $locationIds = explode(',', $request->location);
            $query->whereIn('location_id', $locationIds);
        }

        // Filter by Transmission
        if ($request->filled('transmission')) {
            $transmissions = explode(',', $request->transmission);
            $query->whereHas('specifications', function($q) use ($transmissions) {
                $q->whereIn('transmission', $transmissions);
            });
        }

        // Filter by Fuel Type
        if ($request->filled('fuel_type')) {
            $fuels = explode(',', $request->fuel_type);
            $query->whereHas('specifications', function($q) use ($fuels) {
                $q->whereIn('fuel_type', $fuels);
            });
        }

        // Filter by Price Range
        if ($request->filled('min_price') || $request->filled('max_price')) {
            $minPrice = $request->get('min_price', 0);
            $maxPrice = $request->get('max_price', 10000000);
            $query->whereHas('priceDetails', function($q) use ($minPrice, $maxPrice) {
                $q->whereBetween('daily_rate', [$minPrice, $maxPrice]);
            });
        }

        // Sorting
        $sort = $request->get('sort', 'latest');
        switch ($sort) {
            case 'price_low':
                $query->join('car_price_details', 'cars.id', '=', 'car_price_details.car_id')
                      ->orderBy('car_price_details.daily_rate', 'asc')
                      ->select('cars.*');
                break;
            case 'price_high':
                $query->join('car_price_details', 'cars.id', '=', 'car_price_details.car_id')
                      ->orderBy('car_price_details.daily_rate', 'desc')
                      ->select('cars.*');
                break;
            case 'oldest':
                $query->oldest();
                break;
            default:
                $query->latest();
                break;
        }

        $cars = $query->paginate($request->get('per_page', 24))->withQueryString();

        if (Auth::check()) {
            $userId = Auth::id();
            $cars->getCollection()->each(function($car) use ($userId) {
                $car->is_favorited = $car->favorites()->where('user_id', $userId)->exists();
            });
        }

        $categories = Category::withCount(['cars' => function($q) {
            $q->where('status', '=', 'available');
        }])->where('status', '=', 'active', 'and')->get(['*']);

        $brands = \App\Models\Brand::withCount(['cars' => function($q) {
            $q->where('status', '=', 'available');
        }])->get(['*']);

        $maxPrice = \App\Models\CarPriceDetail::max('daily_rate') ?: 2500000;
        $locations = \App\Models\Location::where('status', 1)->get();

        return Inertia::render('Guest/Home/Products/CarListingPage', [
            'cars' => $cars,
            'categories' => $categories,
            'brands' => $brands,
            'maxPrice' => (int)$maxPrice,
            'locations' => $locations,
        ]);
    }

    /**
     * Display a specific car's details.
     */
    public function show($slug)
    {
        $car = Car::with(['brand', 'category', 'specifications', 'priceDetails', 'features', 'faqs', 'images', 'location', 'reviews.user', 'reviews.likes'])
            ->where('slug', $slug)
            ->firstOrFail();
        
        if (Auth::check()) {
            $userId = Auth::id();
            $car->is_favorited = $car->favorites()->where('user_id', $userId)->exists();
            
            // Check if current user liked each review
            $car->reviews->each(function($review) use ($userId) {
                $review->is_liked = $review->likes->where('user_id', $userId)->isNotEmpty();
                $review->likes_count = $review->likes->count();
            });
        } else {
            $car->is_favorited = false;
            $car->reviews->each(function($review) {
                $review->is_liked = false;
                $review->likes_count = $review->likes->count();
            });
        }
        
        $locations = \App\Models\Location::where('status', 1)->get();
        
        return Inertia::render('Guest/Home/Products/CarDetails', [
            'car' => $car,
            'locations' => $locations,
        ]);
    }

    /**
     * Check if a car is available for the given dates.
     */
    public function checkAvailability(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $isBusy = \App\Models\Booking::where('car_id', $request->car_id)
            ->where('status', 'confirmed')
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        return response()->json([
            'available' => !$isBusy
        ]);
    }

    /**
     * Display all categories.
     */
    public function categories()
    {
        $categories = Category::withCount(['cars' => function($query) {
            $query->where('status', 'available');
        }])->where('status', 'active')->get();

        return Inertia::render('Guest/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Display all brands.
     */
    public function brands()
    {
        $brands = \App\Models\Brand::withCount(['cars' => function($query) {
            $query->where('status', 'available');
        }])->get();

        return Inertia::render('Guest/Brands/Index', [
            'brands' => $brands,
        ]);
    }
    /**
     * Display contact page.
     */
    public function contact()
    {
        return Inertia::render('Guest/Contact/Index');
    }

    /**
     * Store contact message (Placeholder).
     */
    public function storeContact(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        \App\Models\Contact::create([
            'user_id' => Auth::id(), // Will be null if guest
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
}
