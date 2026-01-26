<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('is_admin', '=', false);

        // Search Filter
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // Status Filter
        if ($request->status) {
            if ($request->status === 'verified') {
                $query->whereNotNull('email_verified_at');
            } elseif ($request->status === 'unverified') {
                $query->whereNull('email_verified_at');
            }
        }

        $users = $query->latest()->paginate(10)->withQueryString();

        $counts = [
            'all' => User::where('is_admin', false)->count(),
            'verified' => User::where('is_admin', false)->whereNotNull('email_verified_at')->count(),
            'unverified' => User::where('is_admin', false)->whereNull('email_verified_at')->count(),
        ];

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'status']),
            'counts' => $counts
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'User deleted successfully.');
    }
}
