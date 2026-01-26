<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- Public Routes ---
Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/car-details/{slug}', [\App\Http\Controllers\HomeController::class, 'show'])->name('car.details');
Route::get('/car-list', [\App\Http\Controllers\HomeController::class, 'list'])->name('car.list');
Route::get('/categories', [\App\Http\Controllers\HomeController::class, 'categories'])->name('categories.index');
Route::get('/brands', [\App\Http\Controllers\HomeController::class, 'brands'])->name('brands.index');
Route::get('/about', [\App\Http\Controllers\HomeController::class, 'about'])->name('about.index');
Route::get('/help', [\App\Http\Controllers\HomeController::class, 'help'])->name('help.index');
Route::get('/terms', [\App\Http\Controllers\HomeController::class, 'terms'])->name('terms.index');
Route::get('/privacy', [\App\Http\Controllers\HomeController::class, 'privacy'])->name('privacy.index');
Route::get('/contact', [\App\Http\Controllers\HomeController::class, 'contact'])->name('contact.index');
Route::post('/contact', [\App\Http\Controllers\HomeController::class, 'storeContact'])->name('contact.submit');
Route::get('/api/check-availability', [\App\Http\Controllers\HomeController::class, 'checkAvailability'])->name('api.check-availability');

// --- Authenticated Routes ---
Route::middleware('auth')->group(function () {
    
    // Dashboard
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
        ->middleware('verified')
        ->name('dashboard');

    // Profile Management
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');

    // User Routes
    Route::prefix('user')->name('user.')->group(function () {
        
        // Bookings
        Route::get('/bookings', [\App\Http\Controllers\User\Booking\BookingController::class, 'index'])->name('bookings.index');
        Route::get('/bookings/{id}', [\App\Http\Controllers\User\Booking\BookingController::class, 'show'])->name('bookings.show');

        // Favorites
        Route::get('/favorites', [\App\Http\Controllers\User\FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('/favorites/toggle/{carId}', [\App\Http\Controllers\User\FavoriteController::class, 'toggle'])->name('favorites.toggle');

        // Payments History
        Route::get('/payments', [\App\Http\Controllers\User\Booking\PaymentController::class, 'index'])->name('payments.index');

        // Reviews
        Route::post('/reviews', [\App\Http\Controllers\CarReviewController::class, 'store'])->name('reviews.store');
        Route::post('/reviews/{reviewId}/like', [\App\Http\Controllers\CarReviewController::class, 'toggleLike'])->name('reviews.like');

        // Payment Gateway (SSLCommerz)
        // Initiation
        Route::post('/sslcommerz/payment', [\App\Http\Controllers\User\Booking\PaymentController::class, 'sslCommerzPayment'])->name('sslcommerz.payment');

        // Callbacks (Public Exception for Gateway)
        Route::post('/sslcommerz/success', [\App\Http\Controllers\User\Booking\PaymentController::class, 'sslCommerzSuccess'])
            ->withoutMiddleware('auth')
            ->name('sslcommerz.success');
        
        Route::post('/sslcommerz/fail', [\App\Http\Controllers\User\Booking\PaymentController::class, 'sslCommerzFail'])
            ->withoutMiddleware('auth')
            ->name('sslcommerz.fail');

        Route::post('/sslcommerz/cancel', [\App\Http\Controllers\User\Booking\PaymentController::class, 'sslCommerzCancel'])
            ->withoutMiddleware('auth')
            ->name('sslcommerz.cancel');

        Route::post('/sslcommerz/ipn', [\App\Http\Controllers\User\Booking\PaymentController::class, 'sslCommerzIpn'])
            ->withoutMiddleware('auth')
            ->name('sslcommerz.ipn');
    });
});

// --- Admin Routes ---
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Cars
    Route::delete('cars/image/{id}', [\App\Http\Controllers\Admin\CarController::class, 'destroyImage'])->name('cars.image.destroy');
    Route::delete('cars/bulk-destroy', [\App\Http\Controllers\Admin\CarController::class, 'bulkDestroy'])->name('cars.bulk-destroy');
    Route::resource('cars', \App\Http\Controllers\Admin\CarController::class);

    // Categories
    Route::get('categories/sub-categories', [\App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('category.sub.index');
    Route::delete('categories/bulk-destroy', [\App\Http\Controllers\Admin\CategoryController::class, 'bulkDestroy'])->name('category.bulk-destroy');
    Route::resource('category', \App\Http\Controllers\Admin\CategoryController::class);

    // Brands
    Route::delete('brands/bulk-destroy', [\App\Http\Controllers\Admin\BrandController::class, 'bulkDestroy'])->name('brands.bulk-destroy');
    Route::resource('brands', \App\Http\Controllers\Admin\BrandController::class);

    // Locations
    Route::delete('locations/bulk-destroy', [\App\Http\Controllers\Admin\LocationController::class, 'bulkDestroy'])->name('locations.bulk-destroy');
    Route::resource('locations', \App\Http\Controllers\Admin\LocationController::class);

    // Bookings
    Route::post('bookings/{id}/status', [\App\Http\Controllers\Admin\BookingController::class, 'updateStatus'])->name('bookings.update-status');
    Route::post('bookings/{id}/payment-status', [\App\Http\Controllers\Admin\BookingController::class, 'updatePaymentStatus'])->name('bookings.update-payment-status');
    Route::resource('bookings', \App\Http\Controllers\Admin\BookingController::class)->only(['index', 'show', 'destroy']);

    // Users
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class);

    // Contacts (User Messages)
    Route::resource('contacts', \App\Http\Controllers\Admin\ContactController::class)->only(['index', 'show', 'destroy']);

    // Settings
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('general', [\App\Http\Controllers\Admin\SettingController::class, 'general'])->name('general');
        Route::get('branding', [\App\Http\Controllers\Admin\SettingController::class, 'branding'])->name('branding');
        Route::get('seo', [\App\Http\Controllers\Admin\SettingController::class, 'seo'])->name('seo');
        Route::get('social', [\App\Http\Controllers\Admin\SettingController::class, 'social'])->name('social');
        Route::get('booking', [\App\Http\Controllers\Admin\SettingController::class, 'booking'])->name('booking');
        Route::get('notifications', [\App\Http\Controllers\Admin\SettingController::class, 'notifications'])->name('notifications');
        Route::get('business', [\App\Http\Controllers\Admin\SettingController::class, 'business'])->name('business');
        Route::get('email', [\App\Http\Controllers\Admin\SettingController::class, 'email'])->name('email');
        Route::get('sslcommerz', [\App\Http\Controllers\Admin\SettingController::class, 'sslCommerz'])->name('sslcommerz');
        Route::get('contact', [\App\Http\Controllers\Admin\SettingController::class, 'contact'])->name('contact');
        Route::get('legal', [\App\Http\Controllers\Admin\SettingController::class, 'legal'])->name('legal');
        Route::post('update', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('update');
    });

    // Maintenance
    Route::prefix('maintenance')->name('maintenance.')->group(function () {
        Route::get('logs', [\App\Http\Controllers\Admin\MaintenanceController::class, 'logs'])->name('logs');
        Route::get('backups', [\App\Http\Controllers\Admin\MaintenanceController::class, 'backups'])->name('backups');
        Route::get('updates', [\App\Http\Controllers\Admin\MaintenanceController::class, 'updates'])->name('updates');
        Route::get('optimize', [\App\Http\Controllers\Admin\MaintenanceController::class, 'optimize'])->name('optimize');
        Route::get('backups/download/{filename}', [\App\Http\Controllers\Admin\MaintenanceController::class, 'downloadFile'])->name('backups.download');
        Route::post('backups/generate', [\App\Http\Controllers\Admin\MaintenanceController::class, 'generateBackup'])->name('backups.generate');
        Route::delete('backups/delete/{filename}', [\App\Http\Controllers\Admin\MaintenanceController::class, 'deleteFile'])->name('backups.delete');
        Route::post('logs/clear', [\App\Http\Controllers\Admin\MaintenanceController::class, 'clearLogs'])->name('logs.clear');
        Route::post('optimize/run', [\App\Http\Controllers\Admin\MaintenanceController::class, 'runOptimize'])->name('optimize.run');
    });
});

// --- Maintenance Page ---
Route::get('/maintenance', function () {
    return Inertia::render('Maintenance/Index');
})->name('maintenance');

// --- Special Payment Restoration Route (Public) ---
Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
    Route::get('/payment/finish', [\App\Http\Controllers\User\Booking\PaymentController::class, 'paymentFinish'])->name('payment.finish');
});

// --- Fallback ---
Route::fallback(function () {
    return Inertia::render('Errors/404');
});

// --- Auth Routes ---
require __DIR__.'/auth.php';
