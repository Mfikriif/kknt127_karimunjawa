import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { FaBoxOpen, FaClock, FaCogs, FaLeaf } from 'react-icons/fa';

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
            label: 'Total Produk',
            value: totalProduk,
            icon: <FaBoxOpen className="text-3xl text-blue-500" />,
            color: 'text-blue-600',
            desc: 'Jumlah Postingan Produk',
        },
        {
            label: 'Jenis Rumput Laut',
            value: jenisRumputLaut,
            icon: <FaLeaf className="text-3xl text-green-500" />,
            color: 'text-green-600',
            desc: 'Jumlah Postingan Rumput Laut',
        },
        {
            label: 'Metode Pengolahan',
            value: metodePengolahan,
            icon: <FaCogs className="text-3xl text-purple-500" />,
            color: 'text-purple-600',
            desc: 'Jumlah Postingan Cara Pengolahan',
        },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">
            <AdminSidebar />
            <div className="flex flex-1 flex-col">
                <AdminNavbar />
                <main className="p-8">
                    <h1 className="mb-8 text-3xl font-bold text-slate-800">Dashboard</h1>

                    {/* Statistik Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-slate-200">
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
                        <h2 className="mb-4 text-2xl font-bold text-slate-700">Aktivitas Terbaru</h2>
                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
                            {aktivitas.length > 0 ? (
                                <ul className="divide-y divide-slate-100">
                                    {aktivitas.map((item) => (
                                        <li key={item.id} className="flex items-center gap-3 px-6 py-4 transition hover:bg-slate-50">
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
                                <p className="px-6 py-6 text-center text-sm text-slate-500">Belum ada aktivitas terbaru.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
