import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { FaBoxOpen, FaLeaf, FaCogs, FaClock } from 'react-icons/fa';

type DashboardProps = {
  totalProduk: number;
  jenisRumputLaut: number;
  metodePengolahan: number;
  aktivitas: {
    id: number;
    description: string;
    created_at: string;
  }[];
};

export default function AdminDashboard(props: DashboardProps) {
  const { totalProduk, jenisRumputLaut, metodePengolahan, aktivitas } = props;

  const stats = [
    {
      label: 'Hasil Alam',
      value: totalProduk,
      icon: <FaBoxOpen className="text-blue-500 text-3xl" />,
      color: 'text-blue-600',
      desc: 'Jumlah Postingan',
    },
    {
      label: 'Jenis Rumput Laut',
      value: jenisRumputLaut,
      icon: <FaLeaf className="text-green-500 text-3xl" />,
      color: 'text-green-600',
      desc: 'Jumlah Postingan Rumput Laut',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <AdminSidebar />
      <div className="ml-72 flex flex-col flex-1">
        <AdminNavbar />
        <main className="p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard</h1>

          {/* Statistik Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group border border-slate-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 group-hover:bg-slate-200 transition">
                    {stat.icon}
                  </div>
                  <div>
                    <h2 className={`text-lg font-semibold ${stat.color}`}>{stat.label}</h2>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Aktivitas */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Aktivitas Terbaru</h2>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
              {aktivitas.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {aktivitas.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 transition">
                      <div className="text-blue-500">
                        <FaClock />
                      </div>
                      <div>
                        <p className="text-sm text-slate-700">{item.description}</p>
                        <p className="text-xs text-slate-400">
                          {new Date(item.created_at).toLocaleString('id-ID', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 px-6 py-6 text-center">Belum ada aktivitas terbaru.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
