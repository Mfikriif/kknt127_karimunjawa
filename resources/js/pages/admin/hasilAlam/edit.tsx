import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

interface HasilAlam {
  id: number;
  nama: string;
  deskripsi: string;
  kategori: 'laut' | 'darat';
  gambar?: string;
}

export default function Edit() {
  const page = usePage<{ hasilAlam: HasilAlam }>();
  const hasilAlam = page.props.hasilAlam;

  const [form, setForm] = useState({
    nama: hasilAlam.nama,
    deskripsi: hasilAlam.deskripsi,
    kategori: hasilAlam.kategori,
    gambar: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (hasilAlam.gambar) {
      setPreviewImage(`/storage/${hasilAlam.gambar}`);
    }
  }, [hasilAlam.gambar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm({ ...form, gambar: file });
    setPreviewImage(file ? URL.createObjectURL(file) : previewImage);
    setFileName(file?.name ?? '');
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
    data.append('_method', 'PUT');

    router.post(`/admin/hasil-alam/${hasilAlam.id}`, data, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        router.visit('/admin/hasil-alam');
      },
    });
  };

  return (
    <>
      <Head title="Edit Hasil Alam" />
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="ml-72 flex-1 flex flex-col">
          <AdminNavbar />
          <main className="flex-1 p-6 md:p-10 overflow-auto bg-gray-100">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Hasil Alam</h1>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-white p-8 rounded-2xl shadow-xl space-y-6"
              >
                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
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

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tulis deskripsi hasil alam..."
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
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

                {/* Gambar & Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ganti Gambar (Opsional)</label>

                  <div className="flex items-center gap-4 mb-2">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    )}
                    {fileName && (
                      <p className="text-gray-600 text-sm">{fileName}</p>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Tombol Submit */}
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-md font-medium transition"
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
