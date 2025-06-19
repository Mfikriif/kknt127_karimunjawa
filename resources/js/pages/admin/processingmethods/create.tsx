import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { Plus, Save } from 'lucide-react';

export default function Create() {
  const [judul, setJudul] = useState('');
  const [steps, setSteps] = useState([{ tahap_ke: 1, deskripsi_tahapan: '', gambar_tahapan: null, preview: '' }]);

  type StepField = 'deskripsi_tahapan' | 'gambar_tahapan';

  const handleStepChange = (index: number, field: StepField, value: any) => {
    const updatedSteps = [...steps];

    if (field === 'gambar_tahapan') {
      const file = value;
      const preview = file ? URL.createObjectURL(file) : '';
      updatedSteps[index] = { ...updatedSteps[index], gambar_tahapan: file, preview };
    } else {
      updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    }

    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, { tahap_ke: steps.length + 1, deskripsi_tahapan: '', gambar_tahapan: null, preview: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    steps.forEach((step, index) => {
      formData.append(`steps[${index}][tahap_ke]`, step.tahap_ke.toString());
      formData.append(`steps[${index}][deskripsi_tahapan]`, step.deskripsi_tahapan);
      if (step.gambar_tahapan) {
        formData.append(`steps[${index}][gambar_tahapan]`, step.gambar_tahapan);
      }
    });
    router.post('/admin/processing-methods', formData, { forceFormData: true });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6 md:p-10">
          {/* Judul halaman */}
          <div className="max-w-3xl mx-auto mb-6">
            <h1 className="text-4xl font-bold text-gray-600">Tambah Metode Pengolahan</h1>
          </div>

          {/* Card Form */}
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Judul */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Judul Metode</label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul metode..."
                />
              </div>

              {/* Step Inputs */}
              {steps.map((step, index) => (
                <div key={index} className="border border-gray-200 bg-gray-50 rounded-lg p-5 shadow-sm">
                  <h2 className="font-semibold text-lg mb-4 text-gray-700">🧩 Tahap {index + 1}</h2>

                  <input type="hidden" value={step.tahap_ke} />

                  {/* Deskripsi */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Deskripsi Tahapan</label>
                    <textarea
                      value={step.deskripsi_tahapan}
                      onChange={(e) => handleStepChange(index, 'deskripsi_tahapan', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Deskripsikan tahapan ini..."
                    />
                  </div>

                  {/* Upload Gambar */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Gambar Tahapan (opsional)</label>

                    <label className="flex items-center gap-3 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm hover:bg-gray-100 transition">
                      <span className="text-gray-700">📁 Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleStepChange(index, 'gambar_tahapan', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>

                    {/* Preview */}
                    {step.preview && (
                      <img
                        src={step.preview}
                        alt={`Preview Tahap ${index + 1}`}
                        className="mt-3 rounded-md border w-48 h-auto object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* Tombol */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={addStep}
                  className="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  <Plus className="w-4 h-4" /> Tambah Step
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
                >
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
