import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { 
    Star, 
    MapPin, 
    Phone, 
    ExternalLink,
    Instagram,
    Facebook,
    Users,
    ShoppingBag,
    Filter,
    Clock
} from 'lucide-react';

// Interface untuk UMKM data
interface Umkm {
    id: number;
    name: string;
    owner: string;
    category: string;
    description: string;
    address: string;
    products: string[];
    contact: string;
    rating: number;
    image: string;
    display_photos?: string[];
    menu_photo?: string;
    instagram?: string;
    facebook?: string;
    opening_hours?: {
        [key: string]: {
            is_open: boolean;
            open_time: string;
            close_time: string;
        };
    };
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

// Interface untuk category stats
interface CategoryStat {
    name: string;
    count: number;
}

// Interface untuk stats
interface Stats {
    total_umkm: number;
    total_products: number;
}

interface Props {
    featured_umkms?: Umkm[];
    categories?: CategoryStat[];
    stats?: Stats;
}

export default function UmkmPrograms({ featured_umkms, categories, stats }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Safety checks for data
    const safeFeaturedUmkms = useMemo(() => featured_umkms || [], [featured_umkms]);
    const safeCategories = useMemo(() => categories || [], [categories]);
    const safeStats = useMemo(() => stats || {
        total_umkm: safeFeaturedUmkms.length,
        total_products: 0,
    }, [stats, safeFeaturedUmkms]);

    // PERBAIKAN: Helper function untuk mendapatkan display image - ICON HANYA SEBAGAI FALLBACK
    const getDisplayImage = (umkm: Umkm) => {
        // PRIORITAS 1: Display photos
        if (umkm.display_photos && umkm.display_photos.length > 0) {
            return {
                type: 'photo',
                src: `/storage/umkm/display/${umkm.display_photos[0]}`,
                alt: umkm.name
            };
        }
        
        // PRIORITAS 2: Menu photo
        if (umkm.menu_photo) {
            return {
                type: 'photo',
                src: `/storage/umkm/menu/${umkm.menu_photo}`,
                alt: `${umkm.name} - Menu`
            };
        }
        
        // PRIORITAS 3: Icon emoji HANYA sebagai fallback
        return {
            type: 'emoji',
            src: umkm.image || '🏪',
            alt: umkm.name
        };
    };

    // Helper function untuk mendapatkan jam buka hari ini
    const getTodayOpeningHours = (umkm: Umkm) => {
        if (!umkm.opening_hours) return '08:00-17:00';
        
        const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const today = days[new Date().getDay()];
        const todayHours = umkm.opening_hours[today];
        
        if (todayHours && todayHours.is_open) {
            return `${todayHours.open_time}-${todayHours.close_time}`;
        }
        return 'Tutup';
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
        ));
    };

    // Prepare categories list dengan "Semua"
    const allCategories = useMemo(() => {
        const hasSemuaCategory = safeCategories.some(cat => cat.name === 'Semua');
        
        if (hasSemuaCategory) {
            return safeCategories;
        } else {
            const totalCount = safeCategories.reduce((sum, cat) => sum + cat.count, 0);
            return [
                { name: 'Semua', count: totalCount || safeFeaturedUmkms.length },
                ...safeCategories
            ];
        }
    }, [safeCategories, safeFeaturedUmkms]);

    // PERBAIKAN: Filter UMKM berdasarkan kategori dengan limit yang sesuai - LOGIC DIPERBAIKI
    const filteredUmkms = useMemo(() => {
        if (selectedCategory === 'Semua') {
            // Untuk "Semua", ambil maksimal 6 dengan diversitas kategori
            const categoriesUsed = new Set<string>();
            const diverseUmkms: Umkm[] = [];
            const remainingUmkms: Umkm[] = [];
            
            // Sort semua UMKM terlebih dahulu berdasarkan prioritas
            const sortedUmkms = [...safeFeaturedUmkms].sort((a, b) => {
                if (a.is_verified !== b.is_verified) return b.is_verified ? 1 : -1;
                if (a.rating !== b.rating) return b.rating - a.rating;
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            
            // Prioritas 1: Ambil 1 UMKM terbaik dari setiap kategori
            sortedUmkms.forEach(umkm => {
                if (!categoriesUsed.has(umkm.category) && categoriesUsed.size < 5) {
                    categoriesUsed.add(umkm.category);
                    diverseUmkms.push(umkm);
                } else {
                    remainingUmkms.push(umkm);
                }
            });
            
            // Prioritas 2: Tambahkan UMKM terbaik lainnya sampai total 6
            const finalUmkms = [...diverseUmkms];
            for (let i = 0; i < remainingUmkms.length && finalUmkms.length < 6; i++) {
                finalUmkms.push(remainingUmkms[i]);
            }
            
            return finalUmkms;
        } else {
            // Untuk kategori spesifik, ambil maksimal 3 terbaik
            return safeFeaturedUmkms
                .filter(umkm => umkm.category === selectedCategory)
                .sort((a, b) => {
                    // Sort by verified status, then rating, then created_at
                    if (a.is_verified !== b.is_verified) return b.is_verified ? 1 : -1;
                    if (a.rating !== b.rating) return b.rating - a.rating;
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                })
                .slice(0, 3); // Maksimal 3 untuk kategori spesifik
        }
    }, [safeFeaturedUmkms, selectedCategory]);

    return (
        <section id="programs" className="py-16 bg-[rgb(12,52,76)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header - Ocean Theme */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        UMKM Unggulan Desa Kemujan
                    </h2>
                    <p className="text-lg text-white/80 max-w-3xl mx-auto">
                        Jelajahi usaha mikro, kecil, dan menengah terbaik di Desa Kemujan yang telah dipilih 
                        berdasarkan kualitas produk, pelayanan, dan kontribusi terhadap ekonomi lokal.
                    </p>
                </div>

                {/* Statistics Row - Ocean Theme */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg border border-[#64FFDA]/20">
                        <div className="w-12 h-12 bg-[#64FFDA]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Users className="w-6 h-6 text-[#64FFDA]" />
                        </div>
                        <div className="text-2xl font-bold text-[#64FFDA] mb-1">{safeStats.total_umkm}+</div>
                        <div className="text-sm text-white/80">Total UMKM</div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg border border-[#64FFDA]/20">
                        <div className="w-12 h-12 bg-[#64FFDA]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <ShoppingBag className="w-6 h-6 text-[#64FFDA]" />
                        </div>
                        <div className="text-2xl font-bold text-[#64FFDA] mb-1">{safeStats.total_products}+</div>
                        <div className="text-sm text-white/80">Jenis Produk</div>
                    </div>
                </div>

                {/* Category Filter - Ocean Theme */}
                {allCategories && allCategories.length > 1 && (
                    <div className="mb-2">
                        {/* Container dengan padding untuk shadow */}
                            <div className="px-4 py-3">
                                {/* Scroll container */}
                                <div className="overflow-x-auto scrollbar-hide">
                                    <div className="flex justify-center gap-4 min-w-max mx-auto w-fit mt-4 mb-8 mx-2">
                                        {allCategories.map((category) => (
                                            <button
                                                key={category.name}
                                                onClick={() => setSelectedCategory(category.name)}
                                                className={`group flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg backdrop-blur-md whitespace-nowrap ${
                                                    selectedCategory === category.name
                                                        ? 'bg-[#64FFDA] text-[rgb(12,52,76)] border border-[#64FFDA] scale-105'
                                                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-[#64FFDA]/40 hover:shadow-xl hover:shadow-[#64FFDA]/40'
                                                }`}
                                            >
                                                <span className="text-sm">{category.name}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    selectedCategory === category.name
                                                        ? 'bg-[rgb(12,52,76)] text-[#64FFDA]'
                                                        : 'bg-white/20 text-white'
                                                }`}>
                                                    {category.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Scroll indicator for mobile */}
                            <div className="md:hidden text-center mt-4">
                                <p className="text-xs text-white/60">← Geser untuk melihat kategori lainnya →</p>
                            </div>
                        </div>
                    )}

                {/* UMKM Grid - Data dari Admin Panel dengan Filter */}
                {safeFeaturedUmkms && safeFeaturedUmkms.length > 0 ? (
                    <>
                        {/* Current filter info dengan informasi limit */}
                        <div className="mb-6 text-center">
                            <p className="text-white/80">
                                Menampilkan {filteredUmkms.length} UMKM 
                                {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
                            </p>
                        </div>

                        {filteredUmkms.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {filteredUmkms.map((umkm) => {
                                    const displayImageData = getDisplayImage(umkm);
                                    const todayHours = getTodayOpeningHours(umkm);
                                    
                                    return (
                                        <div key={umkm.id} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-white/20 hover:border-[#64FFDA]/40">
                                            {/* Image Section - PERBAIKAN */}
                                            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
                                                {displayImageData.type === 'photo' ? (
                                                    <>
                                                        <img 
                                                            src={displayImageData.src} 
                                                            alt={displayImageData.alt}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                const target = e.currentTarget;
                                                                target.style.display = 'none';
                                                                const fallback = target.parentElement?.querySelector('.emoji-fallback');
                                                                if (fallback) {
                                                                    (fallback as HTMLElement).classList.remove('hidden');
                                                                }
                                                            }}
                                                        />
                                                        <div className="emoji-fallback hidden w-full h-full flex items-center justify-center absolute inset-0">
                                                            <span className="text-6xl">{umkm.image || '🏪'}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-6xl">{displayImageData.src}</span>
                                                    </div>
                                                )}
                                                
                                                {/* Status Badge */}
                                                <div className="absolute top-3 left-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                        Aktif
                                                    </span>
                                                </div>
                                                
                                                {/* Operating Hours */}
                                                <div className="absolute top-3 right-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm border border-gray-200">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {todayHours}
                                                    </span>
                                                </div>
                                            </div>

                                             {/* Card Content */}
                                             <div className="p-6 flex-grow flex flex-col">
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-bold text-white text-lg truncate group-hover:text-[#64FFDA] transition-colors">
                                                            {umkm.name}
                                                        </h3>
                                                        <p className="text-sm text-white/80 truncate">{umkm.owner}</p>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            {renderStars(umkm.rating)}
                                                            <span className="text-xs text-white/60 ml-1">({umkm.rating})</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Category */}
                                                <div className="mb-4">
                                                    <span className="inline-block bg-[#64FFDA]/20 text-[#64FFDA] text-xs px-2 py-1 rounded-full font-medium border border-[#64FFDA]/30">
                                                        {umkm.category}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <div className="mb-4 flex-shrink-0">
                                                    <p className="text-white/70 text-sm leading-relaxed h-12 overflow-hidden">
                                                        <span className="line-clamp-3">{umkm.description}</span>
                                                    </p>
                                                </div>

                                                {/* Address */}
                                                <div className="flex items-start space-x-2 mb-4 flex-shrink-0">
                                                    <MapPin className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-white/70 line-clamp-2 leading-relaxed">{umkm.address}</span>
                                                </div>

                                                {/* Products - PERBAIKAN UNTUK ERROR */}
                                                <div className="mb-4 flex-shrink-0">
                                                    <h4 className="text-sm font-medium text-white mb-2">Produk:</h4>
                                                    <div className="flex flex-wrap gap-1 min-h-[2rem]">
                                                        {umkm.products && Array.isArray(umkm.products) && umkm.products.length > 0 ? (
                                                            <>
                                                                {umkm.products.slice(0, 3).map((product: string, index: number) => (
                                                                    <span
                                                                        key={index}
                                                                        className="inline-block bg-white/10 text-white text-xs px-2 py-1 rounded truncate max-w-[120px] border border-white/20"
                                                                        title={product}
                                                                    >
                                                                        {product}
                                                                    </span>
                                                                ))}
                                                                {umkm.products.length > 3 && (
                                                                    <span className="inline-block bg-white/10 text-white text-xs px-2 py-1 rounded border border-white/20">
                                                                        +{umkm.products.length - 3} lainnya
                                                                    </span>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <span className="text-xs text-white/60">Tidak ada produk tersedia</span>
                                                        )}
                                                    </div>
                                                </div>
                                            
                                                {/* Contact and Social Media */}
                                                <div className="flex items-center justify-between mt-auto pt-2">
                                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                                        <Phone className="w-4 h-4 text-white/60 flex-shrink-0" />
                                                        <span className="text-sm text-white/70 truncate">{umkm.contact}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                                        {umkm.instagram && (
                                                            <a
                                                                href={umkm.instagram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-pink-400 hover:text-pink-300 transition-colors"
                                                            >
                                                                <Instagram className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {umkm.facebook && (
                                                            <a
                                                                href={umkm.facebook}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                                            >
                                                                <Facebook className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Created Date */}
                                                <div className="mt-3 pt-3 border-t border-white/20">
                                                    <p className="text-xs text-white/60">
                                                        Bergabung: {new Date(umkm.created_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Card Footer */}
                                            <div className="bg-white/5 backdrop-blur-sm px-6 py-4 mt-auto flex-shrink-0 border-t border-white/20">
                                                <Link
                                                    href={`/umkm/${umkm.id}`}
                                                    className="inline-flex items-center justify-center space-x-2 text-white hover:text-[#64FFDA] font-medium text-sm transition-colors w-full group"
                                                >
                                                    <span>Lihat Detail</span>
                                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* No results for current filter */
                            <div className="text-center py-12 mb-12">
                                <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <Filter className="w-12 h-12 text-white/60" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">
                                    Tidak Ada UMKM dalam Kategori "{selectedCategory}"
                                </h3>
                                <p className="text-white/80 mb-6">
                                    Coba pilih kategori lain atau lihat semua UMKM.
                                </p>
                                <button
                                    onClick={() => setSelectedCategory('Semua')}
                                    className="group relative inline-flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:border-[#64FFDA] hover:shadow-[#64FFDA]/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100"
                                >
                                    Reset Filter Kategori
                                </button>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="text-center">
                            <Link
                                href="/umkm/list-umkm"
                                className="group relative inline-flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:bg-[#64FFDA] hover:shadow-[#64FFDA]/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100 hover:text-[rgb(12,52,76)]"
                            >
                                <span>Lihat Semua UMKM</span>
                                <ExternalLink className="w-5 h-5" />
                            </Link>
                        </div>
                    </>
                ) : (
                    // Empty State - Ocean Theme
                    <div className="text-center py-12 mb-12">
                        <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                            <Filter className="w-12 h-12 text-white/60" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">
                            Belum Ada UMKM Unggulan
                        </h3>
                        <p className="text-white/80 mb-6">
                            UMKM unggulan akan ditampilkan di sini setelah admin menambahkannya.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}