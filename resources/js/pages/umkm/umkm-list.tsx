import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import UmkmNavbar from '@/components/umkm/UmkmNavbar';
import UmkmFooter from '@/components/umkm/umkm-footer';
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
    Clock,
    Search,
    ChevronLeft,
    ChevronRight
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
    is_active: boolean;
    created_at: string;
}

interface CategoryStat {
    name: string;
    count: number;
}

interface Stats {
    total_umkm: number;
    total_products: number;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    umkms: {
        data: Umkm[];
        meta: PaginationMeta;
        links: PaginationLink[];
    };
    categories: CategoryStat[];
    filters: {
        category?: string;
        search?: string;
    };
    currentCategory?: string;
    current_category?: string;
    search_query?: string;
    stats?: Stats;
    per_page?: number;
}

// Hook untuk mendeteksi ukuran layar dengan debounce
const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setScreenSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 100); // Debounce 100ms untuk performa
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return screenSize;
};

export default function UmkmListPage({ 
    umkms, 
    categories, 
    filters, 
    currentCategory, 
    current_category, 
    search_query,
    stats,
    per_page 
}: Props) {
    const activeCategory = currentCategory || current_category || 'Semua';
    const activeSearchQuery = search_query || filters?.search || '';
    
    const [searchTerm, setSearchTerm] = useState(activeSearchQuery);
    const [selectedCategory, setSelectedCategory] = useState(activeCategory);
    const [isLoading, setIsLoading] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    
    // Hook untuk screen size
    const { width } = useScreenSize();
    const isTabletOrMobile = width <= 1024;
    const isTablet = width <= 768;

    // Ref untuk pagination container
    const paginationRef = useRef<HTMLDivElement>(null);
    
    // PERBAIKAN: Fungsi untuk mendapatkan per_page yang tepat berdasarkan width
    const getCorrectPerPage = useCallback((screenWidth: number) => {
        return screenWidth <= 1024 ? 6 : 12;
    }, []);

    // PERBAIKAN: State untuk current per_page dengan nilai yang benar
    const [currentPerPage, setCurrentPerPage] = useState(() => {
        if (per_page) {
            return per_page;
        }
        return getCorrectPerPage(width);
    });

    // PERBAIKAN: Effect untuk auto-adjustment per_page ketika layar berubah
    useEffect(() => {
        if (!hasInitialized) return;

        const correctPerPage = getCorrectPerPage(width);
        const urlParams = new URLSearchParams(window.location.search);
        const currentUrlPerPage = parseInt(urlParams.get('per_page') || '12');
        
        // PERBAIKAN: Hanya update jika benar-benar berbeda dan sudah initialized
        if (correctPerPage !== currentUrlPerPage && correctPerPage !== currentPerPage) {
            
            setCurrentPerPage(correctPerPage);
            setIsLoading(true);
            
            router.get('/umkm/list-umkm', {
                category: selectedCategory,
                search: searchTerm,
                per_page: correctPerPage,
            }, {
                preserveState: true,
                preserveScroll: true,
                only: ['umkms'],
                onSuccess: () => {
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                }
            });
        }
    }, [width, hasInitialized, selectedCategory, searchTerm, currentPerPage, getCorrectPerPage]);

    // PERBAIKAN: Effect untuk initial setup - hanya run sekali
    useEffect(() => {
        const correctPerPage = getCorrectPerPage(width);
        const urlParams = new URLSearchParams(window.location.search);
        const currentUrlPerPage = parseInt(urlParams.get('per_page') || '12');
        
        // Set initialized flag setelah component mount
        const initTimeout = setTimeout(() => {
            setHasInitialized(true);
            
            // PERBAIKAN: Jika per_page di URL tidak sesuai dengan screen size, perbaiki
            if (currentUrlPerPage !== correctPerPage) {
                
                setCurrentPerPage(correctPerPage);
                
                router.get('/umkm/list-umkm', {
                    category: selectedCategory,
                    search: searchTerm,
                    per_page: correctPerPage,
                }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['umkms'],
                    replace: true // Replace untuk initial correction
                });
            } else {
                setCurrentPerPage(currentUrlPerPage);
            }
        }, 200); // Delay untuk memastikan component sudah stabil

        return () => clearTimeout(initTimeout);
    }, [getCorrectPerPage, width, selectedCategory, searchTerm]); // Added missing dependencies

    // Safety checks for data
    const safeUmkms = useMemo(() => {
        const result = umkms || { 
            data: [], 
            meta: { 
                current_page: 1, 
                last_page: 1, 
                from: 0, 
                to: 0, 
                total: 0,
                per_page: currentPerPage
            }, 
            links: [] 
        };
        return result;
    }, [umkms, currentPerPage]);

    const safeCategories = useMemo(() => categories || [], [categories]);
    const safeFilters = useMemo(() => filters || {}, [filters]);
    const safeStats = useMemo(() => stats || {
        total_umkm: safeUmkms.data.length,
        total_products: 0,
    }, [stats, safeUmkms]);

    // Helper functions
    const getDisplayImage = (umkm: Umkm) => {
        if (umkm.display_photos && umkm.display_photos.length > 0) {
            return {
                type: 'photo',
                src: `/storage/umkm/display/${umkm.display_photos[0]}`,
                alt: umkm.name
            };
        }
        
        if (umkm.menu_photo) {
            return {
                type: 'photo',
                src: `/storage/umkm/menu/${umkm.menu_photo}`,
                alt: `${umkm.name} - Menu`
            };
        }
        
        return {
            type: 'emoji',
            src: umkm.image || '🏪',
            alt: umkm.name
        };
    };

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
                    i < rating ? 'text-[#FFD700] fill-current' : 'text-white/30'
                }`}
            />
        ));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.get('/umkm/list-umkm', {
            category: selectedCategory,
            search: searchTerm,
            per_page: currentPerPage,
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleCategoryFilter = (categoryName: string) => {
        setSelectedCategory(categoryName);
        
        router.get('/umkm/list-umkm', {
            category: categoryName,
            search: searchTerm,
            per_page: currentPerPage,
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handlePageChange = (url: string) => {
        if (url) {
            
            const currentScrollY = window.scrollY;
            setIsLoading(true);
            
            const urlObj = new URL(url, window.location.origin);
            const params = new URLSearchParams(urlObj.search);
            
            // PERBAIKAN: Pastikan per_page selalu sesuai dengan screen size
            params.set('per_page', currentPerPage.toString());
            
            const newUrl = `${urlObj.pathname}?${params.toString()}`;
            
            router.get(newUrl, {}, {
                preserveState: true,
                preserveScroll: true,
                only: ['umkms'],
                onSuccess: () => {
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                    window.scrollTo(0, currentScrollY);
                }
            });
        }
    };

    // Prepare categories list dengan "Semua"
    const allCategories = useMemo(() => {
        const hasSemuaCategory = safeCategories.some(cat => cat.name === 'Semua');
        
        if (hasSemuaCategory) {
            return safeCategories;
        } else {
            const totalCount = safeCategories.reduce((sum, cat) => sum + cat.count, 0);
            return [
                { name: 'Semua', count: totalCount || safeUmkms.data.length },
                ...safeCategories
            ];
        }
    }, [safeCategories, safeUmkms.data]);

    return (
        <>
            <Head title={`UMKM ${selectedCategory === 'Semua' ? 'Semua Kategori' : selectedCategory} - Desa Kemujan`} />
            
            <UmkmNavbar activeMenu="umkm-unggulan" />

            {/* Main Container */}
            <div className="min-h-screen bg-[rgb(12,52,76)] pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12 pt-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            UMKM Unggulan Desa Kemujan, Karimun Jawa
                        </h2>
                        <p className="text-lg text-white/80 max-w-3xl mx-auto">
                            Berikut adalah usaha mikro, kecil, dan menengah terbaik di Desa Kemujan 
                            yang telah dipilih berdasarkan kualitas produk, pelayanan, dan kontribusi 
                            terhadap ekonomi lokal.
                        </p>
                    </div>

                    {/* Statistics Row */}
                    <div className="items-center justify-center grid grid-cols-2 md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg ">
                            <div className="w-12 h-12 bg-[#64FFDA]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-[#64FFDA]" />
                            </div>
                            <div className="text-2xl font-bold text-[#64FFDA] mb-1">{safeStats.total_umkm}+</div>
                            <div className="text-sm text-white/80">Total UMKM</div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center shadow-lg ">
                            <div className="w-12 h-12 bg-[#64FFDA]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <ShoppingBag className="w-6 h-6 text-[#64FFDA]" />
                            </div>
                            <div className="text-2xl font-bold text-[#64FFDA] mb-1">{safeStats.total_products}+</div>
                            <div className="text-sm text-white/80">Jenis Produk</div>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 ">
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1">
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Cari UMKM berdasarkan nama, pemilik, atau produk..."
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent text-white placeholder-white/60 backdrop-blur-sm"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#64FFDA] text-[rgb(12,52,76)] px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 font-semibold hover:scale-105"
                                    >
                                        <Search size={20} />
                                        <span className={`${isTablet ? 'hidden' : 'block'}`}>Cari</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    {allCategories && allCategories.length > 1 && (
                        <div className="mb-2">
                            <div className="px-4 py-3">
                                <div className="overflow-x-auto scrollbar-hide">
                                    <div className="flex justify-center gap-4 min-w-max mx-auto w-fit mt-4 mb-12 px-2">
                                        {allCategories.map((category) => (
                                            <button
                                                key={category.name}
                                                onClick={() => handleCategoryFilter(category.name)}
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
                            
                            <div className="md:hidden text-center mt-4">
                                <p className="text-xs text-white/60">← Geser untuk melihat kategori lainnya →</p>
                            </div>
                        </div>
                    )}

                    {/* Current filter info */}
                    <div className="mb-6 text-center">
                        <p className="text-white/80">
                            Menampilkan {safeUmkms.data.length} UMKM 
                            {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
                            {safeFilters.search && ` untuk pencarian "${safeFilters.search}"`}
                        </p>
                    </div>

                    {/* UMKM Grid */}
                    {safeUmkms.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {safeUmkms.data.map((umkm) => {
                                    const displayImageData = getDisplayImage(umkm);
                                    const todayHours = getTodayOpeningHours(umkm);
                                    
                                    return (
                                        <div key={umkm.id} className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-white/20 hover:border-[#64FFDA]/40">
                                            {/* Image Section */}
                                            <div className="relative h-48 bg-gradient-to-br from-white/5 to-white/10">
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
                                                
                                                <div className="absolute top-3 left-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                        Aktif
                                                    </span>
                                                </div>
                                                
                                                <div className="absolute top-3 right-3">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 bg-white/90 text-gray-800 backdrop-blur-sm border border-gray-200">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {todayHours}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6 flex-grow flex flex-col">
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

                                                <div className="mb-4">
                                                    <span className="inline-block bg-[#64FFDA]/20 text-[#64FFDA] text-xs px-2 py-1 rounded-full font-medium border border-[#64FFDA]/30">
                                                        {umkm.category}
                                                    </span>
                                                </div>

                                                <div className="mb-4 flex-shrink-0">
                                                    <p className="text-white/70 text-sm leading-relaxed h-12 overflow-hidden">
                                                        <span className="line-clamp-3">{umkm.description}</span>
                                                    </p>
                                                </div>

                                                <div className="flex items-start space-x-2 mb-4 flex-shrink-0">
                                                    <MapPin className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-white/70 line-clamp-2 leading-relaxed">{umkm.address}</span>
                                                </div>

                                                <div className="mb-4 flex-shrink-0">
                                                    <h4 className="text-sm font-medium text-white mb-2">Produk:</h4>
                                                    <div className="flex flex-wrap gap-1 min-h-[2rem]">
                                                        {umkm.products && umkm.products.length > 0 ? (
                                                            <>
                                                                {umkm.products.slice(0, 3).map((product, index) => (
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

                                                <div className="mt-3 pt-3 border-t border-white/20">
                                                    <p className="text-xs text-white/60">
                                                        Bergabung: {new Date(umkm.created_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>

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

                            {/* PERBAIKAN: Pagination dengan button responsif */}
                            {safeUmkms.links && safeUmkms.links.length > 3 && (
                                <div 
                                    ref={paginationRef}
                                    className={`bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4 md:p-6 border border-white/20 transition-opacity duration-300 ${
                                        isLoading ? 'opacity-60 pointer-events-none' : 'opacity-100'
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        {/* Page Info - Hidden untuk mobile, tampilkan untuk desktop */}
                                        <div className={`${isTabletOrMobile ? 'hidden' : 'block'} text-sm text-white/80`}>
                                            Halaman {safeUmkms.meta?.current_page || 1} dari {safeUmkms.meta?.last_page || 1}
                                        </div>

                                        {/* Navigation - Full width untuk mobile */}
                                        <div className={`flex items-center justify-center ${isTabletOrMobile ? 'w-full' : ''} gap-2`}>
                                            {/* Previous Button - RESPONSIF */}
                                            {safeUmkms.links.map((link, index) => {
                                                if (link.label.includes('Previous')) {
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => link.url && handlePageChange(link.url)}
                                                            disabled={!link.url}
                                                            className={`${
                                                                isTablet 
                                                                    ? 'min-w-[36px] h-10 justify-center' 
                                                                    : isTabletOrMobile 
                                                                        ? 'px-3 py-2 text-sm font-medium' 
                                                                        : 'px-3 py-2 text-sm'
                                                            } rounded-lg flex items-center gap-2 transition-all duration-300 backdrop-blur-md border ${
                                                                link.url
                                                                    ? 'bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-[#64FFDA]/40'
                                                                    : 'bg-white/5 text-white/40 cursor-not-allowed border-white/10'
                                                            }`}
                                                        >
                                                            <ChevronLeft size={16} />
                                                            {/* PERBAIKAN: Tampilkan text hanya jika bukan tablet */}
                                                            {!isTablet && <span>Sebelumnya</span>}
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            })}

                                            {/* Page Numbers */}
                                            <div className="flex items-center gap-1">
                                                {(() => {
                                                    const currentPage = safeUmkms.meta?.current_page || 1;
                                                    const lastPage = safeUmkms.meta?.last_page || 1;
                                                    const pageLinks = safeUmkms.links.slice(1, -1); // Remove prev/next

                                                    if (isTabletOrMobile) {
                                                        // MOBILE/TABLET: Tampilkan max 5 pages yang smart
                                                        const pages = [];
                                                        const maxVisible = isTablet ? 3 : 5; // Tablet hanya 3, mobile 5
                                                        
                                                        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                                                        let end = Math.min(lastPage, start + maxVisible - 1);
                                                        
                                                        if (end - start < maxVisible - 1) {
                                                            start = Math.max(1, end - maxVisible + 1);
                                                        }

                                                        for (let i = start; i <= end; i++) {
                                                            const pageLink = pageLinks.find(link => link.label === i.toString());
                                                            pages.push(
                                                                <button
                                                                    key={i}
                                                                    onClick={() => pageLink?.url && handlePageChange(pageLink.url)}
                                                                    disabled={!pageLink?.url}
                                                                    className={`${
                                                                        isTablet ? 'min-w-[32px] h-8 text-xs' : 'min-w-[40px] h-10 text-sm'
                                                                    } rounded-lg font-medium backdrop-blur-md transition-all duration-300 flex items-center justify-center border ${
                                                                        i === currentPage 
                                                                            ? 'bg-[#64FFDA] text-[rgb(12,52,76)] border-[#64FFDA] font-bold shadow-lg' 
                                                                            : 'bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-[#64FFDA]/40'
                                                                    }`}
                                                                >
                                                                    {i}
                                                                </button>
                                                            );
                                                        }

                                                        return pages;
                                                    } else {
                                                        // DESKTOP: Logic pagination normal
                                                        return pageLinks.map((link, pageIndex) => {
                                                            if (link.label === '...') {
                                                                return (
                                                                    <span key={pageIndex} className="px-2 text-white/60">
                                                                        ...
                                                                    </span>
                                                                );
                                                            }

                                                            const isActive = link.active;
                                                            return (
                                                                <button
                                                                    key={pageIndex}
                                                                    onClick={() => link.url && handlePageChange(link.url)}
                                                                    disabled={!link.url}
                                                                    className={`px-3 py-2 text-sm rounded-lg backdrop-blur-md transition-all duration-300 border ${
                                                                        isActive
                                                                            ? 'bg-[#64FFDA] text-[rgb(12,52,76)] border-[#64FFDA] font-bold shadow-lg'
                                                                            : 'bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-[#64FFDA]/40'
                                                                    }`}
                                                                >
                                                                    {link.label}
                                                                </button>
                                                            );
                                                        });
                                                    }
                                                })()}
                                            </div>

                                            {/* Next Button - RESPONSIF */}
                                            {safeUmkms.links.map((link, index) => {
                                                if (link.label.includes('Next')) {
                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => link.url && handlePageChange(link.url)}
                                                            disabled={!link.url}
                                                            className={`${
                                                                isTablet 
                                                                    ? 'min-w-[36px] h-10 justify-center' 
                                                                    : isTabletOrMobile 
                                                                        ? 'px-3 py-2 text-sm font-medium' 
                                                                        : 'px-3 py-2 text-sm'
                                                            } rounded-lg flex items-center gap-2 transition-all duration-300 backdrop-blur-md border ${
                                                                link.url
                                                                    ? 'bg-white/10 hover:bg-white/15 text-white border-white/20 hover:border-[#64FFDA]/40'
                                                                    : 'bg-white/5 text-white/40 cursor-not-allowed border-white/10'
                                                            }`}
                                                        >
                                                            {/* PERBAIKAN: Tampilkan text hanya jika bukan tablet */}
                                                            {!isTablet && <span>Selanjutnya</span>}
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // Empty State
                        <div className="text-center py-12 mb-12">
                            <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                <Filter className="w-12 h-12 text-white/60" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">
                                {selectedCategory !== 'Semua' 
                                    ? `Tidak Ada UMKM dalam Kategori "${selectedCategory}"`
                                    : 'Belum Ada UMKM Unggulan'
                                }
                            </h3>
                            <p className="text-white/80 mb-6">
                                {selectedCategory !== 'Semua'
                                    ? 'Coba pilih kategori lain atau lihat semua UMKM.'
                                    : 'UMKM unggulan akan ditampilkan di sini setelah admin menambahkannya.'
                                }
                            </p>
                            
                            <button
                                onClick={() => handleCategoryFilter('Semua')}
                                className="group relative inline-flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:border-[#64FFDA] hover:shadow-[#64FFDA]/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100"
                            >
                                {selectedCategory !== 'Semua' ? 'Reset Filter' : 'Lihat Semua UMKM'}
                            </button>
                        </div>
                    )}
                </div>
                
                <UmkmFooter />
            </div>
        </>
    );
}