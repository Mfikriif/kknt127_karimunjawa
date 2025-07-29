<?php

// File: app/Http/Controllers/UmkmController.php
// Update method index() dan tambahkan helper methods

namespace App\Http\Controllers;

use App\Models\Umkm;
use App\Models\UmkmContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UmkmController extends Controller
{
    /**
     * Display the UMKM main page
     */
    public function index(Request $request)
    {
        // Jika ada parameter filter dari frontend, tampilkan daftar UMKM dengan filter
        if ($request->has('category') || $request->has('search')) {
            return $this->getFilteredUmkms($request);
        }

        // Ambil statistik real dari database
        $stats = [
            'total_umkm' => Umkm::where('is_active', true)->count(),
            'total_products' => $this->getTotalProducts(),
            'total_categories' => Umkm::where('is_active', true)->distinct('category')->count(),
            'revenue_increase' => 45 // Data statis untuk persentase peningkatan
        ];

        // PERBAIKAN: Ambil UMKM unggulan dengan logika yang lebih baik
        $featured_umkms = $this->getFeaturedUmkmsForHomepage();

        // Ambil data kategori dengan jumlah UMKM
        $categories = Umkm::getCategoryStats();

        // Data produk unggulan (bisa diambil dari database atau tetap statis)
        $featured_products = [
            [
                'name' => 'Keripik Rumput Laut',
                'description' => 'Keripik rumput laut dengan berbagai varian rasa',
                'price' => 'Rp 25.000',
                'image' => '/images/products/keripik-rumput-laut.jpg'
            ],
            [
                'name' => 'Dodol Rumput Laut',
                'description' => 'Dodol tradisional dengan campuran rumput laut',
                'price' => 'Rp 15.000',
                'image' => '/images/products/dodol-rumput-laut.jpg'
            ],
            [
                'name' => 'Selai Rumput Laut',
                'description' => 'Selai sehat kaya nutrisi dari rumput laut',
                'price' => 'Rp 20.000',
                'image' => '/images/products/selai-rumput-laut.jpg'
            ]
        ];

        // Tampilkan halaman utama UMKM dengan data dari database
        return Inertia::render('umkm/umkm-page', [
            'stats' => $stats,
            'featured_products' => $featured_products,
            'featured_umkms' => $featured_umkms, // Data UMKM untuk Programs Section
            'categories' => $categories // Data kategori untuk quick links
        ]);
    }

    /**
     * BARU: Method untuk mendapatkan UMKM unggulan dengan distribusi kategori yang baik
     */
    private function getFeaturedUmkmsForHomepage()
    {
        // Ambil semua kategori yang ada
        $categories = Umkm::where('is_active', true)
            ->distinct('category')
            ->pluck('category')
            ->toArray();

        $featuredUmkms = collect();
        $maxPerCategory = 1; // Maksimal 1 UMKM per kategori untuk diversitas
        $totalTarget = 6; // Target total 6 UMKM

        // Prioritas 1: Ambil 1 UMKM terbaik dari setiap kategori (maksimal 5 kategori berbeda)
        foreach ($categories as $category) {
            if ($featuredUmkms->count() >= 5) break; // Maksimal 5 kategori berbeda
            
            $umkmFromCategory = Umkm::where('is_active', true)
                ->where('category', $category)
                ->orderBy('is_verified', 'desc')
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->first();

            if ($umkmFromCategory) {
                $featuredUmkms->push($umkmFromCategory);
            }
        }

        // Prioritas 2: Jika belum mencapai 6, tambahkan UMKM terbaik yang belum masuk
        if ($featuredUmkms->count() < $totalTarget) {
            $excludeIds = $featuredUmkms->pluck('id')->toArray();
            
            $additionalUmkms = Umkm::where('is_active', true)
                ->whereNotIn('id', $excludeIds)
                ->orderBy('is_verified', 'desc')
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->take($totalTarget - $featuredUmkms->count())
                ->get();

            $featuredUmkms = $featuredUmkms->concat($additionalUmkms);
        }

        return $featuredUmkms->take($totalTarget);
    }

    /**
     * BARU: Method untuk mendapatkan UMKM berdasarkan kategori dengan limit
     */
    public function getUmkmsByCategory(Request $request)
    {
        $category = $request->get('category', 'Semua');
        $limit = $request->get('limit', 3); // Default 3 untuk kategori spesifik

        if ($category === 'Semua') {
            // Untuk "Semua", gunakan logic yang sama seperti homepage tapi dengan limit 6
            $umkms = $this->getFeaturedUmkmsForHomepage();
        } else {
            // Untuk kategori spesifik, ambil maksimal 3 terbaik
            $umkms = Umkm::where('is_active', true)
                ->where('category', $category)
                ->orderBy('is_verified', 'desc')
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->take($limit)
                ->get();
        }

        return response()->json([
            'umkms' => $umkms,
            'category' => $category,
            'total' => $umkms->count(),
            'limit_applied' => $limit
        ]);
    }

    /**
     * Display the UMKM list page (untuk route /umkm/list-umkm)
     * Method baru yang ditambahkan
     */
    public function listUmkm(Request $request)
    {
        // Set default category ke 'Semua' jika tidak ada parameter
        if (!$request->has('category')) {
            $request->merge(['category' => 'Semua']);
        }
        
        // Gunakan method yang sudah ada untuk filtering
        return $this->getFilteredUmkms($request);
    }

    /**
     * Get filtered UMKMs for listing page
     */
    public function getFilteredUmkms(Request $request)
    {
        $query = Umkm::where('is_active', true);

        // Filter berdasarkan kategori
        if ($request->filled('category') && $request->category !== 'Semua') {
            $query->where('category', $request->category);
        }

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('owner', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
                  
                // Search dalam products array (JSON)
                // Untuk MySQL
                if (DB::connection()->getDriverName() === 'mysql') {
                    $q->orWhereRaw('JSON_SEARCH(products, "one", ?) IS NOT NULL', ["%{$search}%"]);
                }
                // Untuk SQLite (fallback)
                else {
                    $q->orWhereRaw('products LIKE ?', ["%{$search}%"]);
                }
            });
        }

        // Ordering: verified first, then by rating, then by latest
        $umkms = $query->orderBy('is_verified', 'desc')
                      ->orderBy('rating', 'desc')
                      ->latest()
                      ->paginate(12);

        // Ambil data untuk filter kategori
        $categories = Umkm::getCategoryStats();

        // TAMBAHKAN: Hitung statistik untuk halaman list
        $stats = [
            'total_umkm' => Umkm::where('is_active', true)->count(),
            'total_products' => $this->getTotalProducts(),
            'total_categories' => Umkm::where('is_active', true)->distinct('category')->count(),
        ];

        // Tentukan halaman yang akan di-render berdasarkan context
        $currentCategory = $request->get('category', 'Semua');
        $searchQuery = $request->get('search', '');
        
        return Inertia::render('umkm/umkm-list', [
            'umkms' => $umkms,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
            'current_category' => $currentCategory,
            'search_query' => $searchQuery,
            'stats' => $stats, // TAMBAHAN: Kirim stats ke frontend
        ]);
    }

    // ... sisa method lainnya tetap sama ...

    /**
     * Display specific UMKM detail - ENHANCED VERSION
     */
    public function show(Umkm $umkm)
    {
        // Pastikan UMKM aktif
        if (!$umkm->is_active) {
            abort(404, 'UMKM tidak ditemukan atau sedang tidak aktif.');
        }

        // Ambil UMKM terkait (kategori sama, exclude current)
        $relatedUmkms = Umkm::where('is_active', true)
            ->where('category', $umkm->category)
            ->where('id', '!=', $umkm->id)
            ->orderBy('rating', 'desc')
            ->orderBy('is_verified', 'desc')
            ->take(4)
            ->get();

        // Tambahkan data tambahan untuk UMKM jika diperlukan
        $umkmData = $umkm->toArray();
        
        // Ensure products is an array
        if (is_string($umkmData['products'])) {
            $umkmData['products'] = json_decode($umkmData['products'], true) ?: [];
        }
        
        // Add additional fields if they exist in database, with fallbacks
        $additionalFields = [
            'price_range' => $umkm->price_range ?? 'Rp 10.000 - Rp 50.000',
            'website' => $umkm->website ?? null,
            'email' => $umkm->email ?? null,
            'facilities' => $umkm->facilities ?? ['Tempat Parkir', 'WiFi', 'Pembayaran Tunai'],
            'opening_hours' => $umkm->opening_hours ?? [
                'senin' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'selasa' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'rabu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'kamis' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'jumat' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'sabtu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
                'minggu' => ['is_open' => false, 'open_time' => '', 'close_time' => '']
            ]
        ];

        // Merge additional fields
        $umkmData = array_merge($umkmData, $additionalFields);

        // Parse facilities if it's JSON string
        if (isset($umkmData['facilities']) && is_string($umkmData['facilities'])) {
            $umkmData['facilities'] = json_decode($umkmData['facilities'], true) ?: $additionalFields['facilities'];
        }

        // Parse opening hours if it's JSON string
        if (isset($umkmData['opening_hours']) && is_string($umkmData['opening_hours'])) {
            $umkmData['opening_hours'] = json_decode($umkmData['opening_hours'], true) ?: $additionalFields['opening_hours'];
        }

        // Parse display_photos if it's JSON string
        if (isset($umkmData['display_photos']) && is_string($umkmData['display_photos'])) {
            $umkmData['display_photos'] = json_decode($umkmData['display_photos'], true) ?: [];
        }

        return Inertia::render('umkm/umkm-detail', [
            'umkm' => $umkmData,
            'related_umkms' => $relatedUmkms,
        ]);
    }

    /**
     * Store contact form submission - ENHANCED VERSION
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|max:1000',
            'umkm_id' => 'nullable|exists:umkms,id', // Optional untuk contact umum
            'subject' => 'nullable|string|max:255',
            'visit_date' => 'nullable|date|after_or_equal:today',
            'visit_time' => 'nullable|date_format:H:i',
        ]);

        // Create contact record if UmkmContact model exists
        try {
            if (class_exists('App\Models\UmkmContact')) {
                UmkmContact::create($validated);
            } else {
                // Fallback: save to session or log
                session()->flash('contact_message', $validated);
            }
        } catch (\Exception $e) {
            // Fallback: save to session
            session()->flash('contact_message', $validated);
        }

        return back()->with('success', 'Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.');
    }

    /**
     * Get UMKMs by category (API endpoint) - DIPERBAIKI
     */
    public function getByCategory(Request $request)
    {
        $category = $request->get('category', 'Semua');
        $limit = $request->get('limit', $category === 'Semua' ? 6 : 3);
        
        if ($category === 'Semua') {
            // Untuk "Semua", gunakan logic diversitas kategori
            $umkms = $this->getFeaturedUmkmsForHomepage();
        } else {
            // Untuk kategori spesifik, ambil yang terbaik dengan limit
            $umkms = Umkm::where('is_active', true)
                ->where('category', $category)
                ->orderBy('is_verified', 'desc')
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->take($limit)
                ->get();
        }
        
        return response()->json([
            'umkms' => $umkms,
            'category' => $category,
            'total' => $umkms->count(),
            'limit_applied' => $limit
        ]);
    }

    /**
     * Get UMKM statistics for API
     */
    public function getStats()
    {
        $stats = [
            'total_umkm' => Umkm::where('is_active', true)->count(),
            'total_products' => $this->getTotalProducts(),
            'total_categories' => Umkm::where('is_active', true)->distinct('category')->count(),
            'categories_count' => Umkm::where('is_active', true)->distinct('category')->count(),
            'by_category' => Umkm::getCategoryStats(),
        ];

        return response()->json($stats);
    }

    /**
     * Helper method untuk menghitung total produk
     */
    private function getTotalProducts()
    {
        return Umkm::where('is_active', true)
            ->get()
            ->sum(function ($umkm) {
                // Handle both array and JSON string formats
                $products = $umkm->products;
                if (is_string($products)) {
                    $products = json_decode($products, true) ?: [];
                }
                return is_array($products) ? count($products) : 0;
            });
    }
}