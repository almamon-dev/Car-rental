<?php

use App\Http\Controllers\Admin\CarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Guest/Home/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/car-details', [ProfileController::class, 'carDetails'])->name('car.details');
Route::get('/car-list', [ProfileController::class, 'carList'])->name('car.list');

// -- Admin Dashboard route --
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // cars resource route
    Route::delete('cars/image/{id}', [CarController::class, 'destroyImage'])->name('cars.image.destroy');
    Route::resource('cars', CarController::class);
});

Route::fallback(function () {
    return Inertia::render('Errors/404');
});

require __DIR__.'/auth.php';
