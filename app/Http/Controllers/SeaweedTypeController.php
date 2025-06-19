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
        return Inertia::render('admin/seaweedtype/index', ['seaweedTypes' => $seaweedTypes]);
    }

    public function create()
    {
        return Inertia::render('admin/seaweedtype/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'characteristics' => 'nullable|string',
            'benefits' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('seaweed_images', 'public');
        }

        $seaweed = SeaweedType::create($data);

        AdminActivity::create([
            'description' => '➕ Jenis rumput laut "' . $seaweed->name . '" berhasil ditambahkan',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.seaweed-types.index')->with('success', 'Seaweed type created successfully.');
    }

    public function edit(SeaweedType $seaweedType)
    {
        return Inertia::render('admin/seaweedtype/edit', ['seaweedType' => $seaweedType]);
    }

    public function update(Request $request, SeaweedType $seaweedType)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'characteristics' => 'nullable|string',
            'benefits' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            if ($seaweedType->image) {
                Storage::disk('public')->delete($seaweedType->image);
            }
            $data['image'] = $request->file('image')->store('seaweed_images', 'public');
        }

        $seaweedType->update($data);

        AdminActivity::create([
            'description' => '🛠️ Jenis rumput laut "' . $seaweedType->name . '" diperbarui',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.seaweed-types.index')->with('success', 'Seaweed type updated successfully.');
    }

    public function destroy($id)
    {
        $seaweedType = SeaweedType::findOrFail($id);

        if ($seaweedType->image) {
            Storage::delete('public/' . $seaweedType->image);
        }

        $name = $seaweedType->name;
        $seaweedType->delete();

        AdminActivity::create([
            'description' => '❌ Jenis rumput laut "' . $name . '" dihapus',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.seaweed-types.index')->with('success', 'Data berhasil dihapus.');
    }

    public function userIndex()
    {
        $seaweedTypes = SeaweedType::all();
        return Inertia::render('user/seaweed-type', ['seaweedTypes' => $seaweedTypes]);
    }
}
