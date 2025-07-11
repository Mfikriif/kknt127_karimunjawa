import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { 
    Plus, 
    Search, 
    Filter, 
    Eye, 
    Edit, 
    Trash2, 
    CheckCircle, 
    XCircle, 
    Star,
    MapPin,
    Phone,
    User,
    ChevronLeft,
    ChevronRight,
    Clock
} from 'lucide-react';

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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    path: string;
    links: PaginationLink[];
}

interface Props {
    umkms: {
        data: Umkm[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    categories: string[];
    filters: {
        category?: string;
        active?: string;
        search?: string;
    };
    stats: {
        total: number;
        active: number;
        inactive: number;
    };
}

export default function UmkmIndex({ umkms, categories, filters, stats }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.umkm.index'), { ...filters, search });
    };

    const handleFilter = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (value === 'all') {
            delete newFilters[key as keyof typeof newFilters];
        }
        router.get(route('admin.umkm.index'), newFilters);
    };

    const clearFilters = () => {
        router.get(route('admin.umkm.index'));
    };

    const handleDelete = (umkm: Umkm) => {
        if (confirm(`Apakah Anda yakin ingin menghapus UMKM "${umkm.name}"?`)) {
            router.delete(route('admin.umkm.destroy', umkm.id), {
                onSuccess: () => {
                    // Optional: show success message
                }
            });
        }
    };

