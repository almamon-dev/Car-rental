<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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

        // ১. সার্চ লজিক
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%");
            });
        }

        // ২. প্যাগিনেশন
        $categories = $query->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        // ৩. কাউন্টস (Cache ব্যবহার করে - আপনার CarController স্টাইলে)
        $counts = Cache::remember('category_counts', 60, function () {
            return [
                'all' => Category::count(),
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
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = $request->only(['name', 'description']);
        $data['slug'] = Str::slug($request->name);

        // হেল্পার ব্যবহার করে ইমেজ আপলোড
        if ($request->hasFile('image')) {
            $upload = Helper::uploadFile($request->file('image'), 'categories', true);
            if ($upload) {
                $data['icon'] = $upload['original']; // ডাটাবেসের icon কলামে পাথ সেভ
            }
        }

        Category::create($data);

        return redirect()->route('admin.category.index')
            ->with('success', 'Category created successfully.');
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
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$category->id,
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = $request->only(['name', 'description']);
        $data['slug'] = Str::slug($request->name);

        if ($request->hasFile('image')) {
            // ১. পুরনো ইমেজ ডিলিট করা (হেল্পার ব্যবহার করে)
            if ($category->icon) {
                Helper::deleteFile($category->icon);
                // থাম্বনেইল পাথ ডিলিট (যদি থাম্বনেইল ফোল্ডার আলাদা হয়)
                $thumbPath = str_replace('categories/', 'categories/thumbs/', $category->icon);
                Helper::deleteFile($thumbPath);
            }

            // ২. নতুন ইমেজ আপলোড
            $upload = Helper::uploadFile($request->file('image'), 'categories', true);
            if ($upload) {
                $data['icon'] = $upload['original'];
            }
        }

        $category->update($data);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        // ইমেজ ডিলিট করা
        if ($category->icon) {
            Helper::deleteFile($category->icon);
            $thumbPath = str_replace('categories/', 'categories/thumbs/', $category->icon);
            Helper::deleteFile($thumbPath);
        }

        $category->delete();

        return back()->with('success', 'Category deleted successfully.');
    }

    /**
     * Bulk Delete categories
     */
    public function bulkDestroy(Request $request)
    {
        $ids = $request->ids;
        $categories = Category::whereIn('id', $ids)->get();

        foreach ($categories as $category) {
            if ($category->icon) {
                Helper::deleteFile($category->icon);
            }
            $category->delete();
        }

        return back()->with('success', 'Selected categories deleted.');
    }
}
