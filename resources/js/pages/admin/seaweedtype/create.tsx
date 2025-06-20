import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

export default function CreateSeaweedType() {
    const [name, setName] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!image) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(image);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('characteristics', characteristics);
        formData.append('benefits', benefits);
        if (image) {
            formData.append('image', image);
        }

        router.post('/admin/seaweed-types', formData);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <AdminNavbar />

                <main className="flex-1 p-8 max-w-5xl mx-auto">
                    <h1 className="text-3xl font-extrabold mb-8 text-black drop-shadow-md">
                        Tambah Jenis Rumput Laut
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="bg-white rounded-lg shadow-lg p-8 space-y-6"
                    >
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6 items-center">
                            {/* Nama */}
                            <label htmlFor="name" className="text-gray-700 font-semibold">
                                Nama
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                                placeholder="Masukkan nama jenis rumput laut"
                                required
                            />

                            {/* Karakteristik */}
                            <label htmlFor="characteristics" className="text-gray-700 font-semibold">
                                Karakteristik
                            </label>
                            <textarea
                                id="characteristics"
                                value={characteristics}
                                onChange={e => setCharacteristics(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                                placeholder="Jelaskan karakteristik rumput laut..."
                                rows={2}
                            />

                            {/* Manfaat */}
                            <label htmlFor="benefits" className="text-gray-700 font-semibold">
                                Manfaat
                            </label>
                            <textarea
                                id="benefits"
                                value={benefits}
                                onChange={e => setBenefits(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                                placeholder="Jelaskan manfaat rumput laut..."
                                rows={2}
                            />

                            {/* Gambar */}
                            <label htmlFor="image" className="text-gray-700 font-semibold">
                                Gambar
                            </label>
                            <div>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImage(e.target.files?.[0] || null)}
                                    className="block w-full text-gray-600 file:mr-4 file:py-2 file:px-4
                                    file:rounded file:border-0 file:text-sm file:font-semibold
                                    file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition cursor-pointer"
                                />
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="mt-4 w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-md"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Tombol Simpan */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-900 text-white px-6 py-2.5 rounded-md font-medium 
                                           hover:bg-blue-950 transition shadow-md"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
