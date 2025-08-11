<?php

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
            'revenue_increase' => 45
        ];

        $featured_umkms = $this->getFeaturedUmkmsForHomepage();
        $categories = Umkm::getCategoryStats();

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

        return Inertia::render('umkm/umkm-page', [
            'stats' => $stats,
            'featured_products' => $featured_products,
            'featured_umkms' => $featured_umkms,
            'categories' => $categories
        ]);
    }

    /**
     * Display the UMKM list page (untuk route /umkm/list-umkm)
     */
    public function listUmkm(Request $request)
    {
        // Set default category ke 'Semua' jika tidak ada parameter
        if (!$request->has('category')) {
            $request->merge(['category' => 'Semua']);
        }
        
        return $this->getFilteredUmkms($request);
    }

/**
     * PERBAIKAN FINAL: Get filtered UMKMs dengan per_page otomatis dan konsisten
     */
    public function getFilteredUmkms(Request $request)
    {
        $query = Umkm::where('is_active', true);

        // Filter berdasarkan kategori - gunakan scope yang sudah ada
        if ($request->filled('category') && $request->category !== 'Semua') {
            $query->category($request->category);
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
                if (DB::connection()->getDriverName() === 'mysql') {
                    $q->orWhereRaw('JSON_SEARCH(products, "one", ?) IS NOT NULL', ["%{$search}%"]);
                } else {
                    $q->orWhereRaw('products LIKE ?', ["%{$search}%"]);
                }
            });
        }

        // PERBAIKAN FINAL: Deteksi per_page dengan logic yang lebih robust
        $perPage = $request->get('per_page');
        
        // Jika tidak ada per_page, tentukan berdasarkan user agent sederhana
        if (!$perPage) {
            // Deteksi mobile dari user agent (fallback)
            $userAgent = $request->header('User-Agent', '');
            $isMobile = preg_match('/Mobile|Android|iPhone|iPad/', $userAgent);
            $perPage = $isMobile ? 6 : 12;
        }
        
        // Validasi dan normalisasi per_page
        $perPage = (int) $perPage;
        $allowedPerPage = [6, 12, 18, 24];
        
        if (!in_array($perPage, $allowedPerPage)) {
            // Default berdasarkan konteks
            $perPage = 12; // Default ke 12, frontend akan adjust
        }

        // Log untuk debugging
        \Log::info('UMKM Pagination Request', [
            'requested_per_page' => $request->get('per_page'),
            'final_per_page' => $perPage,
            'user_agent' => $request->header('User-Agent'),
            'category' => $request->get('category'),
            'search' => $request->get('search')
        ]);

        // Ordering: rating first, then by latest
        $umkms = $query->orderBy('rating', 'desc')
                      ->latest()
                      ->paginate($perPage);

        // KUNCI: Pastikan pagination links menyertakan semua parameter
        $umkms->appends([
            'category' => $request->get('category', 'Semua'),
            'search' => $request->get('search'),
            'per_page' => $perPage
        ]);

        // Ambil data untuk filter kategori
        $categories = Umkm::getCategoryStats();

        // Hitung statistik untuk halaman list
        $stats = [
            'total_umkm' => Umkm::where('is_active', true)->count(),
            'total_products' => $this->getTotalProducts(),
            'total_categories' => Umkm::where('is_active', true)->distinct('category')->count(),
        ];

        $currentCategory = $request->get('category', 'Semua');
        $searchQuery = $request->get('search', '');
        
        // PERBAIKAN: Return dengan struktur yang konsisten
        return Inertia::render('umkm/umkm-list', [
            'umkms' => [
                'data' => $umkms->items(),
                'meta' => [
                    'current_page' => $umkms->currentPage(),
                    'last_page' => $umkms->lastPage(),
                    'from' => $umkms->firstItem(),
                    'to' => $umkms->lastItem(),
                    'total' => $umkms->total(),
                    'per_page' => $umkms->perPage(),
                    'path' => $umkms->path(),
                ],
                'links' => $umkms->linkCollection()->toArray()
            ],
            'categories' => $categories,
            'filters' => $request->only(['category', 'search']),
            'current_category' => $currentCategory,
            'search_query' => $searchQuery,
            'stats' => $stats,
            'per_page' => $perPage,
            // TAMBAHAN: Metadata untuk debugging
            'debug_info' => [
                'screen_detection' => 'auto',
                'requested_per_page' => $request->get('per_page'),
                'final_per_page' => $perPage,
                'timestamp' => now()->toISOString()
            ]
        ]);
    }

    /**
     * BARU: Method untuk mendapatkan UMKM unggulan dengan distribusi kategori yang baik
     */
    private function getFeaturedUmkmsForHomepage()
    {
        $categories = Umkm::getCategories();
        $featuredUmkms = collect();
        $totalTarget = 6;

        foreach ($categories as $category) {
            if ($featuredUmkms->count() >= 5) break;
            
            $umkmFromCategory = Umkm::where('is_active', true)
                ->where('category', $category)
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->first();

            if ($umkmFromCategory) {
                $featuredUmkms->push($umkmFromCategory);
            }
        }

        if ($featuredUmkms->count() < $totalTarget) {
            $excludeIds = $featuredUmkms->pluck('id')->toArray();
            
            $additionalUmkms = Umkm::where('is_active', true)
                ->whereNotIn('id', $excludeIds)
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->take($totalTarget - $featuredUmkms->count())
                ->get();

            $featuredUmkms = $featuredUmkms->concat($additionalUmkms);
        }

        return $featuredUmkms->take($totalTarget);
    }

    /**
     * Display specific UMKM detail
     */
    public function show(Umkm $umkm)
    {
        if (!$umkm->is_active) {
            abort(404, 'UMKM tidak ditemukan atau sedang tidak aktif.');
        }

        $relatedUmkms = Umkm::where('is_active', true)
            ->where('category', $umkm->category)
            ->where('id', '!=', $umkm->id)
            ->orderBy('rating', 'desc')
            ->take(4)
            ->get();

        $umkmData = $umkm->toArray();
        
        if (is_string($umkmData['products'])) {
            $umkmData['products'] = json_decode($umkmData['products'], true) ?: [];
        }
        
        $additionalFields = [
            'price_range' => $umkm->price_range ?? 'Rp 10.000 - Rp 50.000',
            'website' => $umkm->website ?? null,
            'email' => $umkm->email ?? null,
            'facilities' => $umkm->facilities ?? ['Tempat Parkir', 'WiFi', 'Pembayaran Tunai'],
            'opening_hours' => $umkm->opening_hours ?? Umkm::getDefaultOpeningHours()
        ];

        $umkmData = array_merge($umkmData, $additionalFields);

        if (isset($umkmData['facilities']) && is_string($umkmData['facilities'])) {
            $umkmData['facilities'] = json_decode($umkmData['facilities'], true) ?: $additionalFields['facilities'];
        }

        if (isset($umkmData['opening_hours']) && is_string($umkmData['opening_hours'])) {
            $umkmData['opening_hours'] = json_decode($umkmData['opening_hours'], true) ?: $additionalFields['opening_hours'];
        }

        if (isset($umkmData['display_photos']) && is_string($umkmData['display_photos'])) {
            $umkmData['display_photos'] = json_decode($umkmData['display_photos'], true) ?: [];
        }

        return Inertia::render('umkm/umkm-detail', [
            'umkm' => $umkmData,
            'related_umkms' => $relatedUmkms,
        ]);
    }

    /**
     * Store contact form submission
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|max:1000',
            'umkm_id' => 'nullable|exists:umkms,id',
            'subject' => 'nullable|string|max:255',
            'visit_date' => 'nullable|date|after_or_equal:today',
            'visit_time' => 'nullable|date_format:H:i',
        ]);

        try {
            if (class_exists('App\Models\UmkmContact')) {
                UmkmContact::create($validated);
            } else {
                session()->flash('contact_message', $validated);
            }
        } catch (\Exception $e) {
            session()->flash('contact_message', $validated);
        }

        return back()->with('success', 'Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.');
    }

    /**
     * Get UMKMs by category (API endpoint) - existing method name sesuai route
     */
    public function getUmkmsByCategory(Request $request)
    {
        $category = $request->get('category', 'Semua');
        $limit = $request->get('limit', $category === 'Semua' ? 6 : 3);
        
        if ($category === 'Semua') {
            $umkms = $this->getFeaturedUmkmsForHomepage();
        } else {
            $umkms = Umkm::where('is_active', true)
                ->where('category', $category)
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
     * Get UMKMs by category (backward compatibility)
     */
    public function getByCategory(Request $request)
    {
        return $this->getUmkmsByCategory($request);
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
     * Search UMKM (autocomplete)
     */
    public function search(Request $request)
    {
        $term = $request->get('q', '');
        $limit = $request->get('limit', 10);

        if (empty($term)) {
            return response()->json([]);
        }

        $umkms = Umkm::where('is_active', true)
            ->where(function($query) use ($term) {
                $query->where('name', 'like', "%{$term}%")
                      ->orWhere('owner', 'like', "%{$term}%")
                      ->orWhere('category', 'like', "%{$term}%");
            })
            ->select('id', 'name', 'owner', 'category', 'image')
            ->take($limit)
            ->get();

        return response()->json($umkms);
    }

    /**
     * Get featured UMKMs
     */
    public function getFeatured(Request $request)
    {
        $limit = $request->get('limit', 6);
        $umkms = $this->getFeaturedUmkmsForHomepage()->take($limit);

        return response()->json([
            'umkms' => $umkms,
            'total' => $umkms->count()
        ]);
    }

    /**
     * Get opening hours for specific UMKM
     */
    public function getOpeningHours(Umkm $umkm)
    {
        return response()->json([
            'opening_hours' => $umkm->opening_hours ?: Umkm::getDefaultOpeningHours(),
            'today_hours' => $umkm->getTodayOpeningHours(),
            'is_open_today' => $umkm->isOpenToday(),
            'is_open_now' => $umkm->isOpenNow()
        ]);
    }

    /**
     * Check if UMKM is currently open
     */
    public function isCurrentlyOpen(Umkm $umkm)
    {
        return response()->json([
            'is_open' => $umkm->isOpenNow(),
            'is_open_today' => $umkm->isOpenToday(),
            'today_hours' => $umkm->getTodayOpeningHours()
        ]);
    }

    /**
     * Export UMKM data
     */
    public function export(Request $request)
    {
        $format = $request->get('format', 'json');
        $umkms = Umkm::where('is_active', true)->get();

        switch ($format) {
            case 'csv':
                return response()->streamDownload(function () use ($umkms) {
                    $handle = fopen('php://output', 'w');
                    fputcsv($handle, ['ID', 'Name', 'Owner', 'Category', 'Contact', 'Rating']);
                    
                    foreach ($umkms as $umkm) {
                        fputcsv($handle, [
                            $umkm->id,
                            $umkm->name,
                            $umkm->owner,
                            $umkm->category,
                            $umkm->contact,
                            $umkm->rating
                        ]);
                    }
                    
                    fclose($handle);
                }, 'umkm-data.csv');

            case 'json':
            default:
                return response()->json($umkms);
        }
    }

    /**
     * Get contact messages (for admin)
     */
    public function getContactMessages(Request $request)
    {
        if (!class_exists('App\Models\UmkmContact')) {
            return response()->json([]);
        }

        $messages = UmkmContact::with('umkm')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($messages);
    }

    /**
     * Mark contact message as read
     */
    public function markContactAsRead(Request $request, $contactId)
    {
        if (!class_exists('App\Models\UmkmContact')) {
            return response()->json(['error' => 'Contact model not found'], 404);
        }

        $contact = UmkmContact::findOrFail($contactId);
        $contact->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }

    /**
     * Helper method untuk menghitung total produk
     */
    private function getTotalProducts()
    {
        return Umkm::where('is_active', true)
            ->get()
            ->sum(function ($umkm) {
                $products = $umkm->products;
                if (is_string($products)) {
                    $products = json_decode($products, true) ?: [];
                }
                return is_array($products) ? count($products) : 0;
            });
    }
}