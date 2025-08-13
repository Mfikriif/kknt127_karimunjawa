// File: resources/js/pages/umkm/umkm-detail.tsx

import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import UmkmNavbar from '@/components/umkm/UmkmNavbar';
import UmkmFooter from '@/components/umkm/umkm-footer';
import { 
    ArrowLeft, 
    Star, 
    MapPin, 
    Phone, 
    Mail,
    Clock,
    Globe,
    CheckCircle,
    Verified,
    ChevronLeft,
    ChevronRight,
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
    website?: string;
    email?: string;
    opening_hours?: {
        [key: string]: {
            is_open: boolean;
            open_time: string;
            close_time: string;
        };
    };
    price_range?: string;
    facilities?: string[];
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

interface Props {
    umkm: Umkm;
    related_umkms?: Umkm[];
}

export default function UmkmDetail({ umkm, related_umkms = [] }: Props) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showAllOpeningHours, setShowAllOpeningHours] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        visit_date: '',
        visit_time: ''
    });

    // PERBAIKAN: Helper function untuk mendapatkan display image - ICON HANYA SEBAGAI FALLBACK
    const getDisplayImages = (umkm: Umkm) => {
        const images = [];
        
        // PRIORITAS 1: Display photos
        if (umkm.display_photos && umkm.display_photos.length > 0) {
            umkm.display_photos.forEach((photo, index) => {
                images.push({
                    type: 'photo',
                    src: `/storage/umkm/display/${photo}`,
                    alt: `${umkm.name} - Photo ${index + 1}`
                });
            });
        }

        // PRIORITAS 2: Menu photo
        if (umkm.menu_photo) {
            images.push({
                type: 'menu',
                src: `/storage/umkm/menu/${umkm.menu_photo}`,
                alt: `${umkm.name} - Menu`
            });
        }

        // PRIORITAS 3: Icon emoji HANYA sebagai fallback jika tidak ada foto sama sekali
        if (images.length === 0 && umkm.image) {
            images.push({
                type: 'emoji',
                src: umkm.image,
                alt: `${umkm.name} - Icon`
            });
        }

        // Default fallback jika tidak ada gambar dan icon
        return images.length > 0 ? images : [{
            type: 'emoji',
            src: '🏪',
            alt: 'Default UMKM Icon'
        }];
    };

    // Function format deskripsi
    const formatDescription = (description: string) => {
        if (!description || description.trim().length === 0) {
            return '';
        }

        if (description.includes('\n')) {
            return description.trim();
        }

        const formatted = description.trim().replace(/\s+/g, ' ');
        
        // Pattern untuk item menu: Nama + Rp + harga
        const menuItems = [];
        const menuPattern = /([A-Z][a-zA-Z\s-]*?)\s+(Rp\d+\.?\d*)/g;
        
        let match;
        let introText = '';
        
        while ((match = menuPattern.exec(formatted)) !== null) {
            // Ambil text sebelum menu pertama sebagai intro
            if (menuItems.length === 0) {
                introText = formatted.substring(0, match.index).trim();
            }
            
            // Tambahkan item menu
            menuItems.push(`${match[1].trim()} ${match[2]}`);
        }
        
        // Gabungkan intro dengan menu items
        if (introText && menuItems.length > 0) {
            return `${introText}\n\n${menuItems.join('\n')}`;
        } else if (menuItems.length > 0) {
            return menuItems.join('\n');
        } else {
            return formatted;
        }
    };

    // Helper function untuk render rating stars
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
            />
        ));
    };

    // Helper function untuk mendapatkan jam operasional hari ini
    const getTodayOpeningHours = () => {
        if (!umkm.opening_hours) return 'Jam operasional belum tersedia';
        
        const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const today = days[new Date().getDay()];
        const todayHours = umkm.opening_hours[today];
        
        if (todayHours && todayHours.is_open) {
            return `${todayHours.open_time} - ${todayHours.close_time}`;
        }
        return 'Tutup hari ini';
    };

    // Helper function untuk mendapatkan semua jam operasional
    const getAllOpeningHours = () => {
        if (!umkm.opening_hours) return [];
        
        const dayNames = {
            'senin': 'Senin',
            'selasa': 'Selasa', 
            'rabu': 'Rabu',
            'kamis': 'Kamis',
            'jumat': 'Jumat',
            'sabtu': 'Sabtu',
            'minggu': 'Minggu'
        };

        const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
        
        return days.map(day => {
            const hours = umkm.opening_hours?.[day];
            return {
                day: dayNames[day as keyof typeof dayNames],
                isOpen: hours?.is_open || false,
                openTime: hours?.open_time || '',
                closeTime: hours?.close_time || '',
                isToday: day === ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'][new Date().getDay()]
            };
        });
    };

    // Helper function untuk mendapatkan hari ini
    const getTodayDayName = () => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return days[new Date().getDay()];
    };

    // Handle form submission
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Send contact form data
        router.post('/umkm/contact', {
            ...contactForm,
            umkm_id: umkm.id
        }, {
            onSuccess: () => {
                setShowContactForm(false);
                setContactForm({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                    visit_date: '',
                    visit_time: ''
                });
                alert('Pesan berhasil dikirim!');
            }
        });
    };

    const displayImages = getDisplayImages(umkm);
    const currentImage = displayImages[selectedImageIndex];

    return (
        <>
            <Head title={`${umkm.name} - UMKM Desa Kemujan`} />
            
            {/* Navbar */}
            <UmkmNavbar activeMenu="" />

            <div className="min-h-screen bg-[rgb(12,52,76)] pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    
                    {/* Breadcrumb & Back Button */}
                    <div className="flex items-center space-x-4 mb-8">
                        <Link 
                            href="/umkm/list-umkm"
                            className="flex items-center space-x-2 text-white hover:text-[#64FFDA] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Kembali ke Daftar UMKM</span>
                        </Link>
                        <span className="text-white">/</span>
                        <span className="text-white/80">{umkm.name}</span>
                    </div>

                    {/* Main Content Grid - Foto di kiri, Info di kanan */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        
                        {/* Left Side - Images (2/3 width on desktop) */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Main Image Display */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-blue-50 to-blue-100">
                                    {currentImage.type === 'emoji' ? (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-8xl lg:text-9xl">{currentImage.src}</span>
                                        </div>
                                    ) : (
                                        <img 
                                            src={currentImage.src} 
                                            alt={currentImage.alt}
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
                                    )}
                                    
                                    {/* Image fallback */}
                                    <div className="emoji-fallback hidden w-full h-full flex items-center justify-center absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
                                        <span className="text-8xl lg:text-9xl">{umkm.image || '🏪'}</span>
                                    </div>

                                    {/* Navigation arrows - HANYA TAMPIL JIKA ADA LEBIH DARI 1 GAMBAR */}
                                    {displayImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : displayImages.length - 1)}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                                            </button>
                                            <button
                                                onClick={() => setSelectedImageIndex(selectedImageIndex < displayImages.length - 1 ? selectedImageIndex + 1 : 0)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5 text-gray-600" />
                                            </button>
                                        </>
                                    )}

                                    {/* Image counter - HANYA TAMPIL JIKA ADA LEBIH DARI 1 GAMBAR */}
                                    {displayImages.length > 1 && (
                                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                            {selectedImageIndex + 1} / {displayImages.length}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Images - HANYA TAMPIL JIKA ADA LEBIH DARI 1 GAMBAR */}
                            {displayImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {displayImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`relative h-20 rounded-lg overflow-hidden ${
                                                selectedImageIndex === index ? 'ring-2 ring-blue-600' : ''
                                            }`}
                                        >
                                            {image.type === 'emoji' ? (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                                                    <span className="text-2xl">{image.src}</span>
                                                </div>
                                            ) : (
                                                <img 
                                                    src={image.src} 
                                                    alt={image.alt}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Side - Info Kontak (1/3 width on desktop) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
                                
                                <div className="space-y-4">
                                    {/* Address */}
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-500">Alamat</p>
                                            <p className="text-gray-900 text-sm">{umkm.address}</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start space-x-3">
                                        <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-500">Telepon</p>
                                            <a 
                                                href={`tel:${umkm.contact}`}
                                                className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
                                            >
                                                {umkm.contact}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    {umkm.email && (
                                        <div className="flex items-start space-x-3">
                                            <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <a 
                                                    href={`mailto:${umkm.email}`}
                                                    className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
                                                >
                                                    {umkm.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Opening Hours - Enhanced with Dropdown */}
                                    <div className="flex items-start space-x-3">
                                        <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-gray-500">Jam Operasional</p>
                                                <button
                                                    onClick={() => setShowAllOpeningHours(!showAllOpeningHours)}
                                                    className="text-xs text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1"
                                                >
                                                    <span>{showAllOpeningHours ? 'Sembunyikan' : 'Lihat Semua'}</span>
                                                    <ChevronRight className={`w-3 h-3 transition-transform ${showAllOpeningHours ? 'rotate-90' : ''}`} />
                                                </button>
                                            </div>
                                            
                                            {!showAllOpeningHours ? (
                                                // Show only today's hours
                                                <div className="mt-1">
                                                    <p className="text-gray-900 text-sm font-medium">
                                                        {getTodayDayName()} - {getTodayOpeningHours()}
                                                    </p>
                                                </div>
                                            ) : (
                                                // Show all days
                                                <div className="mt-2 space-y-2 bg-gray-50 rounded-lg p-3">
                                                    {getAllOpeningHours().map((dayInfo, index) => (
                                                        <div 
                                                            key={index} 
                                                            className={`flex justify-between items-center py-1 px-2 rounded text-sm ${
                                                                dayInfo.isToday ? 'bg-blue-50 border border-blue-200' : ''
                                                            }`}
                                                        >
                                                            <span className={`font-medium ${
                                                                dayInfo.isToday ? 'text-blue-700' : 'text-gray-700'
                                                            }`}>
                                                                {dayInfo.day}
                                                                {dayInfo.isToday && (
                                                                    <span className="ml-1 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
                                                                        Hari ini
                                                                    </span>
                                                                )}
                                                            </span>
                                                            <span className={`${
                                                                dayInfo.isOpen 
                                                                    ? (dayInfo.isToday ? 'text-blue-600 font-medium' : 'text-gray-600') 
                                                                    : 'text-red-500'
                                                            }`}>
                                                                {dayInfo.isOpen 
                                                                    ? `${dayInfo.openTime} - ${dayInfo.closeTime}`
                                                                    : 'Tutup'
                                                                }
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Website */}
                                    {umkm.website && (
                                        <div className="flex items-start space-x-3">
                                            <Globe className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-500">Website</p>
                                                <a 
                                                    href={umkm.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
                                                >
                                                    {umkm.website}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi Section - Full Width */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                        {/* Header Info - Moved from sidebar */}
                        <div className="mb-8 pb-8 border-b border-gray-100">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                {umkm.name}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                Pemilik: <span className="font-medium">{umkm.owner}</span>
                            </p>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-4">
                                {renderStars(umkm.rating)}
                                <span className="text-gray-600">({umkm.rating}/5)</span>
                                {umkm.is_verified && (
                                    <div className="flex items-center space-x-1 text-green-600">
                                        <Verified className="w-4 h-4" />
                                        <span className="text-sm font-medium">Verified</span>
                                    </div>
                                )}
                            </div>

                            {/* Price Range */}
                            {umkm.price_range && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-1">Kisaran Harga</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {umkm.price_range}
                                    </p>
                                </div>
                            )}

                            {/* Category Badge */}
                            <div className="mb-0">
                                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                    {umkm.category}
                                </span>
                            </div>
                        </div>

                        {/* PERBAIKAN: Description dengan format yang lebih baik */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Deskripsi</h2>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                            {formatDescription(umkm.description)}
                        </div>

                        {/* Products */}
                        {umkm.products && umkm.products.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Produk & Layanan</h3>
                                <div className="flex flex-wrap gap-2">
                                    {umkm.products.map((product, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium"
                                        >
                                            {product}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    {showContactForm && (
                        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 contact-form-slide-in">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Kirim Pesan ke {umkm.name}</h3>
                            
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={contactForm.name}
                                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Telepon
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={contactForm.phone}
                                            onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Kunjungan (Opsional)
                                        </label>
                                        <input
                                            type="date"
                                            value={contactForm.visit_date}
                                            onChange={(e) => setContactForm({...contactForm, visit_date: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Waktu Kunjungan (Opsional)
                                        </label>
                                        <input
                                            type="time"
                                            value={contactForm.visit_time}
                                            onChange={(e) => setContactForm({...contactForm, visit_time: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pesan
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                        placeholder="Tuliskan pesan Anda untuk UMKM ini..."
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Kirim Pesan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowContactForm(false)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Tertarik dengan UMKM Section - Full Width */}
                    {related_umkms && related_umkms.length > 0 && (
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Tertarik dengan UMKM Serupa?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {related_umkms.slice(0, 3).map((relatedUmkm) => (
                                    <Link
                                        key={relatedUmkm.id}
                                        href={`/umkm/${relatedUmkm.id}`}
                                        className="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                    >
                                        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-6xl">{relatedUmkm.image}</span>
                                            </div>
                                            {relatedUmkm.is_verified && (
                                                <div className="absolute bottom-3 left-3">
                                                    <div className="flex items-center space-x-1 text-green-600 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span className="text-xs font-medium">Verified</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {relatedUmkm.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">{relatedUmkm.owner}</p>
                                            <div className="flex items-center space-x-1 mb-3">
                                                {renderStars(relatedUmkm.rating)}
                                                <span className="text-xs text-gray-500">({relatedUmkm.rating})</span>
                                            </div>
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {relatedUmkm.category}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <UmkmFooter />
        </>
    );
}