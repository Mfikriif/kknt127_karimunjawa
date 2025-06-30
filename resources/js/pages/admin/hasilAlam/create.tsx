import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

export default function Create() {
  const [form, setForm] = useState({
    nama: '',
    deskripsi: '',
    kategori: 'laut',
    gambar: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm({ ...form, gambar: file });
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('nama', form.nama);
    data.append('deskripsi', form.deskripsi);
    data.append('kategori', form.kategori);
    if (form.gambar) {
      data.append('gambar', form.gambar);
    }

    router.post('/admin/hasil-alam', data, {
      onSuccess: () => {
        alert('Data berhasil disimpan');
        setForm({ nama: '', deskripsi: '', kategori: 'laut', gambar: null });
        setPreviewUrl(null);
      },
    });
  };

  return (
    <>
      <Head title="Tambah Hasil Alam" />
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="ml-72 flex-1 flex flex-col">
          <AdminNavbar />
          <main className="flex-1 p-6 md:p-10 overflow-auto bg-gray-100">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Tambah Hasil Alam
              </h1>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: Rumput Laut"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      name="deskripsi"
                      value={form.deskripsi}
                      onChange={handleChange}
                      rows={4}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tulis deskripsi hasil alam..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      name="kategori"
                      value={form.kategori}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="laut">Laut</option>
                      <option value="darat">Darat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gambar
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />

                    {previewUrl && (
                      <div className="mt-3">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-40 rounded-md border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-md font-medium transition"
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
