import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

type Step = {
  id: number;
  tahap_ke: number;
  deskripsi_tahapan: string;
  gambar_tahapan?: string;
  new_gambar?: File | null;
  preview?: string;
};

type ProcessingMethod = {
  id: number;
  judul: string;
  steps: Step[];
};

export default function Edit() {
  const { props } = usePage<{ processingMethod: ProcessingMethod }>();
  const method = props.processingMethod;

  const [judul, setJudul] = useState(method.judul);
  const [steps, setSteps] = useState<Step[]>(
    method.steps.map((step) => ({
      ...step,
      new_gambar: null,
      preview: step.gambar_tahapan ? `/storage/${step.gambar_tahapan}` : '',
    }))
  );

  const handleStepChange = (
    index: number,
    field: 'deskripsi_tahapan' | 'new_gambar',
    value: string | File | null
  ) => {
    const updated = [...steps];
    if (field === 'new_gambar') {
      const file = value as File | null;
      const preview = file ? URL.createObjectURL(file) : updated[index].preview;
      updated[index] = { ...updated[index], new_gambar: file, preview };
    } else {
      updated[index] = { ...updated[index], [field]: value as string };
    }
    setSteps(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);

    steps.forEach((step, index) => {
      formData.append(`steps[${index}][tahap_ke]`, step.tahap_ke.toString());
      formData.append(`steps[${index}][deskripsi_tahapan]`, step.deskripsi_tahapan || '');
      if (step.new_gambar) {
        formData.append(`steps[${index}][gambar_tahapan]`, step.new_gambar);
      }
    });

    formData.append('_method', 'put');

    router.post(`/admin/processing-methods/${method.id}`, formData, {
      forceFormData: true,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6 md:p-10">
          <div className="max-w-3xl mx-auto mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Edit Metode Pengolahan</h1>
          </div>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Judul Metode</label>
                <input
                  name="judul"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul metode..."
                />
              </div>

              {steps.map((step, index) => (
                <div key={step.id} className="border border-gray-200 bg-gray-50 rounded-lg p-5 shadow-sm">
                  <h2 className="font-semibold text-lg mb-4 text-gray-700">🧩 Tahap {step.tahap_ke}</h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Deskripsi Tahapan</label>
                    <textarea
                      value={step.deskripsi_tahapan}
                      onChange={(e) =>
                        handleStepChange(index, 'deskripsi_tahapan', e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Deskripsikan tahapan ini..."
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Ganti Gambar Tahapan (opsional)</label>
                    {step.preview && (
                      <img
                        src={step.preview}
                        alt={`Preview ${step.tahap_ke}`}
                        className="mb-3 rounded-md w-48 object-cover"
                      />
                    )}
                    <label className="inline-flex items-center gap-3 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm hover:bg-gray-100 transition">
                      <span className="text-gray-700">📁 Pilih Gambar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleStepChange(index, 'new_gambar', e.target.files?.[0] || null)
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg shadow transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
