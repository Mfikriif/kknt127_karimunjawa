import React from 'react';
import { router } from '@inertiajs/react';
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaLeaf,
    FaCogs,
    FaSignOutAlt,
} from 'react-icons/fa';

export default function AdminSidebar() {
    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const currentPath = window.location.pathname;

    const menuItems = [
        {
            label: 'Dashboard',
            icon: <FaTachometerAlt />,
            href: '/admin/dashboard',
            color: 'from-indigo-500 to-blue-600',
        },
        {
            label: 'Produk Olahan',
            icon: <FaBoxOpen />,
            href: '/admin/products',
            color: 'from-green-500 to-green-600',
        },
        {
            label: 'Jenis Rumput Laut',
            icon: <FaLeaf />,
            href: '/admin/seaweed-types',
            color: 'from-emerald-500 to-teal-500',
        },
        {
            label: 'Hasil Alam',
            icon: <FaLeaf />,
            href: '/admin/hasil-alam',
            color: 'from-emerald-500 to-teal-500',
        },
    ];

    return (
        <aside className="fixed top-0 left-0 w-72 h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl overflow-y-auto z-50">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <FaLeaf className="text-white text-lg" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            olahlautkemujan
                        </h1>
                        <p className="text-sm text-slate-400">Admin Panel</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = currentPath.startsWith(item.href);

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 hover:translate-x-1 ${
                                    isActive
                                        ? 'bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg'
                                        : 'hover:bg-white/5'
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                                )}
                                <div
                                    className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-md transition-all duration-200 ${
                                        isActive ? 'scale-105' : 'group-hover:scale-105'
                                    }`}
                                >
                                    {item.icon}
                                </div>
                                <span
                                    className={`font-medium ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-slate-300 group-hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </a>
                        );
                    })}
                </nav>

                <div className="mt-12 pt-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 hover:translate-x-1"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md transition-all duration-200">
                            <FaSignOutAlt className="text-lg" />
                        </div>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
