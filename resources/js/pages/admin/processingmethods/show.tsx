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
  created_at: string;
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
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow p-8">
            {/* Judul Besar */}
            <h1 className="text-4xl font-extrabold text-blue-800 mb-2">
              {method.judul}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Dibuat pada: {new Date(method.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            {/* Semua Tahapan dalam Satu Card */}
            <div className="space-y-10">
              {method.steps.map((step) => (
                <div key={step.id} className="border-t pt-6">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                    🧩 Tahap {step.tahap_ke}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line mb-4">
                    <strong>Deskripsi:</strong> {step.deskripsi_tahapan}
                  </p>
                  {step.gambar_tahapan && (
                    <img
                      src={`/storage/${step.gambar_tahapan}?${new Date().getTime()}`}
                      alt={`Tahap ${step.tahap_ke}`}
                      className="rounded-lg border object-cover w-full max-h-80"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
