<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     * Supports filtering by search, status, and view type (root vs sub).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $view = $request->routeIs('admin.category.sub.index') ? 'sub' : $request->query('view', 'root');
        $query = \App\Models\Category::query();

        // 1. Filter by Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 2. Filter by Status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // 3. Hierarchy Filter (Root vs Sub-categories)
        if ($view === 'sub') {
            $query->whereNotNull('parent_id')
                  ->with('parent')
                  ->withCount('cars');
        } else {
            $query->whereNull('parent_id')
                  ->withCount(['children', 'cars'])
                  ->with(['children' => function ($q) {
                      $q->latest()->limit(5);
                  }]);
        }

        $categories = $query->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        // Method to get counts efficiently
        $counts = Cache::remember('category_counts', 10, function () {
            return [
                'all' => \App\Models\Category::whereNull('parent_id')->count(),
                'active' => \App\Models\Category::whereNull('parent_id')->where('status', 'active')->count(),
                'inactive' => \App\Models\Category::whereNull('parent_id')->where('status', 'inactive')->count(),
                'sub_total' => \App\Models\Category::whereNotNull('parent_id')->count(),
            ];
        });

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => $request->all(),
            'counts' => $counts,
            'view' => $view,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        $parentCategories = \App\Models\Category::whereNull('parent_id')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Categories/Create', [
            'parentCategories' => $parentCategories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Handles single or bulk creation logic as defined in the request.
     *
     * @param  \App\Http\Requests\Admin\CategoryStoreRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(\App\Http\Requests\Admin\CategoryStoreRequest $request)
    {
        // Process each category item from the request
        foreach ($request->categories as $categoryData) {
            $data = [
                'parent_id' => $categoryData['parent_id'] ?? null,
                'name' => $categoryData['name'],
                'description' => $categoryData['description'] ?? null,
                'slug' => Str::slug($categoryData['name']),
                'status' => 'active',
            ];

            if (isset($categoryData['image'])) {
                $upload = \App\Helpers\Helper::uploadFile($categoryData['image'], 'categories', true);
                if ($upload) {
                    $data['icon'] = $upload['original'];
                }
            }

            \App\Models\Category::create($data);
        }

        return redirect()->route('admin.category.index')
            ->with('success', 'Categories created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Inertia\Response
     */
    public function edit(\App\Models\Category $category)
    {
        $parentCategories = \App\Models\Category::whereNull('parent_id')
            ->where('id', '!=', $category->id)
            ->select('id', 'name')
            ->get();

        $subCategories = \App\Models\Category::where('parent_id', $category->id)->get();

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'parentCategories' => $parentCategories,
            'subCategories' => $subCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\CategoryUpdateRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(\App\Http\Requests\Admin\CategoryUpdateRequest $request, \App\Models\Category $category)
    {
        $data = $request->only(['name', 'description', 'parent_id']);
        $data['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->icon) {
                \App\Helpers\Helper::deleteFile($category->icon);
                // Also try deleting potential thumbnail
                $thumbPath = str_replace('categories/', 'categories/thumbs/', $category->icon);
                \App\Helpers\Helper::deleteFile($thumbPath);
            }

            $upload = \App\Helpers\Helper::uploadFile($request->file('image'), 'categories', true);
            if ($upload) {
                $data['icon'] = $upload['original'];
            }
        }

        $category->update($data);

        return redirect()->route('admin.category.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(\App\Models\Category $category)
    {
        $this->deleteFileSafely($category);
        $category->delete();

        Cache::forget('category_counts');

        return back()->with('success', 'Category deleted successfully.');
    }

    /**
     * Bulk remove resources from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function bulkDestroy(Request $request)
    {
        $selectAllGlobal = filter_var($request->input('all'), FILTER_VALIDATE_BOOLEAN);
        $ids = $request->input('ids');

        try {
            DB::beginTransaction();

            if ($selectAllGlobal) {
                $query = \App\Models\Category::query();
                if ($request->input('view') === 'sub') {
                    $query->whereNotNull('parent_id');
                } else {
                    $query->whereNull('parent_id');
                }

                if ($request->filled('search')) {
                    $search = $request->search;
                    $query->where(function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('description', 'like', "%{$search}%");
                    });
                }

                $categories = $query->get();
            } elseif (! empty($ids) && is_array($ids)) {
                $categories = \App\Models\Category::whereIn('id', $ids)->get();
            } else {
                return back()->with('error', 'No items selected.');
            }

            foreach ($categories as $category) {
                $this->deleteFileSafely($category);
                $category->delete();
            }

            DB::commit();
            Cache::forget('category_counts');

            return back()->with('success', 'Selected items deleted successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    /**
     * Helper method to safely delete category images.
     *
     * @param  \App\Models\Category  $category
     * @return void
     */
    private function deleteFileSafely($category)
    {
        if ($category->icon) {
            \App\Helpers\Helper::deleteFile($category->icon);
            $thumbPath = str_replace('categories/', 'categories/thumbs/', $category->icon);
            \App\Helpers\Helper::deleteFile($thumbPath);
        }
    }
}
