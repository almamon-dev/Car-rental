<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $payments = $user->payments()
            ->with(['booking.car.brand'])
            ->latest()
            ->get();

        return Inertia::render('User/Payments/Index', [
            'payments' => $payments,
            'stats' => [
                'total_bookings' => $user->bookings()->count(),
                'active_bookings' => $user->bookings()->where('status', 'confirmed')->count(),
            ],
        ]);
    }
}
