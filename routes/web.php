<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CarController as AdminCarController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- Guest Routes ---
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/car-details/{slug}', [HomeController::class, 'show'])->name('car.details');
Route::get('/car-list', [HomeController::class, 'list'])->name('car.list');
Route::get('/api/check-availability', [HomeController::class, 'checkAvailability'])->name('api.check-availability');

// --- Auth Routes ---
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- User Specific Routes ---
    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/bookings', [\App\Http\Controllers\User\BookingController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/{id}', [\App\Http\Controllers\User\BookingController::class, 'show'])->name('bookings.show');
        
        Route::get('/favorites', [\App\Http\Controllers\User\FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('/favorites/toggle/{carId}', [\App\Http\Controllers\User\FavoriteController::class, 'toggle'])->name('favorites.toggle');
        
        Route::get('/payments', [\App\Http\Controllers\User\PaymentController::class, 'index'])->name('payments.index');
    });
});

// --- Admin Dashboard route ---
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

    // 1. Specific custom routes FIRST
    Route::delete('cars/image/{id}', [AdminCarController::class, 'destroyImage'])->name('cars.image.destroy');
    Route::delete('cars/bulk-destroy', [AdminCarController::class, 'bulkDestroy'])->name('cars.bulk-destroy');

    // 2. Resource route SECOND
    Route::resource('cars', AdminCarController::class);

    // -- category
    Route::get('categories/sub-categories', [AdminCategoryController::class, 'index'])->name('category.sub.index');
    Route::delete('categories/bulk-destroy', [AdminCategoryController::class, 'bulkDestroy'])->name('category.bulk-destroy');
    Route::resource('category', AdminCategoryController::class);

    // -- brands
    Route::delete('brands/bulk-destroy', [BrandController::class, 'bulkDestroy'])->name('brands.bulk-destroy');
    Route::resource('brands', BrandController::class);

    // -- locations (branches)
    Route::delete('locations/bulk-destroy', [\App\Http\Controllers\Admin\LocationController::class, 'bulkDestroy'])->name('locations.bulk-destroy');
    Route::resource('locations', \App\Http\Controllers\Admin\LocationController::class);

});

Route::fallback(function () {
    return Inertia::render('Errors/404');
});

require __DIR__.'/auth.php';
