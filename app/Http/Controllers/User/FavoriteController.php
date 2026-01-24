<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $favorites = $user->favorites()
            ->with(['car.brand', 'car.category', 'car.priceDetails', 'car.images'])
            ->latest()
            ->get();

        return Inertia::render('User/Favorites/Index', [
            'favorites' => $favorites,
            'stats' => [
                'total_bookings' => $user->bookings()->count(),
                'active_bookings' => $user->bookings()->where('status', 'confirmed')->count(),
            ],
        ]);
    }

    public function toggle(Request $request, $carId)
    {
        $user = Auth::user();
        $favorite = $user->favorites()->where('car_id', $carId)->first();

        if ($favorite) {
            $favorite->delete();

            return back()->with('success', 'Removed from favorites');
        }

        $user->favorites()->create(['car_id' => $carId]);

        return back()->with('success', 'Added to favorites');
    }
}
