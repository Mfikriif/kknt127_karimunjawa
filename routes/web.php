<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SeaweedTypeController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\HasilAlamController;

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
Route::get('/hasil-alam', [HasilAlamController::class, 'index'])->name('hasil-alam.public');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



// admin auth
Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
});


// admin panel
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // products
    Route::resource('products', ProductController::class);

    // seaweed types
    Route::get('/seaweed-types', [SeaweedTypeController::class, 'index'])->name('seaweed-types.index');
    Route::get('/seaweed-types/create', [SeaweedTypeController::class, 'create'])->name('seaweed-types.create');
    Route::post('/seaweed-types', [SeaweedTypeController::class, 'store'])->name('seaweed-types.store');
    Route::get('/seaweed-types/{seaweedType}/edit', [SeaweedTypeController::class, 'edit'])->name('seaweed-types.edit');
    Route::put('/seaweed-types/{seaweedType}', [SeaweedTypeController::class, 'update'])->name('seaweed-types.update');
    Route::delete('/seaweed-types/{seaweedType}', [SeaweedTypeController::class, 'destroy'])->name('seaweed-types.destroy');

    // hasil alam
    Route::get('/hasil-alam', [HasilAlamController::class, 'index'])->name('hasil-alam.index');
    Route::get('/hasil-alam/create', [HasilAlamController::class, 'create'])->name('hasil-alam.create');
    Route::post('/hasil-alam', [HasilAlamController::class, 'store'])->name('hasil-alam.store');
    Route::get('/hasil-alam/{hasilAlam}/edit', [HasilAlamController::class, 'edit'])->name('hasil-alam.edit');
    Route::put('/hasil-alam/{hasilAlam}', [HasilAlamController::class, 'update'])->name('hasil-alam.update');
    Route::delete('/hasil-alam/{hasilAlam}', [HasilAlamController::class, 'destroy'])->name('hasil-alam.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
