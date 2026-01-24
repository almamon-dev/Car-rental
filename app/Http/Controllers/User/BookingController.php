<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $bookings = $user->bookings()
            ->with(['car.brand', 'car.category'])
            ->latest()
            ->get();

        return Inertia::render('User/Bookings/Index', [
            'bookings' => $bookings,
            'stats' => [
                'total_bookings' => $bookings->count(),
                'active_bookings' => $bookings->where('status', 'confirmed')->count(),
            ],
        ]);
    }

    public function show($id)
    {
        $user = Auth::user();
        $booking = $user->bookings()
            ->with(['car.brand', 'car.category', 'car.specifications', 'car.features', 'payment'])
            ->findOrFail($id);

        return Inertia::render('User/Bookings/Show', [
            'booking' => $booking,
            'stats' => [
                'total_bookings' => $user->bookings()->count(),
                'active_bookings' => $user->bookings()->where('status', 'confirmed')->count(),
            ],
        ]);
    }
}
