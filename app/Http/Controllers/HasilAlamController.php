<?php

namespace App\Http\Controllers;

use App\Models\HasilAlam;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class HasilAlamController extends Controller
{
    public function index()
    {
        $resources = HasilAlam::all();

        if (request()->is('admin/*')) {
            return inertia('admin/hasilAlam/index', compact('resources'));
        }

        return inertia('products/hasil-alam', compact('resources'));
    }

    public function create()
    {
        return inertia('admin/hasilAlam/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:laut,darat',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('hasil-alam', 'public');
        }

        $hasil = HasilAlam::create($data);

        
        AdminActivity::create([
            'description' => 'Menambahkan hasil alam: ' . $hasil->nama,
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.hasil-alam.index')->with('success', 'Data berhasil ditambahkan.');
    }

    public function edit(HasilAlam $hasilAlam)
    {
        return inertia('admin/hasilAlam/edit', compact('hasilAlam'));
    }

    public function update(Request $request, HasilAlam $hasilAlam)
    {
        $data = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:laut,darat',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            if ($hasilAlam->gambar) {
                Storage::disk('public')->delete($hasilAlam->gambar);
            }
            $data['gambar'] = $request->file('gambar')->store('hasil-alam', 'public');
        }

        $hasilAlam->update($data);

        AdminActivity::create([
            'description' => 'Mengedit hasil alam: ' . $hasilAlam->nama,
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.hasil-alam.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(HasilAlam $hasilAlam)
    {
        if ($hasilAlam->gambar) {
            Storage::disk('public')->delete($hasilAlam->gambar);
        }

        $nama = $hasilAlam->nama;
        $hasilAlam->delete();

        AdminActivity::create([
            'description' => 'Menghapus hasil alam: ' . $nama,
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('admin.hasil-alam.index')->with('success', 'Data berhasil dihapus.');
    }
}
