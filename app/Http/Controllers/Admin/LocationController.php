<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of locations (branches).
     */
    public function index(Request $request)
    {
        $query = Location::query();

        // 1. Filter by Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('city', 'like', "%{$request->search}%");
            });
        }

        // 2. Filter by Status
        if ($request->filled('status') && $request->status !== 'all') {
            $status = $request->status === 'active' ? 1 : 0;
            $query->where('status', $status);
        }

        // 3. Get Paginated Results
        $locations = $query->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        // 4. Generate Counts
        $counts = Cache::remember('location_counts', 10, function () {
            return [
                'all' => Location::count(),
                'active' => Location::where('status', 1)->count(),
                'inactive' => Location::where('status', 0)->count(),
            ];
        });

        return Inertia::render('Admin/Locations/Index', [
            'locations' => $locations,
            'filters' => $request->all(),
            'counts' => $counts,
        ]);
    }

    /**
     * Show the form for creating a new location.
     */
    public function create()
    {
        return Inertia::render('Admin/Locations/Create');
    }

    /**
     * Store a newly created location.
     */
    public function store(Request $request)
    {
        $request->validate([
            'locations' => 'required|array|min:1',
            'locations.*.name' => 'required|string|max:255',
            'locations.*.city' => 'nullable|string|max:255',
            'locations.*.status' => 'required',
        ]);

        foreach ($request->locations as $locationData) {
            Location::create([
                'name' => $locationData['name'],
                'city' => $locationData['city'] ?? null,
                'status' => filter_var($locationData['status'], FILTER_VALIDATE_BOOLEAN),
            ]);
        }

        Cache::forget('location_counts');

        return redirect()->route('admin.locations.index')
            ->with('success', 'Branches created successfully.');
    }

    /**
     * Show the form for editing the location.
     */
    public function edit(Location $location)
    {
        return Inertia::render('Admin/Locations/Edit', [
            'location' => $location,
        ]);
    }

    /**
     * Update the specified location.
     */
    public function update(Request $request, Location $location)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'city' => 'nullable|string|max:255',
            'status' => 'required|boolean',
        ]);

        $location->update($request->all());

        Cache::forget('location_counts');

        return redirect()->route('admin.locations.index')
            ->with('success', 'Branch updated successfully.');
    }

    /**
     * Remove the specified location.
     */
    public function destroy(Location $location)
    {
        $location->delete();
        Cache::forget('location_counts');

        return back()->with('success', 'Branch deleted successfully.');
    }

    /**
     * Bulk delete locations.
     */
    public function bulkDestroy(Request $request)
    {
        $selectAllGlobal = filter_var($request->input('all'), FILTER_VALIDATE_BOOLEAN);
        $ids = $request->input('ids');

        try {
            DB::beginTransaction();

            if ($selectAllGlobal) {
                $locations = Location::all();
            } elseif (! empty($ids) && is_array($ids)) {
                $locations = Location::whereIn('id', $ids)->get();
            } else {
                return back()->with('error', 'No items selected.');
            }

            foreach ($locations as $location) {
                $location->delete();
            }

            DB::commit();
            Cache::forget('location_counts');

            return back()->with('success', 'Selected branches deleted successfully.');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Something went wrong: '.$e->getMessage());
        }
    }
}
