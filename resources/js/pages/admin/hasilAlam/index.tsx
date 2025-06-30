import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';

interface HasilAlam {
  id: number;
  nama: string;
  deskripsi: string;
  kategori: 'laut' | 'darat';
  gambar?: string;
}

export default function Index() {
  const { props } = usePage<{ resources: HasilAlam[] }>();
  const resources = props.resources;

  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      router.delete(`/admin/hasil-alam/${id}`);
    }
  };

  const filteredResources = resources.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedResources = filteredResources.slice(0, entriesPerPage);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar />

      <div className="ml-72 flex-1 flex flex-col">
        <AdminNavbar />

        <main className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Data Hasil Alam Desa Kemujan
          </h1>

          {/* Filter section */}
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
              placeholder="Cari hasil alam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <Link
              href="/admin/hasil-alam/create"
              className="inline-block bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 text-sm rounded-lg shadow transition"
            >
              + Tambah
            </Link>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-left">Deskripsi</th>
                  <th className="p-4 text-left">Kategori</th>
                  <th className="p-4 text-left">Gambar</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {displayedResources.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 p-6">
                      Tidak ada data hasil alam.
                    </td>
                  </tr>
                ) : (
                  displayedResources.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="p-4">{item.nama}</td>
                      <td className="p-4">{item.deskripsi}</td>
                      <td className="p-4 capitalize">{item.kategori}</td>
                      <td className="p-4">
                        {item.gambar ? (
                          <img
                            src={`/storage/${item.gambar}`}
                            alt={item.nama}
                            className="w-20 h-auto rounded"
                          />
                        ) : (
                          <span className="text-gray-400 italic">Tidak ada</span>
                        )}
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <Link
                          href={`/admin/hasil-alam/${item.id}/edit`}
                          className="inline-flex items-center text-sm px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
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
