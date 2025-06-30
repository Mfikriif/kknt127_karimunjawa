import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

export default function CreateProduct() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    category: '',
    type: '',
    gambar: null as File | null,
    link: '',
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('type', data.type);
    if (data.gambar) {
      formData.append('gambar', data.gambar);
    }
    formData.append('link', data.link);

    post('/admin/products', {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        alert('Produk berhasil ditambahkan');
        reset();
        setPreviewUrl(null);
      },
    });
  };

  return (
    <>
      <Head title="Tambah Produk" />
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="ml-72 flex-1 flex flex-col">
          <AdminNavbar />
          <main className="flex-1 p-6 md:p-10 overflow-auto bg-gray-100">
            <div className="max-w-3xl mx-auto">
              {/* Judul di luar card */}
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tambah Produk</h1>

              {/* Card form */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: Rumput Laut Kering Premium"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                      value={data.description}
                      onChange={e => setData('description', e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tuliskan detail produk..."
                      rows={4}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <select
                        value={data.category}
                        onChange={e => setData('category', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">-- Pilih Kategori --</option>
                        <option value="rumput_laut">Rumput Laut</option>
                        <option value="ikan">Ikan</option>
                        <option value="Mete">Mete</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Produk</label>
                      <select
                        value={data.type}
                        onChange={e => setData('type', e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">-- Pilih Tipe --</option>
                        <option value="mentah">Mentah</option>
                        <option value="olahan">Olahan</option>
                      </select>
                      {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Produk</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0] ?? null;
                        setData('gambar', file);
                        setPreviewUrl(file ? URL.createObjectURL(file) : null);
                      }}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.gambar && <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>}

                    {previewUrl && (
                      <div className="mt-3">
                        <img src={previewUrl} alt="Preview" className="h-40 rounded-md border" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link (Opsional)</label>
                    <input
                      type="text"
                      value={data.link}
                      onChange={e => setData('link', e.target.value)}
                      placeholder="https://contoh.com"
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
                  </div>

                  <div className="text-right">
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-md font-medium transition disabled:opacity-50"
                >
                    Simpan
                </button>
                </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
