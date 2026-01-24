<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $user = Auth::user();

        if ($user->is_admin) {
            $totalCars = \App\Models\Car::count();
            $activeBookings = \App\Models\Booking::where('status', 'confirmed')->count();
            $totalUsers = \App\Models\User::where('is_admin', false)->count();
            $totalRevenue = \App\Models\Payment::where('status', 'completed')->sum('amount');

            return Inertia::render('Admin/Dashboard', [
                'stats' => [
                    'total_cars' => $totalCars,
                    'active_bookings' => $activeBookings,
                    'total_users' => $totalUsers,
                    'total_revenue' => $totalRevenue,
                ]
            ]);
        }

        // Fetch bookings for the current user
        $bookings = $user->bookings()
            ->with(['car' => function ($query) {
                $query->with(['brand', 'category']);
            }])
            ->latest()
            ->get();

        return Inertia::render('User/Dashboard', [
            'bookings' => $bookings,
            'stats' => [
                'total_bookings' => $bookings->count(),
                'active_bookings' => $bookings->where('status', 'confirmed')->count(),
                'completed_bookings' => $bookings->where('status', 'completed')->count(),
            ],
        ]);
    }
}
