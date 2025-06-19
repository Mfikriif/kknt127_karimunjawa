import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { FaEdit, FaTrash } from 'react-icons/fa';

type Product = {
  id: number;
  name: string;
  category: string;
  type: string;
  link: string;
};

type Props = {
  products: Product[];
};

export default function ProductIndex({ products }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleDelete = (id: number) => {
    if (confirm('Hapus produk ini?')) {
      router.delete(`/admin/products/${id}`);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(0, entriesPerPage);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Daftar Produk</h1>

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
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tambah produk button */}
            <div className="mb-4">
            <Link
                href="/admin/products/create"
                className="inline-block bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 text-sm rounded-lg shadow transition"
            >
                + Tambah
            </Link>
            </div>


          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-left">Kategori</th>
                  <th className="p-4 text-left">Tipe</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 p-6">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                ) : (
                  displayedProducts.map((product, idx) => (
                    <tr
                      key={product.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">{product.category}</td>
                      <td className="p-4">{product.type}</td>
                      <td className="p-4 text-center space-x-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="inline-flex items-center text-sm px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 transition"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
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
