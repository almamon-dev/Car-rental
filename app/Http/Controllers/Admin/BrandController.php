<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia; // Make sure to create this Model

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $query = Brand::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('slug', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('is_active', $request->status === 'active');
        }

        $brands = $query->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        $counts = Cache::remember('brand_counts', 10, function () {
            return [
                'all' => Brand::count(),
                'active' => Brand::where('is_active', true)->count(),
                'inactive' => Brand::where('is_active', false)->count(),
            ];
        });

        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands,
            'filters' => $request->all(),
            'counts' => $counts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Brands/Create');
    }

    public function store(Request $request)
    {
        // Note: You should create a BrandStoreRequest for validation
        foreach ($request->brands as $brandData) {
            $data = [
                'name' => $brandData['name'],
                'slug' => Str::slug($brandData['name']),
                'is_active' => true,
            ];

            if (isset($brandData['logo'])) {
                // Uploading to public/brands/
                $upload = Helper::uploadFile($brandData['logo'], 'brands', true);
                if ($upload) {
                    $data['logo'] = $upload['original'];
                }
            }

            Brand::create($data);
        }

        Cache::forget('brand_counts');

        return redirect()->route('admin.brands.index')->with('success', 'Brands created.');
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    public function update(Request $request, Brand $brand)
    {
        $data = ['name' => $request->name];
        $data['slug'] = Str::slug($request->name);
        $data['is_active'] = filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('logo')) {
            // Delete old file from public path
            if ($brand->logo) {
                Helper::deleteFile($brand->logo);
                $thumbPath = str_replace('brands/', 'brands/thumbs/', $brand->logo);
                Helper::deleteFile($thumbPath);
            }

            $upload = Helper::uploadFile($request->file('logo'), 'brands', true);
            if ($upload) {
                $data['logo'] = $upload['original'];
            }
        }

        $brand->update($data);
        Cache::forget('brand_counts');

        return redirect()->route('admin.brands.index')->with('success', 'Brand updated.');
    }

    public function destroy(Brand $brand)
    {
        $this->deleteFileSafely($brand);
        $brand->delete();
        Cache::forget('brand_counts');

        return back()->with('success', 'Brand deleted.');
    }

    private function deleteFileSafely($brand)
    {
        if ($brand->logo) {
            Helper::deleteFile($brand->logo);
            $thumbPath = str_replace('brands/', 'brands/thumbs/', $brand->logo);
            Helper::deleteFile($thumbPath);
        }
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids');

        if (empty($ids) || ! is_array($ids)) {
            return back()->with('error', 'No brands selected for deletion.');
        }

        try {
            DB::beginTransaction();

            // Fetch brands to handle file deletion before database deletion
            $brands = Brand::whereIn('id', $ids)->get();

            foreach ($brands as $brand) {
                if ($brand->logo) {
                    // Delete original logo from public/brands/
                    Helper::deleteFile($brand->logo);

                    // Delete thumbnail if your Helper generates them
                    $thumbPath = str_replace('brands/', 'brands/thumbs/', $brand->logo);
                    Helper::deleteFile($thumbPath);
                }

                $brand->delete();
            }

            DB::commit();
            Cache::forget('brand_counts');

            return back()->with('success', count($ids).' brands deleted successfully.');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Deletion failed: '.$e->getMessage());
        }
    }
}
