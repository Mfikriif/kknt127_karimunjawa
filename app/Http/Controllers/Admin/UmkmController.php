<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UmkmController extends Controller
{
    public function index(Request $request)
    {
        $query = Umkm::query();

        // Filter berdasarkan kategori
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter berdasarkan status aktif
        if ($request->filled('active')) {
            $query->where('is_active', $request->active === 'true');
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('owner', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $umkms = $query->latest()->paginate(12);
        
        return Inertia::render('admin/umkm/index', [
            'umkms' => $umkms,
            'categories' => Umkm::getCategories(),
            'filters' => $request->only(['category', 'active', 'search']),
            'stats' => [
                'total' => Umkm::count(),
                'active' => Umkm::where('is_active', true)->count(),
                'inactive' => Umkm::where('is_active', false)->count(),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/umkm/create', [
            'categories' => Umkm::getCategories(),
            'defaultOpeningHours' => Umkm::getDefaultOpeningHours()
        ]);
    }

    public function store(Request $request)
    {
        // Validation tanpa category dulu
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'owner' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'products' => 'required|array|min:1',
            'products.*' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'rating' => 'nullable|numeric|min:0|max:5',
            'image' => 'required|string|max:10',
            'price_range' => 'nullable|string|max:100', 
            'display_photos' => 'nullable|array|max:3',
            'display_photos.*' => 'image|mimes:jpeg,png,jpg,gif,heic|max:5120',
            'menu_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,heic|max:5120',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'opening_hours' => 'nullable|array',
            'opening_hours.*.is_open' => 'boolean',
            'opening_hours.*.open_time' => 'nullable|string',
            'opening_hours.*.close_time' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        // Manual category validation
        $availableCategories = Umkm::getCategories();
        $selectedCategory = $request->input('category');
        
        if (!$selectedCategory || !in_array($selectedCategory, $availableCategories)) {
            return back()->withErrors([
                'category' => 'Silakan pilih kategori yang valid dari: ' . implode(', ', $availableCategories)
            ])->withInput();
        }
        
        // Add category to validated data
        $validated['category'] = $selectedCategory;

        // Custom validation: Harus ada foto display atau icon
        if (!$request->hasFile('display_photos') && empty($validated['image'])) {
            return back()->withErrors([
                'display_photos' => 'Wajib upload minimal 1 foto display atau pilih icon untuk UMKM.'
            ])->withInput();
        }

        // Set default values
        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['opening_hours'] = $validated['opening_hours'] ?? Umkm::getDefaultOpeningHours();
        $validated['is_active'] = $validated['is_active'] ?? true;

        // Handle display photos upload
        $displayPhotos = [];
        if ($request->hasFile('display_photos')) {
            foreach ($request->file('display_photos') as $photo) {
                $filename = Str::random(20) . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('umkm/display', $filename, 'public');
                $displayPhotos[] = $filename;
            }
        }
        $validated['display_photos'] = $displayPhotos;

        // Handle menu photo upload with HEIC conversion
        if ($request->hasFile('menu_photo')) {
            $menuPhoto = $request->file('menu_photo');
            $filename = Str::random(20) . '.' . $menuPhoto->getClientOriginalExtension();
            $menuPhoto->storeAs('umkm/menu', $filename, 'public');
            $validated['menu_photo'] = $filename;
        }
        Umkm::create($validated);

        return redirect()->route('admin.umkm.index')
                        ->with('success', 'UMKM berhasil ditambahkan!');
    }

    public function show(Umkm $umkm)
    {
        return Inertia::render('admin/umkm/show', [
            'umkm' => $umkm
        ]);
    }

    public function edit(Umkm $umkm)
    {
        return Inertia::render('admin/umkm/edit', [
            'umkm' => $umkm,
            'categories' => Umkm::getCategories(),
            'defaultOpeningHours' => Umkm::getDefaultOpeningHours()
        ]);
    }

    public function update(Request $request, Umkm $umkm)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'owner' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'products' => 'required|array|min:1',
            'products.*' => 'required|string|max:255',
            'contact' => 'required|string|max:20',
            'rating' => 'nullable|numeric|min:0|max:5',
            'image' => 'required|string|max:10',
            'price_range' => 'nullable|string|max:100', 
            'display_photos' => 'nullable|array|max:3',
            'display_photos.*' => 'image|mimes:jpeg,png,jpg,gif,heic|max:5120',
            'menu_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,heic|max:5120',
            'remove_display_photos' => 'nullable|array',
            'remove_display_photos.*' => 'string',
            'remove_menu_photo' => 'nullable|boolean',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'opening_hours' => 'nullable|string', // JSON string dari frontend
            'is_active' => 'nullable|boolean'
        ]);

        // Manual category validation (sama seperti store method)
        $availableCategories = Umkm::getCategories();
        $selectedCategory = $request->input('category');
        
        if (!$selectedCategory || !in_array($selectedCategory, $availableCategories)) {
            return back()->withErrors([
                'category' => 'Silakan pilih kategori yang valid dari: ' . implode(', ', $availableCategories)
            ])->withInput();
        }
        
        // Add category to validated data
        $validated['category'] = $selectedCategory;

        // Parse opening hours JSON jika ada
        if (isset($validated['opening_hours'])) {
            $validated['opening_hours'] = json_decode($validated['opening_hours'], true);
        }

        // Set default values
        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['opening_hours'] = $validated['opening_hours'] ?? Umkm::getDefaultOpeningHours();
        $validated['is_active'] = isset($validated['is_active']) ? (bool)$validated['is_active'] : true;

        // Handle display photos removal
        $currentDisplayPhotos = $umkm->display_photos ?? [];
        
        if (isset($validated['remove_display_photos'])) {
            foreach ($validated['remove_display_photos'] as $photoToRemove) {
                // Delete file from storage
                if (Storage::disk('public')->exists('umkm/display/' . $photoToRemove)) {
                    Storage::disk('public')->delete('umkm/display/' . $photoToRemove);
                }
                // Remove from current photos array
                $currentDisplayPhotos = array_filter($currentDisplayPhotos, function($photo) use ($photoToRemove) {
                    return $photo !== $photoToRemove;
                });
            }
        }

        // Handle new display photos upload
        if ($request->hasFile('display_photos')) {
            foreach ($request->file('display_photos') as $photo) {
                if (count($currentDisplayPhotos) < 3) {
                    $filename = Str::random(20) . '.' . $photo->getClientOriginalExtension();
                    $photo->storeAs('umkm/display', $filename, 'public');
                    $currentDisplayPhotos[] = $filename;
                }
            }
        }
        
        $validated['display_photos'] = array_values($currentDisplayPhotos);

        // Handle menu photo removal
        if (isset($validated['remove_menu_photo']) && $validated['remove_menu_photo']) {
            if ($umkm->menu_photo && Storage::disk('public')->exists('umkm/menu/' . $umkm->menu_photo)) {
                Storage::disk('public')->delete('umkm/menu/' . $umkm->menu_photo);
            }
            $validated['menu_photo'] = null;
        } else {
            $validated['menu_photo'] = $umkm->menu_photo;
        }

        // Handle new menu photo upload
        if ($request->hasFile('menu_photo')) {
            // Delete old menu photo if exists
            if ($umkm->menu_photo && Storage::disk('public')->exists('umkm/menu/' . $umkm->menu_photo)) {
                Storage::disk('public')->delete('umkm/menu/' . $umkm->menu_photo);
            }
            
            $menuPhoto = $request->file('menu_photo');
            $filename = Str::random(20) . '.' . $menuPhoto->getClientOriginalExtension();
            $menuPhoto->storeAs('umkm/menu', $filename, 'public');
            $validated['menu_photo'] = $filename;
        }

        // Custom validation: Ensure at least one display photo or icon
        if (empty($validated['display_photos']) && empty($validated['image'])) {
            return back()->withErrors([
                'display_photos' => 'Wajib memiliki minimal 1 foto display atau pilih icon untuk UMKM.'
            ])->withInput();
        }

        // Remove fields that shouldn't be saved to database
        unset($validated['remove_display_photos']);
        unset($validated['remove_menu_photo']);

        // Update the UMKM record
        $umkm->update($validated);

        return redirect()->route('admin.umkm.index')
                        ->with('success', 'UMKM berhasil diperbarui!');
    }

    public function destroy(Umkm $umkm)
    {
        // Delete associated files
        if ($umkm->display_photos) {
            foreach ($umkm->display_photos as $photo) {
                if (Storage::disk('public')->exists('umkm/display/' . $photo)) {
                    Storage::disk('public')->delete('umkm/display/' . $photo);
                }
            }
        }

        if ($umkm->menu_photo && Storage::disk('public')->exists('umkm/menu/' . $umkm->menu_photo)) {
            Storage::disk('public')->delete('umkm/menu/' . $umkm->menu_photo);
        }

        $umkm->delete();

        return redirect()->route('admin.umkm.index')
                        ->with('success', 'UMKM berhasil dihapus!');
    }

    public function toggleActive(Umkm $umkm)
    {
        $umkm->update([
            'is_active' => !$umkm->is_active
        ]);

        return back()->with('success', 'Status aktif UMKM berhasil diubah!');
    }
}