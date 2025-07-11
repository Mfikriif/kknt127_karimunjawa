import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

type SeaweedType = {
  id: number;
  name: string;
  characteristics?: string;
  benefits?: string;
  image?: string;
};

type Props = {
  seaweedType: SeaweedType;
};

export default function EditSeaweedType({ seaweedType }: Props) {
  const { data, setData, processing, errors } = useForm({
    name: seaweedType.name || '',
    characteristics: seaweedType.characteristics || '',
    benefits: seaweedType.benefits || '',
    image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (seaweedType.image) {
      setPreviewUrl(`/storage/${seaweedType.image}`);
    }
  }, [seaweedType.image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('characteristics', data.characteristics);
    formData.append('benefits', data.benefits);
    if (data.image) {
      formData.append('image', data.image);
    }

    formData.append('_method', 'PUT');

    router.post(`/admin/seaweed-types/${seaweedType.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        router.visit('/admin/seaweed-types');
      },
    });
  };

  return (
    <>
      <Head title="Edit Jenis Rumput Laut" />
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="ml-72 flex-1 flex flex-col">
          <AdminNavbar />
          <main className="flex-1 p-6 md:p-10 overflow-auto bg-gray-100">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Jenis Rumput Laut</h1>

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
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masukkan nama jenis rumput laut"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Karakteristik */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Karakteristik</label>
                  <textarea
                    value={data.characteristics}
                    onChange={e => setData('characteristics', e.target.value)}
                    rows={3}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Deskripsikan karakteristik rumput laut"
                  ></textarea>
                  {errors.characteristics && <p className="text-red-500 text-sm mt-1">{errors.characteristics}</p>}
                </div>

                {/* Manfaat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manfaat</label>
                  <textarea
                    value={data.benefits}
                    onChange={e => setData('benefits', e.target.value)}
                    rows={3}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tuliskan manfaat dari rumput laut ini"
                  ></textarea>
                  {errors.benefits && <p className="text-red-500 text-sm mt-1">{errors.benefits}</p>}
                </div>

                {/* Gambar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ganti Gambar (Opsional)</label>

                  <div className="flex items-center gap-4 mb-2">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border"
                      />
                    )}
                    {fileName && <p className="text-gray-600 text-sm">{fileName}</p>}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
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
