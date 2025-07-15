import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

type Product = {
  id: number;
  name: string;
  category: string;
  type: string;
  description: string;
  link: string;
  image: string;
};

type Props = {
  product: Product;
};

export default function EditProduct({ product }: Props) {
  const { data, setData, processing, errors } = useForm({
    name: product.name || '',
    category: product.category || '',
    type: product.type || '',
    description: product.description || '',
    link: product.link || '',
    gambar: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (product.image) {
      setPreviewImage(`/storage/${product.image}`);
    }
  }, [product.image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('gambar', file);
      setPreviewImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('type', data.type);
    formData.append('description', data.description);
    formData.append('link', data.link);
    if (data.gambar) {
      formData.append('gambar', data.gambar);
    }

    formData.append('_method', 'PUT');

    router.post(`/admin/products/${product.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        router.visit('/admin/products');
      },
    });
  };

  return (
    <>
      <Head title="Edit Produk" />
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="ml-72 flex-1 flex flex-col">
          <AdminNavbar />
          <main className="flex-1 p-6 md:p-10 overflow-auto bg-gray-100">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Produk</h1>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
              >
                {/* Nama Produk */}
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

                {/* Kategori dan Tipe */}
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

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tulis deskripsi produk secara lengkap..."
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Link Produk */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Produk</label>
                  <input
                    type="url"
                    value={data.link}
                    onChange={e => setData('link', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://contoh.com"
                  />
                  {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
                </div>

                {/* Gambar & Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ganti Gambar (Opsional)</label>

                  <div className="flex items-center gap-4 mb-2">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview Gambar"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    )}
                    {fileName && (
                      <p className="text-gray-600 text-sm">{fileName}</p>
                    )}
                  </div>

                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.gambar && <p className="text-red-500 text-sm mt-1">{errors.gambar}</p>}
                </div>

                {/* Tombol Submit */}
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-900 hover:bg-blue-950 text-white font-medium px-6 py-2 rounded-md transition disabled:opacity-50"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