    const toggleActive = (umkm: Umkm) => {
        router.post(route('admin.umkm.toggle-active', umkm.id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: show success message
            }
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTodayOpeningHours = (umkm: Umkm) => {
        if (!umkm.opening_hours) return null;
        
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const dayMapping: { [key: string]: string } = {
            'monday': 'senin',
            'tuesday': 'selasa',
            'wednesday': 'rabu',
            'thursday': 'kamis',
            'friday': 'jumat',
            'saturday': 'sabtu',
            'sunday': 'minggu'
        };
        
        const indonesianDay = dayMapping[today];
        return umkm.opening_hours[indonesianDay] || null;
    };

    const isCurrentlyOpen = (umkm: Umkm) => {
        const todayHours = getTodayOpeningHours(umkm);
        if (!todayHours || !todayHours.is_open) return false;
        
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [openHour, openMin] = todayHours.open_time.split(':').map(Number);
        const [closeHour, closeMin] = todayHours.close_time.split(':').map(Number);
        const openTime = openHour * 60 + openMin;
        const closeTime = closeHour * 60 + closeMin;
        
        return currentTime >= openTime && currentTime <= closeTime;
    };

    const getDisplayImage = (umkm: Umkm) => {
        // Jika ada foto display, gunakan foto pertama
        if (umkm.display_photos && umkm.display_photos.length > 0) {
            return `/storage/umkm/display/${umkm.display_photos[0]}`;
        }
        // Jika tidak ada foto, return null untuk tampilkan icon
        return null;
    };

    // FIXED: Function to properly format opening hours display
    const formatOpeningHoursDisplay = (umkm: Umkm) => {
        const todayHours = getTodayOpeningHours(umkm);
        if (!todayHours) return null;
        
        const currentlyOpen = isCurrentlyOpen(umkm);
        
        if (!todayHours.is_open) {
            return { text: 'Tutup', isOpen: false };
        }
        
        if (currentlyOpen) {
            return { text: 'Buka Sekarang', isOpen: true };
        }
        
        return { 
            text: `${todayHours.open_time}-${todayHours.close_time}`, 
            isOpen: false 
        };
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Head title="Kelola UMKM" />
            
            {/* Add custom styles for better text contrast */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    input, textarea, select {
                        color: #111827 !important;
                    }
                    input::placeholder, textarea::placeholder {
                        color: #6B7280 !important;
                        opacity: 1 !important;
                    }
                    select option {
                        color: #111827 !important;
                    }
                    select option:disabled {
                        color: #9CA3AF !important;
                    }
                    input[type="search"] {
                        color: #111827 !important;
                        background-color: #ffffff !important;
                    }
                `
            }} />
            
            {/* Sidebar */}
            <AdminSidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <AdminNavbar />
                
                {/* Content */}
                <main className="flex-1 px-8 py-6 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola UMKM</h1>
                            <p className="text-gray-600 mt-1">Kelola data UMKM Desa Kemujan</p>
                        </div>
                        <Link
                            href={route('admin.umkm.create')}
                            className="bg-blue-900 hover:bg-blue-950 text-white px-5 py-2 text-sm rounded-lg shadow transition flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah UMKM</span>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total UMKM</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Aktif</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="p-3 bg-red-100 rounded-lg">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Tidak Aktif</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-4">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari UMKM, pemilik, atau alamat..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                    />
                                </div>
                            </form>

                            {/* Filter Toggle */}
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>Filter</span>
                                </button>
                                
                                {(filters.category || filters.active || filters.search) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Options */}
                        {showFilters && (
                            <div className="pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                        <select
                                            value={filters.category || 'all'}
                                            onChange={(e) => handleFilter('category', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        >
                                            <option value="all" style={{color: '#111827'}}>Semua Kategori</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category} style={{color: '#111827'}}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Active Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Status Aktif</label>
                                        <select
                                            value={filters.active || 'all'}
                                            onChange={(e) => handleFilter('active', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        >
                                            <option value="all" style={{color: '#111827'}}>Semua Status</option>
                                            <option value="true" style={{color: '#111827'}}>Aktif</option>
                                            <option value="false" style={{color: '#111827'}}>Nonaktif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* UMKM Grid - FIXED Opening Hours Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {umkms.data.map((umkm) => {
                            const openingHoursDisplay = formatOpeningHoursDisplay(umkm);
                            const displayImage = getDisplayImage(umkm);
                            
                            return (
                                <div key={umkm.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
                                    {/* Image Section */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
                                        {displayImage ? (
                                            <img 
                                                src={displayImage} 
                                                alt={umkm.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-4xl">{umkm.image}</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Status Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                                umkm.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {umkm.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </div>

                                        {/* Opening Hours Badge - FIXED */}
                                        {openingHoursDisplay && (
                                            <div className="absolute top-3 right-3">
                                                <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    openingHoursDisplay.isOpen 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    <Clock className="w-3 h-3" />
                                                    <span>{openingHoursDisplay.text}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Rating Badge */}
                                        <div className="absolute bottom-3 left-3">
                                            <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="text-xs font-medium text-gray-900">{umkm.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-5">
                                        {/* Header */}
                                        <div className="mb-3">
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{umkm.name}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{umkm.owner}</p>
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">
                                                {umkm.category}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                            {umkm.description}
                                        </p>

                                        {/* Location & Contact */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-start space-x-2 text-sm text-gray-500">
                                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                <span className="line-clamp-1">{umkm.address}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Phone className="w-4 h-4 flex-shrink-0" />
                                                <span className="truncate">{umkm.contact}</span>
                                            </div>
                                        </div>

                                        {/* Products */}
                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-900 mb-2">Produk:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {umkm.products.slice(0, 3).map((product, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                                                        {product}
                                                    </span>
                                                ))}
                                                {umkm.products.length > 3 && (
                                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                                                        +{umkm.products.length - 3} lainnya
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={route('admin.umkm.show', umkm.id)}
                                                    className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={route('admin.umkm.edit', umkm.id)}
                                                    className="text-yellow-600 hover:text-yellow-700 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(umkm)}
                                                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => toggleActive(umkm)}
                                                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                                                        umkm.is_active
                                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    }`}
                                                    title={umkm.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                                >
                                                    {umkm.is_active ? 'Disable' : 'Enable'}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Date */}
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">
                                                Dibuat: {formatDate(umkm.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {umkms.data.length === 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center mb-6">
                            <div className="text-6xl mb-4">🏪</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {filters.search || filters.category || filters.active 
                                    ? 'Tidak ada UMKM yang sesuai filter' 
                                    : 'Belum ada UMKM'
                                }
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {filters.search || filters.category || filters.active 
                                    ? 'Coba ubah kriteria pencarian atau filter Anda' 
                                    : 'Mulai tambahkan UMKM untuk mengelola data usaha di Desa Kemujan'
                                }
                            </p>
                            {!(filters.search || filters.category || filters.active) ? (
                                <Link
                                    href={route('admin.umkm.create')}
                                    className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah UMKM Pertama</span>
                                </Link>
                            ) : (
                                <button
                                    onClick={clearFilters}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {umkms.data.length > 0 && umkms.meta && umkms.meta.last_page > 1 && (
                        <div className="bg-white px-6 py-4 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">{umkms.meta.from}</span> - <span className="font-medium">{umkms.meta.to}</span> dari <span className="font-medium">{umkms.meta.total}</span> UMKM
                                </div>
                                <div className="flex items-center space-x-2">
                                    {umkms.meta.links.map((link, index) => {
                                        if (link.label.includes('Previous')) {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1 ${
                                                        link.url
                                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                    <span>Previous</span>
                                                </button>
                                            );
                                        }
                                        
                                        if (link.label.includes('Next')) {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 text-sm rounded-lg flex items-center space-x-1 ${
                                                        link.url
                                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <span>Next</span>
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            );
                                        }
                                        
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : link.url
                                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                                {link.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}