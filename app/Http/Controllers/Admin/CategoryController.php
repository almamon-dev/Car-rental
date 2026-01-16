<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryStoreRequest;
use App\Http\Requests\Admin\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index(Request $request)
    {
        $query = Category::query();

        // 1. Filter by Search (Name or Description)
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('slug', 'like', "%{$request->search}%");
            });
        }
        // 2. Filter by Status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // 3. Get Paginated Results
        $categories = $query->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        // 4. Generate Counts for Status Tabs

        $counts = Cache::remember('category_counts', 10, function () {
            return [
                'all' => Category::count(),
                'active' => Category::where('status', 'active')->count(),
                'inactive' => Category::where('status', 'inactive')->count(),
            ];
        });

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => $request->all(),
            'counts' => $counts,
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    /**
     * store the specified category.
     */
    public function store(CategoryStoreRequest $request)
    {
        // -- validate
        foreach ($request->categories as $categoryData) {
            $data = [
                'name' => $categoryData['name'],
                'description' => $categoryData['description'] ?? null,
                'slug' => Str::slug($categoryData['name']),
                'status' => 'active',
            ];

            if (isset($categoryData['image'])) {
                $upload = Helper::uploadFile($categoryData['image'], 'categories', true);
                if ($upload) {
                    $data['icon'] = $upload['original'];
                }
            }

            Category::create($data);
        }

        return redirect()->route('admin.category.index')
            ->with('success', 'Categories created successfully.');
    }

    /**
     * Show the form for editing the category.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        // validate the request data
        $data = $request->only(['name', 'description']);
        $data['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            if ($category->icon) {
                Helper::deleteFile($category->icon);
                $thumbPath = str_replace('categories/', 'categories/thumbs/', $category->icon);
                Helper::deleteFile($thumbPath);
            }

            $upload = Helper::uploadFile($request->file('image'), 'categories', true);
            if ($upload) {
                $data['icon'] = $upload['original'];
            }
        }

        $category->update($data);

        return redirect()->route('admin.category.index')
            ->with('success', 'Category updated successfully.');
    }

    // single delete
    public function destroy(Category $category)
    {
        $this->deleteFileSafely($category);
        $category->delete();

        Cache::forget('category_counts');

        return back()->with('success', 'Category deleted successfully.');
    }

    // bulk delete
    public function bulkDestroy(Request $request)
    {
        $selectAllGlobal = filter_var($request->input('all'), FILTER_VALIDATE_BOOLEAN);
        $ids = $request->input('ids');

        try {
            DB::beginTransaction();

            if ($selectAllGlobal) {
                $categories = Category::all();
            } elseif (! empty($ids) && is_array($ids)) {
                $categories = Category::whereIn('id', $ids)->get();
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

            return back()->with('error', 'Something went wrong: '.$e->getMessage());
        }
    }

    // ফাইল ডিলিট করার জন্য প্রাইভেট মেথড
    private function deleteFileSafely($category)
    {
        if ($category->icon) {
            Helper::deleteFile($category->icon);
            $thumbPath = str_replace('categories/', 'categories/thumbs/', $category->icon);
            Helper::deleteFile($thumbPath);
        }
    }
}
