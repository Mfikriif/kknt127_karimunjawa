import React from 'react';
import { Head } from '@inertiajs/react';

type ProcessingMethod = {
  id: number;
  name: string;
  description: string;
  image?: string;
};

type Props = {
  methods: ProcessingMethod[];
};

export default function ProcessingMethods({ methods }: Props) {
  return (
    <>
      <Head title="Metode Pengolahan" />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
            Metode Pengolahan Rumput Laut
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {methods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
              >
                {method.image && (
                  <img
                    src={`/storage/${method.image}`}
                    alt={method.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-slate-700 mb-2">{method.name}</h2>
                <p className="text-sm text-slate-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
