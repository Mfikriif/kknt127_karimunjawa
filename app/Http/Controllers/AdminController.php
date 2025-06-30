<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\SeaweedType;
use App\Models\ProcessingMethod;
use App\Models\AdminActivity;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Cek role admin
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403, 'Akses hanya untuk admin.');
        }

        // Ambil data untuk dashboard
        return Inertia::render('admin/AdminDashboard', [
            'totalProduk' => Product::count(),
            'jenisRumputLaut' => SeaweedType::count(),
            'aktivitas' => AdminActivity::latest()->take(10)->get(),
        ]);
    }
}
