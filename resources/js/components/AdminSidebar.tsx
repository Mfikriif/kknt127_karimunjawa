import React from 'react';
import { router } from '@inertiajs/react';
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaLeaf,
    FaCogs,
    FaStore,
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
            label: 'Produk',
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
            label: 'Cara Pengolahan',
            icon: <FaCogs />,
            href: '/admin/processing-methods',
            color: 'from-purple-500 to-pink-500',
        },
        {
            label: 'UMKM',
            icon: <FaStore />,
            href: '/admin/umkm',
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <aside className="sticky top-0 left-0 w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white h-screen shadow-xl relative overflow-hidden z-40">
            <div className="h-full overflow-y-auto">
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
                                            ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm'
                                            : 'hover:bg-white/5 text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {/* Icon dengan gradient background */}
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105`}
                                    >
                                        <span className="text-white text-lg">{item.icon}</span>
                                    </div>

                                    {/* Label */}
                                    <span className="font-medium text-sm">{item.label}</span>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="mt-8 pt-6 border-t border-slate-700">
                        <button
                            onClick={handleLogout}
                            className="group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 hover:translate-x-1 w-full text-left hover:bg-red-500/10 text-slate-300 hover:text-red-400"
                        >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105">
                                <FaSignOutAlt className="text-white text-lg" />
                            </div>
                            <span className="font-medium text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
        </aside>
    );
}