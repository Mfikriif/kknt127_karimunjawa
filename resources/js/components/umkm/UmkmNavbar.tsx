import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

interface Props {
    activeMenu?: string;
    className?: string;
}

export default function UmkmNavbar({ activeMenu, className = "" }: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function untuk handle navigation ke section tertentu
    const handleSectionNavigation = (sectionId: string) => {
        const currentPath = window.location.pathname;
        
        // Jika sudah berada di halaman utama UMKM
        if (currentPath === '/umkm') {
            // Langsung scroll ke section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Jika berada di halaman lain, redirect ke halaman UMKM dengan hash
            router.get(`/umkm#${sectionId}`);
        }
    };

    return (
        <>
            {/* Navigation Bar dengan Ocean Theme */}
            <nav className={`fixed top-0 left-0 right-0 z-50 bg-[rgb(12,52,76)] backdrop-blur-sm z-51 ${className}`}>
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-3 flex-shrink-0">
                            <img 
                                src="/image/K-3-removebg.png" 
                                alt="UMKM Kemujan Logo" 
                                className="w-10 h-10 object-contain"
                            />
                        </div>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8 ml-auto mr-8">
                            <button 
                                onClick={() => handleSectionNavigation('hero')}
                                className={`text-white/90 hover:text-[#64FFDA] transition-colors text-base font-medium ${activeMenu === 'beranda' ? 'text-[#64FFDA]' : ''}`}
                            >
                                Beranda
                            </button>
                            <button 
                                onClick={() => handleSectionNavigation('about')}
                                className={`text-white/90 hover:text-[#64FFDA] transition-colors text-base font-medium ${activeMenu === 'tentang' ? 'text-[#64FFDA]' : ''}`}
                            >
                                Tentang
                            </button>
                            <Link 
                                href="/umkm/list-umkm" 
                                className={`text-white/90 hover:text-[#64FFDA] transition-colors text-base font-medium ${activeMenu === 'umkm-unggulan' ? 'text-[#64FFDA]' : ''}`}
                            >
                                UMKM Unggulan
                            </Link>
                            <Link 
                                href="/umkm/program-kerja" 
                                className={`text-white/90 hover:text-[#64FFDA] transition-colors text-base font-medium ${activeMenu === 'program-kerja' ? 'text-[#64FFDA]' : ''}`}
                            >
                                Program Kerja
                            </Link>
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center space-x-3">
                            <a 
                                href="http://127.0.0.1:8000/"
                                className="hidden sm:block bg-[#64FFDA] text-[rgb(12,52,76)] px-4 py-2 rounded-lg hover:bg-[#4DD0E1] transition-all duration-300 font-semibold text-sm hover:scale-105"
                            >
                                Olah Laut Kemujan
                            </a>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden text-white/90 hover:text-[#64FFDA] transition-colors p-2 rounded-lg hover:bg-white/10"
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-[rgb(12,52,76)] border-t border-[#64FFDA]/20 shadow-xl">
                        <div className="container mx-auto px-4 py-6 space-y-1">
                            <button 
                                onClick={() => {
                                    handleSectionNavigation('hero');
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left text-white/90 hover:text-[#64FFDA] hover:bg-white/5 transition-all duration-200 font-medium py-3 px-4 rounded-lg ${activeMenu === 'beranda' ? 'text-[#64FFDA] bg-white/10' : ''}`}
                            >
                                Beranda
                            </button>
                            <button 
                                onClick={() => {
                                    handleSectionNavigation('about');
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left text-white/90 hover:text-[#64FFDA] hover:bg-white/5 transition-all duration-200 font-medium py-3 px-4 rounded-lg ${activeMenu === 'tentang' ? 'text-[#64FFDA] bg-white/10' : ''}`}
                            >
                                Tentang
                            </button>
                            <Link 
                                href="/umkm/list-umkm"
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className={`block text-white/90 hover:text-[#64FFDA] hover:bg-white/5 transition-all duration-200 font-medium py-3 px-4 rounded-lg ${activeMenu === 'umkm-unggulan' ? 'text-[#64FFDA] bg-white/10' : ''}`}
                            >
                                UMKM Unggulan
                            </Link>
                            <Link 
                                href="/umkm/program-kerja"
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className={`block text-white/90 hover:text-[#64FFDA] hover:bg-white/5 transition-all duration-200 font-medium py-3 px-4 rounded-lg ${activeMenu === 'program-kerja' ? 'text-[#64FFDA] bg-white/10' : ''}`}
                            >
                                Program Kerja
                            </Link>
                            
                            {/* Mobile CTA Button */}
                            <div className="pt-4 border-t border-white/10 mt-4">
                                <a 
                                    href="http://127.0.0.1:8000/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full bg-[#64FFDA] text-[rgb(12,52,76)] px-6 py-3 rounded-lg hover:bg-[#4DD0E1] transition-all duration-300 font-bold text-center text-sm"
                                >
                                    Olah Laut Kemujan
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}