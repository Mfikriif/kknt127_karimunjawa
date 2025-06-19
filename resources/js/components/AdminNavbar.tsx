import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

export default function AdminNavbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const handleLogout = () => {
        router.post('/admin/logout');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-4 shadow-md flex justify-end items-center sticky top-0 z-50 text-white">
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-full transition duration-200"
                >
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Avatar"
                        className="w-9 h-9 rounded-full ring-2 ring-purple-500"
                    />
                    <span className="text-sm font-medium">Hi, Admin</span>
                    <FaChevronDown className="text-xs mt-[2px]" />
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-fade-slide text-gray-700">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-b-xl transition-all duration-200"
                        >
                            <FaSignOutAlt className="text-xs" />
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Animation Styles */}
            <style>
                {`
                @keyframes fade-slide {
                    0% {
                        opacity: 0;
                        transform: translateY(-5px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-slide {
                    animation: fade-slide 0.2s ease-out forwards;
                }
                `}
            </style>
        </header>
    );
}
