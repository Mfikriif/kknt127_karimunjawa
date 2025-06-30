import React from 'react';
import { usePage } from '@inertiajs/react';

interface HasilAlam {
  id: number;
  nama: string;
  deskripsi: string;
  kategori: 'laut' | 'darat';
  gambar?: string;
}

export default function ProductHasilAlam() {
  const { resources } = usePage<{ resources: HasilAlam[] }>().props;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Hasil Alam Desa Kemujan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item) => (
          <div key={item.id} className="border rounded-xl shadow-sm overflow-hidden">
            {item.gambar && (
              <img
                src={`/storage/${item.gambar}`}
                alt={item.nama}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.nama}</h2>
              <p className="text-sm text-gray-500 mb-2 capitalize">Kategori: {item.kategori}</p>
              <p className="text-sm">{item.deskripsi || 'Tidak ada deskripsi.'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
