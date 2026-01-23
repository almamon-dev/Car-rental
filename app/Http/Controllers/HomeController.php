<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    /**
     * Display the landing page with categories and cars.
     */
    public function index()
    {
        $categories = Category::withCount(['cars' => function($query) {
            $query->where('status', '=', 'available');
        }])->where('status', '=', 'active', 'and')->get(['*']);

        $cars = Car::with(['brand', 'category', 'priceDetails', 'images', 'specifications'])
            ->where('status', '=', 'available', 'and')
            ->latest()
            ->take(8)
            ->get(['*']);

        $brands = \App\Models\Brand::withCount(['cars' => function($query) {
            $query->where('status', '=', 'available');
        }])->get(['*']);

        return Inertia::render('Guest/Home/Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'categories' => $categories,
            'cars' => $cars,
            'brands' => $brands,
        ]);
    }

    /**
     * Display the list of all available cars.
     */
    public function list(\Illuminate\Http\Request $request)
    {
        $query = Car::with(['brand', 'category', 'priceDetails', 'images', 'specifications']);

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

        $categories = Category::withCount(['cars' => function($q) {
            $q->where('status', '=', 'available');
        }])->where('status', '=', 'active', 'and')->get(['*']);

        $brands = \App\Models\Brand::withCount(['cars' => function($q) {
            $q->where('status', '=', 'available');
        }])->get(['*']);

        $maxPrice = \App\Models\CarPriceDetail::max('daily_rate') ?: 2500000;

        return Inertia::render('Guest/Home/Products/CarListingPage', [
            'cars' => $cars,
            'categories' => $categories,
            'brands' => $brands,
            'maxPrice' => (int)$maxPrice,
        ]);
    }

    /**
     * Display a specific car's details.
     */
    public function show($id)
    {
        $car = Car::with(['brand', 'category', 'specifications', 'priceDetails', 'features', 'faqs', 'images'])->findOrFail($id);
        
        return Inertia::render('Guest/Home/Products/CarDetails', [
            'car' => $car
        ]);
    }
}
