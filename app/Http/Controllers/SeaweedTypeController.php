<?php

namespace App\Http\Controllers;

use App\Models\SeaweedType;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SeaweedTypeController extends Controller
{
    public function index()
    {
        $seaweedTypes = SeaweedType::all();
        return Inertia::render('admin/seaweedtype/index', [
            'seaweedTypes' => $seaweedTypes
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/seaweedtype/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'characteristics' => 'nullable|string',
            'benefits' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('seaweed_images', 'public');
        }

        $seaweed = SeaweedType::create($validated);

        AdminActivity::create([
            'description' => 'Menambahkan jenis rumput laut "' . $seaweed->name . '"',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.seaweed-types.index')
            ->with('success', 'Jenis rumput laut berhasil ditambahkan.');
    }

    public function edit(SeaweedType $seaweedType)
    {
        return Inertia::render('admin/seaweedtype/edit', [
            'seaweedType' => $seaweedType
        ]);
    }

    public function update(Request $request, SeaweedType $seaweedType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'characteristics' => 'nullable|string',
            'benefits' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($seaweedType->image) {
                Storage::disk('public')->delete($seaweedType->image);
            }
            $validated['image'] = $request->file('image')->store('seaweed_images', 'public');
        }

        $seaweedType->update($validated);

        AdminActivity::create([
            'description' => 'Memperbarui jenis rumput laut "' . $seaweedType->name . '"',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.seaweed-types.index')
            ->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(SeaweedType $seaweedType)
    {
        if ($seaweedType->image) {
            Storage::disk('public')->delete($seaweedType->image);
        }

        $name = $seaweedType->name;
        $seaweedType->delete();

        AdminActivity::create([
            'description' => 'Menghapus jenis rumput laut "' . $name . '"',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.seaweed-types.index')
            ->with('success', 'Data berhasil dihapus.');
    }

    public function userIndex()
    {
        $seaweedTypes = SeaweedType::all();

        return Inertia::render('products/seaweed-type', [
            'seaweedTypes' => $seaweedTypes
        ]);
    }
}
