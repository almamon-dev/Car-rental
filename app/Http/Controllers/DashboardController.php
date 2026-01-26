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

            // --- Growth Stats (Mock or Real) ---
            $lastMonthBookings = \App\Models\Booking::where('created_at', '>=', now()->subMonth())->count();
            $prevMonthBookings = \App\Models\Booking::whereBetween('created_at', [now()->subMonths(2), now()->subMonth()])->count();
            $bookingGrowth = $prevMonthBookings > 0 ? (($lastMonthBookings - $prevMonthBookings) / $prevMonthBookings) * 100 : 0;

            // --- Chart Data (Monthly Bookings for Current Year) ---
            $monthlyStats = \App\Models\Booking::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->whereYear('created_at', date('Y'))
                ->groupBy('month')
                ->orderBy('month')
                ->get();
            
            $chartData = [];
            for ($i = 1; $i <= 12; $i++) {
                $stat = $monthlyStats->firstWhere('month', $i);
                $chartData[] = [
                    'name' => date('M', mktime(0, 0, 0, $i, 1)),
                    'bookings' => $stat ? $stat->count : 0,
                    'revenue' => rand(1000, 5000) * ($stat ? $stat->count : 0.5), // Mock revenue curve if no real data
                ];
            }

            return Inertia::render('Admin/Dashboard', [
                'stats' => [
                    'total_cars' => $totalCars,
                    'active_bookings' => $activeBookings,
                    'total_users' => $totalUsers,
                    'total_revenue' => $totalRevenue,
                    'booking_growth' => round($bookingGrowth, 1),
                ],
                'chartData' => $chartData
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
