import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Globe, Instagram, Youtube, ExternalLink } from 'lucide-react';

export default function UmkmFooter() {
    // Function untuk smooth scroll ke section (seperti navbar)
    const scrollToSection = (sectionId: string) => {
        const currentPath = window.location.pathname;
        
        if (currentPath === '/umkm') {
            // Jika sudah di halaman UMKM, langsung smooth scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Jika di halaman lain, redirect ke halaman UMKM dengan hash (relative path)
            window.location.href = `/umkm#${sectionId}`;
        }
    };
    
    return (
        <footer className="bg-gradient-to-b from-[rgb(12,52,76)] via-[#0F4C75] to-[#1B9C85] text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    
                    {/* Brand Section - Responsive Layout */}
                    <div className="md:col-span-2 xl:col-span-2">
                        <div className="mb-6">
                            {/* Logo IDBU Section */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                                <img 
                                    src="/image/K-3-removebg.png" 
                                    alt="Logo IDBU - KKN Tematik 127 Universitas Diponegoro" 
                                    className="w-20 h-20 sm:w-16 sm:h-16 object-contain flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <p className="text-[#BBE1FA] text-sm leading-relaxed">
                                        Platform digital yang menghubungkan produk unggulan UMKM Desa Kemujan dengan masyarakat luas. 
                                        Mendukung ekonomi lokal dan melestarikan kearifan maritim Karimunjawa.
                                    </p>
                                </div>
                            </div>

                            {/* Social Media - Improved Responsive Layout */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Instagram Button */}
                                <a 
                                    href="https://instagram.com/lifeatkemujan" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-4 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:bg-pink-500 hover:shadow-pink-500/30 hover:before:from-pink-500/10 hover:before:to-transparent hover:before:opacity-100 hover:text-white hover:border-pink-500/50 flex-1 sm:flex-initial"
                                    title="Follow @lifeatkemujan di Instagram"
                                >
                                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="font-medium text-sm">@lifeatkemujan</span>
                                </a>
                                
                                {/* YouTube Button */}
                                <a 
                                    href="https://www.youtube.com/watch?v=bSYogAFBiTc" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-4 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:bg-red-500 hover:shadow-red-500/30 hover:before:from-red-500/10 hover:before:to-transparent hover:before:opacity-100 hover:text-white hover:border-red-500/50 flex-1 sm:flex-initial"
                                    title="Tonton Video UMKM Kemujan di YouTube"
                                >
                                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="font-medium text-sm">Wonderful of Kemujan</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links - Better Spacing */}
                    <div className="md:col-span-1 xl:col-span-1">
                        <h4 className="text-lg font-semibold mb-6 text-white">Navigasi</h4>
                        <ul className="space-y-3">
                            <li>
                                <button 
                                    onClick={() => scrollToSection('hero')}
                                    className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group cursor-pointer w-full text-left"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Beranda</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('about')}
                                    className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group cursor-pointer w-full text-left"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Tentang Kemujan</span>
                                </button>
                            </li>
                            <li>
                                <Link 
                                    href="/umkm/list-umkm"
                                    className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">UMKM Unggulan</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/umkm/program-kerja"
                                    className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Program Kerja</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info - Better Spacing */}
                    <div className="md:col-span-1 xl:col-span-1">
                        <h4 className="text-lg font-semibold mb-6 text-white">Kontak Info</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-[#4DD0E1] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[#BBE1FA] text-sm leading-relaxed">
                                        Desa Kemujan<br />
                                        Karimunjawa<br />
                                        Kab. Jepara, Jawa Tengah
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <Globe className="w-5 h-5 text-[#4DD0E1] flex-shrink-0 mt-0.5" />
                                <div>
                                    <a 
                                        href="https://olahlautkemujan.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[#BBE1FA] hover:text-white text-sm transition-colors flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300 break-words">olahlautkemujan.com</span>
                                        <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Section - Responsive Text */}
                <div className="flex flex-col sm:flex-row items-center justify-center mt-12 pt-8 border-t border-white/20">
                    <div className="text-[#BBE1FA] text-xs sm:text-sm text-center flex flex-col sm:flex-row items-center">
                        <span className="mb-2 sm:mb-0">© 2025 UMKM Desa Kemujan, Tim KKN-T 127 Universitas Diponegoro</span>
                        <span className="mx-0 sm:mx-2 hidden sm:inline">|</span>
                        <span className="flex items-center">
                            Made with <span className="text-[#FF6B35] mx-1 animate-pulse">♡</span>
                            <a 
                                href="https://www.linkedin.com/in/raditya-wisnu-cahyo-nugroho/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="texthover:text-white transition-colors duration-300 font-medium hover:underline ml-1"
                            >
                                by Raditya Wisnu
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}