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

Route::get('/budidaya-rula', function () {
    return Inertia::render('petalokasi/budiDaya');
})->name('budidayaRula');

Route::get('/products', [ProductController::class, 'productIndex'])->name('products.index');
Route::get('/seaweed-type', [SeaweedTypeController::class, 'userIndex'])->name('seaweed-type.public.index');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


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
    Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');


    // Seaweed Types
    Route::prefix('seaweed-types')->name('seaweed-types.')->group(function () {
        Route::get('/', [SeaweedTypeController::class, 'index'])->name('index');
        Route::get('/create', [SeaweedTypeController::class, 'create'])->name('create');
        Route::post('/', [SeaweedTypeController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [SeaweedTypeController::class, 'edit'])->name('edit');
        Route::get('/{seaweedType}/edit', [SeaweedTypeController::class, 'edit'])->name('edit');
        Route::put('/{id}', [SeaweedTypeController::class, 'update'])->name('update');
        Route::delete('/{id}', [SeaweedTypeController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
        Route::get('/seaweed-types', [SeaweedTypeController::class, 'index'])->name('admin.seaweed-types.index');
        Route::get('/seaweed-types/{seaweedType}/edit', [SeaweedTypeController::class, 'edit'])->name('admin.seaweed-types.edit');
        Route::put('/seaweed-types/{seaweedType}', [SeaweedTypeController::class, 'update'])->name('admin.seaweed-types.update');
    });
    // Processing Methods untuk admin
    Route::resource('processing-methods', ProcessingMethodController::class);
    Route::put('/seaweed-types/{seaweedType}', [SeaweedTypeController::class, 'update'])->name('admin.seaweed-types.update');

    Route::prefix('admin')->group(function () {
        Route::get('/processing-methods', [ProcessingMethodController::class, 'index'])->name('admin.processing-methods.index');
        Route::get('/processing-methods/create', [ProcessingMethodController::class, 'create'])->name('admin.processing-methods.create');
        Route::post('/processing-methods', [ProcessingMethodController::class, 'store'])->name('admin.processing-methods.store');
        Route::get('/processing-methods/{processingMethod}/edit', [ProcessingMethodController::class, 'edit'])->name('admin.processing-methods.edit');
        Route::put('/processing-methods/{processingMethod}', [ProcessingMethodController::class, 'update'])->name('admin.processing-methods.update');
        Route::delete('/processing-methods/{processingMethod}', [ProcessingMethodController::class, 'destroy'])->name('admin.processing-methods.destroy');
    });
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
