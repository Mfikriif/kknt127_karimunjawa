<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\AdminActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('admin/products/index', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'type' => 'required|string',
            'link' => 'nullable|string|max:255',
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('products', 'public');
        }

        $product = Product::create($validated);

        AdminActivity::create([
            'description' => '➕ Produk "' . $product->name . '" berhasil ditambahkan',
            'admin_id' => Auth::id(),
        ]);

        return redirect()->route('products.index')->with('success', 'Produk berhasil ditambahkan!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/products/edit', ['product' => $product]);
    }

    public function update(Request $request, Product $product)
{
   $validated = $request->validate([
    'name' => 'sometimes|required|string|max:255',
    'category' => 'sometimes|required|string',
    'type' => 'sometimes|required|string',
    'description' => 'sometimes|nullable|string',
    'link' => 'sometimes|nullable|string|max:255',
    'gambar' => 'sometimes|nullable|image|max:2048',
]);


    if ($request->hasFile('gambar')) {
        if ($product->gambar) {
            Storage::disk('public')->delete($product->gambar);
        }
        $validated['gambar'] = $request->file('gambar')->store('products', 'public');
    }

    $product->update($validated);

    AdminActivity::create([
        'description' => '🔄 Produk "' . $product->name . '" diperbarui',
        'admin_id' => Auth::id(),
    ]);

    return redirect()->route('products.index')->with('success', 'Produk berhasil diperbarui!');
}
public function destroy(Product $product)
{
    if ($product->gambar) {
        Storage::disk('public')->delete($product->gambar);
    }

    $product->delete();

    AdminActivity::create([
        'description' => '🗑️ Produk "' . $product->name . '" dihapus',
        'admin_id' => Auth::id(),
    ]);

    return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus!');
}


    public function userIndex()
    {
        $products = Product::all();
        return Inertia::render('user/products', ['products' => $products]);
    }
}
