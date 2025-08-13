<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Umkm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'owner',
        'category',
        'description',
        'address',
        'products',
        'contact',
        'rating',
        'image',
        'display_photos',     
        'menu_photo',    
        'price_range',     
        'instagram',
        'facebook',
        'opening_hours',
        'is_active'
    ];

    protected $casts = [
        'products' => 'array',
        'display_photos' => 'array', 
        'opening_hours' => 'array',
        'is_active' => 'boolean',
        'rating' => 'decimal:1'
    ];

    // Scope untuk UMKM yang aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope untuk filter berdasarkan kategori
    public function scopeCategory($query, $category)
    {
        if ($category && $category !== 'Semua') {
            return $query->where('category', $category);
        }
        return $query;
    }

    // Accessor untuk mendapatkan URL foto display
    public function getDisplayPhotoUrlsAttribute()
    {
        if (!$this->display_photos) {
            return [];
        }

        return array_map(function($photo) {
            return Storage::url('umkm/display/' . $photo);
        }, $this->display_photos);
    }

    // Accessor untuk mendapatkan URL foto menu
    public function getMenuPhotoUrlAttribute()
    {
        if (!$this->menu_photo) {
            return null;
        }

        return Storage::url('umkm/menu/' . $this->menu_photo);
    }

    // Method untuk menghapus foto lama - IMPROVED with better error handling
    public function deleteOldPhotos()
    {
        try {
            // Hapus foto display lama
            if ($this->display_photos && is_array($this->display_photos)) {
                foreach ($this->display_photos as $photo) {
                    if ($photo && Storage::disk('public')->exists('umkm/display/' . $photo)) {
                        Storage::disk('public')->delete('umkm/display/' . $photo);
                    }
                }
            }

            // Hapus foto menu lama
            if ($this->menu_photo && Storage::disk('public')->exists('umkm/menu/' . $this->menu_photo)) {
                Storage::disk('public')->delete('umkm/menu/' . $this->menu_photo);
            }
        } catch (\Exception $e) {
            \Log::error('Error deleting UMKM photos: ' . $e->getMessage());
        }
    }

    // Method untuk mendapatkan semua kategori
    public static function getCategories()
    {
        return [
            'Ikan, Seafood, & Rumput Laut',
            'Warung & Kuliner',
            'Kerajinan & Jasa',
            'Penginapan',
            'Wisata'
        ];
    }
    

    // Method untuk mendapatkan jam buka default
    public static function getDefaultOpeningHours()
    {
        return [
            'senin' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'selasa' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'rabu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'kamis' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'jumat' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'sabtu' => ['is_open' => true, 'open_time' => '08:00', 'close_time' => '17:00'],
            'minggu' => ['is_open' => false, 'open_time' => '08:00', 'close_time' => '17:00']
        ];
    }

    // Method untuk mendapatkan statistik kategori
    public static function getCategoryStats()
    {
        $categories = self::getCategories();
        $stats = [];
        
        foreach ($categories as $category) {
            $stats[] = [
                'name' => $category,
                'count' => self::where('category', $category)->where('is_active', true)->count()
            ];
        }
        
        // Tambahkan "Semua"
        array_unshift($stats, [
            'name' => 'Semua',
            'count' => self::where('is_active', true)->count()
        ]);
        
        return $stats;
    }

    // ADDED: Method untuk mengecek apakah UMKM buka hari ini
    public function isOpenToday()
    {
        if (!$this->opening_hours) return false;
        
        $today = strtolower(now()->format('l')); // monday, tuesday, etc
        $dayMapping = [
            'monday' => 'senin',
            'tuesday' => 'selasa', 
            'wednesday' => 'rabu',
            'thursday' => 'kamis',
            'friday' => 'jumat',
            'saturday' => 'sabtu',
            'sunday' => 'minggu'
        ];
        
        $indonesianDay = $dayMapping[$today] ?? null;
        if (!$indonesianDay || !isset($this->opening_hours[$indonesianDay])) {
            return false;
        }
        
        return $this->opening_hours[$indonesianDay]['is_open'] ?? false;
    }

    // ADDED: Method untuk mengecek apakah UMKM buka sekarang
    public function isOpenNow()
    {
        if (!$this->isOpenToday()) return false;
        
        $today = strtolower(now()->format('l'));
        $dayMapping = [
            'monday' => 'senin',
            'tuesday' => 'selasa', 
            'wednesday' => 'rabu',
            'thursday' => 'kamis',
            'friday' => 'jumat',
            'saturday' => 'sabtu',
            'sunday' => 'minggu'
        ];
        
        $indonesianDay = $dayMapping[$today];
        $todayHours = $this->opening_hours[$indonesianDay];
        
        if (!$todayHours['is_open']) return false;
        
        $now = now();
        $currentTime = $now->hour * 60 + $now->minute;
        
        [$openHour, $openMin] = explode(':', $todayHours['open_time']);
        [$closeHour, $closeMin] = explode(':', $todayHours['close_time']);
        
        $openTime = (int)$openHour * 60 + (int)$openMin;
        $closeTime = (int)$closeHour * 60 + (int)$closeMin;
        
        return $currentTime >= $openTime && $currentTime <= $closeTime;
    }

    // ADDED: Method untuk mendapatkan jam buka hari ini
    public function getTodayOpeningHours()
    {
        if (!$this->opening_hours) return null;
        
        $today = strtolower(now()->format('l'));
        $dayMapping = [
            'monday' => 'senin',
            'tuesday' => 'selasa', 
            'wednesday' => 'rabu',
            'thursday' => 'kamis',
            'friday' => 'jumat',
            'saturday' => 'sabtu',
            'sunday' => 'minggu'
        ];
        
        $indonesianDay = $dayMapping[$today] ?? null;
        return $indonesianDay ? ($this->opening_hours[$indonesianDay] ?? null) : null;
    }

    // ==========================================
    // ADDITIONAL METHODS UNTUK PAGINATION SUPPORT
    // ==========================================

    /**
     * Get featured UMKMs dengan diversitas kategori
     */
    public static function getFeatured($limit = 6)
    {
        // Ambil semua kategori yang ada
        $categories = self::getCategories();
        $featuredUmkms = collect();

        // Prioritas 1: Ambil 1 UMKM terbaik dari setiap kategori
        foreach ($categories as $category) {
            if ($featuredUmkms->count() >= ($limit - 1)) break;
            
            $umkmFromCategory = self::active()
                ->where('category', $category)
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->first();

            if ($umkmFromCategory) {
                $featuredUmkms->push($umkmFromCategory);
            }
        }

        // Prioritas 2: Jika belum mencapai limit, tambahkan UMKM terbaik yang belum masuk
        if ($featuredUmkms->count() < $limit) {
            $excludeIds = $featuredUmkms->pluck('id')->toArray();
            
            $additionalUmkms = self::active()
                ->whereNotIn('id', $excludeIds)
                ->orderBy('rating', 'desc')
                ->orderBy('created_at', 'desc')
                ->take($limit - $featuredUmkms->count())
                ->get();

            $featuredUmkms = $featuredUmkms->concat($additionalUmkms);
        }

        return $featuredUmkms->take($limit);
    }

    /**
     * Get top rated UMKMs
     */
    public static function getTopRated($limit = 10)
    {
        return self::active()
            ->orderBy('rating', 'desc')
            ->take($limit)
            ->get();
    }

    /**
     * Get recently added UMKMs
     */
    public static function getRecent($limit = 10)
    {
        return self::active()
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
    }

    /**
     * Get UMKM count by status
     */
    public static function getStatusStats()
    {
        return [
            'total' => self::count(),
            'active' => self::where('is_active', true)->count(),
            'inactive' => self::where('is_active', false)->count(),
        ];
    }

    // ==========================================
    // EXISTING BOOT METHOD (TETAP DIPERTAHANKAN)
    // ==========================================

    // Boot method untuk auto-delete files
    // ==========================================
    // ADDITIONAL ACCESSORS FOR COMPATIBILITY
    // ==========================================

    /**
     * Get the full image URL for display photo
     */
    public function getDisplayImageUrlAttribute()
    {
        if ($this->display_photos && count($this->display_photos) > 0) {
            return Storage::url('umkm/display/' . $this->display_photos[0]);
        }
        
        if ($this->menu_photo) {
            return Storage::url('umkm/menu/' . $this->menu_photo);
        }
        
        return null;
    }

    /**
     * Get opening hours for today (formatted string)
     */
    public function getTodayOpeningHoursAttribute()
    {
        $todayHours = $this->getTodayOpeningHours();
        
        if (!$todayHours) {
            return '08:00-17:00';
        }
        
        if ($todayHours['is_open']) {
            return $todayHours['open_time'] . '-' . $todayHours['close_time'];
        }
        
        return 'Tutup';
    }

    /**
     * Check if UMKM is open now (accessor)
     */
    public function getIsOpenNowAttribute()
    {
        return $this->isOpenNow();
    }

    /**
     * Get products count
     */
    public function getProductsCountAttribute()
    {
        if (is_array($this->products)) {
            return count($this->products);
        }
        
        return 0;
    }

    /**
     * Get rating stars (for display)
     */
    public function getRatingStarsAttribute()
    {
        return str_repeat('★', floor($this->rating)) . str_repeat('☆', 5 - floor($this->rating));
    }

    // ==========================================
    // HELPER METHODS
    // ==========================================

    /**
     * Check if UMKM has valid contact info
     */
    public function hasValidContact()
    {
        return !empty($this->contact) || !empty($this->instagram) || !empty($this->facebook);
    }

    /**
     * Get social media links
     */
    public function getSocialMediaLinks()
    {
        $links = [];
        
        if ($this->instagram) {
            $links['instagram'] = $this->instagram;
        }
        
        if ($this->facebook) {
            $links['facebook'] = $this->facebook;
        }
        
        return $links;
    }

    /**
     * Get summary for display
     */
    public function getSummary($length = 100)
    {
        return strlen($this->description) > $length ? 
            substr($this->description, 0, $length) . '...' : 
            $this->description;
    }

    // Boot method untuk auto-delete files
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($umkm) {
            $umkm->deleteOldPhotos();
        });
    }
}