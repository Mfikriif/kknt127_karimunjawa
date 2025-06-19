import React, { useState, useMemo, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { FaEdit, FaTrash, FaThList, FaTh } from 'react-icons/fa';

type SeaweedType = {
  id: number;
  name: string;
  characteristics?: string;
  benefits?: string;
  image?: string;
};

type Props = {
  seaweedTypes: SeaweedType[];
};

export default function IndexSeaweedTypes({ seaweedTypes }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      router.delete(route('admin.seaweed-types.destroy', id));
    }
  };

  const filtered = useMemo(() =>
    seaweedTypes.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, seaweedTypes]
  );

  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const paginated = filtered.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, entriesPerPage]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Jenis Rumput Laut</h1>

          {/* Filter and controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            {/* Entries per page */}
            <div className="flex items-center gap-2">
              <label htmlFor="entries" className="text-sm text-gray-600">Tampilkan</label>
              <select
                id="entries"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <span className="text-sm text-gray-600">entri</span>
            </div>

            {/* Search bar and view toggle */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari jenis rumput laut..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex space-x-1 mt-2 md:mt-0">
                <button onClick={() => setViewMode('table')} className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                  <FaThList />
                </button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
                  <FaTh />
                </button>
              </div>
            </div>
          </div>

          {/* Tambah button */}
          <div className="mb-4">
            <Link
              href={route('admin.seaweed-types.create')}
              className="inline-block bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 text-sm rounded-lg shadow transition"
            >
              + Tambah
            </Link>
          </div>

          {/* View section */}
          {viewMode === 'table' ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-blue-50 text-gray-700">
                  <tr>
                    <th className="p-4 text-left">Nama</th>
                    <th className="p-4 text-left">Karakteristik</th>
                    <th className="p-4 text-left">Manfaat</th>
                    <th className="p-4 text-left">Gambar</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 p-6">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  ) : paginated.map(item => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.characteristics || '-'}</td>
                      <td className="p-4">{item.benefits || '-'}</td>
                      <td className="p-4">
                        {item.image ? (
                          <img src={`/storage/${item.image}`} alt={item.name} className="w-20 h-16 object-cover rounded-md shadow-sm" />
                        ) : (
                          <span className="italic text-gray-400">Tidak ada</span>
                        )}
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <Link href={route('admin.seaweed-types.edit', item.id)} className="inline-flex items-center text-sm px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition">
                          <FaEdit className="mr-1" /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          <FaTrash className="mr-1" /> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 font-medium">Tidak ada data ditemukan.</p>
              ) : paginated.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition h-full flex flex-col">
                  {item.image ? (
                    <img src={`/storage/${item.image}`} alt={item.name}
                      className="w-full h-32 object-cover rounded-md mb-4" />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 rounded-md italic text-gray-400 mb-4 flex items-center justify-center">
                      Tidak ada gambar
                    </div>
                  )}
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h2>
                  <p className="text-sm text-gray-600 mb-1"><strong>Karakteristik:</strong> {item.characteristics || '-'}</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>Manfaat:</strong> {item.benefits || '-'}</p>
                  <div className="mt-auto flex space-x-2">
                    <Link href={route('admin.seaweed-types.edit', item.id)} className="flex-1 bg-yellow-400 text-white py-1 rounded text-sm hover:bg-yellow-500 flex items-center justify-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600 flex items-center justify-center"
                    >
                      <FaTrash className="mr-1" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
