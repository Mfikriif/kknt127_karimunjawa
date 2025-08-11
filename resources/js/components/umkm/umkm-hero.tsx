import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import UmkmNavbar from './UmkmNavbar';

interface Stats {
    total_umkm: number;
    total_products: number;
    total_categories: number;
    revenue_increase: number;
}

interface Props {
    stats?: Stats;
}

export default function UmkmHero({ stats }: Props) {
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect handler
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        // Passive listener untuk better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Default stats jika tidak ada data dari props
    const defaultStats = {
        total_umkm: 150,
        total_products: 25,
        total_categories: 6,
        revenue_increase: 45
    };

    const displayStats = stats || defaultStats;

    return (
        <>
            {/* Navigation Bar - Menggunakan UmkmNavbar component */}
            <UmkmNavbar activeMenu="beranda" />

            {/* Hero Section with Parallax Effect */}
            <section id="hero" className="relative min-h-screen bg-[rgb(12,52,76)] overflow-hidden pt-20 pb-4">
                <div className="relative m-4">
                    <div className="relative rounded-3xl overflow-hidden min-h-[calc(100vh-8rem)]">
                        
                        {/* Parallax Background */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url("/image/hero.jpg")`,
                                transform: `translateY(${scrollY * 0.5}px)`,
                                scale: `${1 + scrollY * 0.0002}`,
                            }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div 
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3))`,
                            }}
                        />

                        {/* Content Container inside rounded background */}
                        <div className="relative z-10 h-full flex items-center">
                            <div className="container mx-auto px-8 py-16">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    {/* Left Content with Parallax */}
                                    <div 
                                        className="text-white"
                                        style={{
                                            transform: `translateY(${scrollY * 0.2}px)`,
                                        }}
                                    >
                                        <div className="mb-6">
                                            <span className="text-[#64FFDA] text-lg font-medium">
                                                UMKM Hub Desa Kemujan
                                            </span>
                                        </div>
                                        
                                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
                                            Dari Lokal<br />
                                            Impact <span className="text-[#64FFDA]">Global</span>
                                        </h1>
                                        
                                        <div className="flex flex-row gap-4 mb-12">
                                            <Link 
                                                href="/umkm/list-umkm"
                                                className="group relative inline-flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:border-[#64FFDA] hover:shadow-[#64FFDA]/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100"
                                            >
                                                <span>Lihat UMKM</span>
                                                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                            </Link>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Card with Subtle Parallax */}
                <div 
                    className="absolute bottom-0 right-0 bg-[rgb(12,52,76)] rounded-tl-3xl overflow-hidden z-50"
                    style={{
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                >
                    <div className="relative z-10 p-2 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 text-center w-full md:min-w-[480px] min-w-[160px]">
                            
                            <div className="group hover:transform hover:scale-105 transition-all duration-300 py-1 md:py-0 px-2 md:px-0">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] bg-clip-text text-transparent mb-1 md:mb-3">
                                    {displayStats.total_umkm}+
                                </div>
                                <div className="text-sm md:text-sm text-white leading-tight font-medium">
                                    UMKM terdaftar<br />
                                    di Kemujan
                                </div>
                                <div className="w-8 md:w-10 h-1 md:h-1.5 bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] rounded-full mx-auto mt-1 md:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="group hover:transform hover:scale-105 transition-all duration-300 py-1 md:py-0 px-2 md:px-0">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] bg-clip-text text-transparent mb-1 md:mb-3">
                                    {displayStats.total_products}+
                                </div>
                                <div className="text-sm md:text-sm text-white leading-tight font-medium">
                                    Jenis produk<br />
                                    tersedia
                                </div>
                                <div className="w-8 md:w-10 h-1 md:h-1.5 bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] rounded-full mx-auto mt-1 md:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            <div className="group hover:transform hover:scale-105 transition-all duration-300 py-1 md:py-0 px-2 md:px-0">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] bg-clip-text text-transparent mb-1 md:mb-3">
                                    {displayStats.total_categories}
                                </div>
                                <div className="text-sm md:text-sm text-white leading-tight font-medium">
                                    Kategori UMKM<br />
                                    tersedia
                                </div>
                                <div className="w-8 md:w-10 h-1 md:h-1.5 bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] rounded-full mx-auto mt-1 md:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}