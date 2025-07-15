import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

type ProcessingMethod = {
  id: number;
  judul: string;
  steps_count: number;
};

type Props = {
  processingMethods: ProcessingMethod[];
};

export default function ProcessingMethodIndex({ processingMethods }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus metode ini?')) {
      router.delete(`/admin/processing-methods/${id}`);
    }
  };

  const filteredMethods = processingMethods.filter((item) =>
    item.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedMethods = filteredMethods.slice(0, entriesPerPage);

  return (
    <div className="flex min-h-screen bg-gray-50 font-poppins">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="px-8 py-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Daftar Metode Pengolahan</h1>

          {/* Filter & Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label htmlFor="entries" className="text-sm text-gray-600">Tampilkan</label>
              <select
                id="entries"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">entri</span>
            </div>

            <input
              type="text"
              placeholder="Cari metode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>



          {/* Tombol Tambah */}
          <div className="mb-4">
            <Link
              href="/admin/processing-methods/create"
              className="inline-block bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 text-sm rounded-lg shadow transition"
            >
              + Tambah
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="p-4 text-left">No</th>
                  <th className="p-4 text-left">Judul</th>
                  <th className="p-4 text-left">Jumlah Step</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {displayedMethods.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 p-6">
                      Tidak ada metode pengolahan yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  displayedMethods.map((item, index) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4 font-medium">{item.judul}</td>
                      <td className="p-4">{item.steps_count}</td>
                      <td className="p-4 text-center space-x-2 whitespace-nowrap">
                        <Link
                          href={`/admin/processing-methods/${item.id}`}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 inline-flex items-center"
                        >
                          <FaEye className="mr-1" /> Detail
                        </Link>
                        <Link
                          href={`/admin/processing-methods/${item.id}/edit`}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 inline-flex items-center"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 inline-flex items-center"
                        >
                          <FaTrash className="mr-1" /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
