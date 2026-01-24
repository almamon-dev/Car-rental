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
        $view = $request->routeIs('admin.category.sub.index') ? 'sub' : $request->query('view', 'root');
        $query = Category::query();

        // 1. Filter by Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%");
            });
        }

        // 2. Filter by Status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // 3. Hierarchy Filter
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

        $counts = Cache::remember('category_counts', 10, function () {
            return [
                'all' => Category::whereNull('parent_id')->count(),
                'active' => Category::whereNull('parent_id')->where('status', 'active')->count(),
                'inactive' => Category::whereNull('parent_id')->where('status', 'inactive')->count(),
                'sub_total' => Category::whereNotNull('parent_id')->count(),
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
     * Show the form for creating a new category.
     */
    public function create()
    {
        $parentCategories = Category::whereNull('parent_id')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Categories/Create', [
            'parentCategories' => $parentCategories,
        ]);
    }

    /**
     * store the specified category.
     */
    public function store(CategoryStoreRequest $request)
    {
        // -- validate
        foreach ($request->categories as $categoryData) {
            $data = [
                'parent_id' => $categoryData['parent_id'] ?? null,
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
        $parentCategories = Category::whereNull('parent_id')
            ->where('id', '!=', $category->id)
            ->select('id', 'name')
            ->get();

        $subCategories = Category::where('parent_id', $category->id)->get();

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'parentCategories' => $parentCategories,
            'subCategories' => $subCategories,
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        // validate the request data
        $data = $request->only(['name', 'description', 'parent_id']);
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
                $query = Category::query();
                if ($request->input('view') === 'sub') {
                    $query->whereNotNull('parent_id');
                } else {
                    $query->whereNull('parent_id');
                }

                // Also apply search filter if present
                if ($request->search) {
                    $query->where(function ($q) use ($request) {
                        $q->where('name', 'like', "%{$request->search}%")
                            ->orWhere('description', 'like', "%{$request->search}%");
                    });
                }

                $categories = $query->get();
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
