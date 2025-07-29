import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Globe, Instagram, Youtube, ExternalLink } from 'lucide-react';

export default function UmkmFooter() {
    return (
        <footer className="bg-gradient-to-b from-[rgb(12,52,76)] via-[#0F4C75] to-[#1B9C85] text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#4DD0E1] to-[#BBE1FA] rounded-lg flex items-center justify-center">
                                    <span className="text-[#0F4C75] font-bold text-lg">🌊</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">UMKM Kemujan</h3>
                                    <p className="text-[#BBE1FA] text-sm">Olah Laut Karimunjawa</p>
                                </div>
                            </div>
                            
                            <p className="text-[#BBE1FA] text-sm leading-relaxed mb-6">
                                Platform digital yang menghubungkan produk unggulan UMKM Desa Kemujan dengan masyarakat luas. 
                                Mendukung ekonomi lokal dan melestarikan kearifan maritim Karimunjawa.
                            </p>
                            
                            {/* Social Media */}
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Navigasi</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="http://127.0.0.1:8000/umkm#hero" className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Beranda</span>
                                </a>
                            </li>
                            <li>
                                <a href="http://127.0.0.1:8000/umkm#about" className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group">
                                    <span className="group-hover:translate-x-1 transition-transform">Tentang Kemujan</span>
                                </a>
                            </li>
                            <li>
                                <Link 
                                    href="/umkm/list-umkm"
                                    className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform">UMKM Unggulan</span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/umkm/program-kerja"
                                    className="text-[#BBE1FA] hover:text-white transition-colors text-sm flex items-center group"
                                >
                                    <span className="group-hover:translate-x-1 transition-transform">Program Kerja</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
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
                            
                            <div className="flex items-center space-x-3">
                                <Globe className="w-5 h-5 text-[#4DD0E1] flex-shrink-0" />
                                <div>
                                    <a 
                                        href="https://olahlautkemujan.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[#BBE1FA] hover:text-white text-sm transition-colors flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">olahlautkemujan.com</span>
                                        <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="flex items-center justify-center mt-8">
                        <div className="text-[#BBE1FA] text-sm md:mb-0 flex items-center">
                            <span>© 2025 UMKM Desa Kemujan. Made with</span>
                            <span className="text-[#FF6B35] mx-1 animate-pulse">♡</span>
                            <span>by Raditya Wisnu, Tim KKN-T 127 Universitas Diponegoro</span>
                        </div>
                    </div>
            </div>
        </footer>
    );
}