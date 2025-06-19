import React from 'react';
import { usePage } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

type Step = {
  id: number;
  tahap_ke: number;
  deskripsi_tahapan: string;
  gambar_tahapan?: string;
};

type ProcessingMethod = {
  id: number;
  judul: string;
  steps: Step[];
};

export default function Show() {
  const { props } = usePage<{ processingMethod: ProcessingMethod }>();
  const method = props.processingMethod;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6 md:p-10">
          {/* Judul Halaman */}
          <div className="max-w-3xl mx-auto mb-6">
            <h1 className="text-4xl font-bold text-gray-800">🔍 Detail Metode Pengolahan</h1>
            <p className="text-gray-600 mt-1 text-lg">{method.judul}</p>
          </div>

          {/* Daftar Tahapan */}
          <div className="max-w-3xl mx-auto space-y-6">
            {method.steps.map((step) => (
              <div key={step.id} className="bg-white border border-gray-200 rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-blue-700">🧩 Tahap {step.tahap_ke}</h2>
                </div>

                <div className="mb-4 text-gray-700">
                  <p className="mb-2 whitespace-pre-line"><strong>Deskripsi:</strong> {step.deskripsi_tahapan}</p>
                </div>

                {step.gambar_tahapan && (
                  <div className="mt-2">
                    <img
                      src={`/storage/${step.gambar_tahapan}?${new Date().getTime()}`}
                      alt={`Tahap ${step.tahap_ke}`}
                      className="rounded-lg border object-cover w-full max-h-80"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
