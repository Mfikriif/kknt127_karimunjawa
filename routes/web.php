<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SeaweedTypeController;
use App\Http\Controllers\ProcessingMethodController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\AdminAuthController;

Route::get('/', function () {
    return Inertia::render('landingPage/home-page');
})->name('home');

Route::get('/time-line', function () {
    return Inertia::render('timeLine/time-line');
})->name('timeLine');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/products', [ProductController::class, 'userIndex']);
Route::get('/seaweed-type', [SeaweedTypeController::class, 'userIndex'])->name('seaweed-type.public.index');

// USER PUBLIC Processing Method 
Route::get('/user/processing-methods', [ProcessingMethodController::class, 'publicIndex'])->name('processing-methods.public.index');


Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});


Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Products
    Route::resource('products', ProductController::class);

    // Seaweed Types
    Route::prefix('seaweed-types')->name('seaweed-types.')->group(function () {
        Route::get('/', [SeaweedTypeController::class, 'index'])->name('index');
        Route::get('/create', [SeaweedTypeController::class, 'create'])->name('create');
        Route::post('/', [SeaweedTypeController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [SeaweedTypeController::class, 'edit'])->name('edit');
        Route::put('/{id}', [SeaweedTypeController::class, 'update'])->name('update');
        Route::delete('/{id}', [SeaweedTypeController::class, 'destroy'])->name('destroy');
    });

    // Processing Methods for ADMIN
    Route::resource('processing-methods', ProcessingMethodController::class);
});

// Redirect to dashboard on /admin
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });
});
// Halaman processing method untuk user (public)
Route::get('/user/processing-methods', [ProcessingMethodController::class, 'publicIndex'])->name('processing-methods.public.index');

Route::get('/processing-methods', [ProcessingMethodController::class, 'publicIndex'])
    ->name('processing-methods.public.index');

    Route::get('/admin/products', [ProductController::class, 'index'])->name('products.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
