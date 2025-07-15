import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { Plus, X, Clock, Upload, Image as ImageIcon } from 'lucide-react';

interface Props {
    categories: string[];
    defaultOpeningHours: {
        [key: string]: {
            is_open: boolean;
            open_time: string;
            close_time: string;
        };
    };
}

export default function CreateUmkm({ categories, defaultOpeningHours }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        owner: '',
        category: '',
        description: '',
        address: '',
        products: [''],
        contact: '',
        rating: 0,
        image: '🏪',
        price_range: '',
        display_photos: [] as File[],
        menu_photo: null as File | null,
        instagram: '',
        facebook: '',
        opening_hours: defaultOpeningHours,
        is_active: true,
    });

    const [displayPhotosPreviews, setDisplayPhotosPreviews] = useState<string[]>([]);
    const [menuPhotoPreview, setMenuPhotoPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        // Add text fields
        Object.keys(data).forEach(key => {
            if (key === 'display_photos' || key === 'menu_photo') return;
            
            const value = data[key as keyof typeof data];
            if (Array.isArray(value)) {
                if (key === 'products') {
                    value.forEach((item, index) => {
                        formData.append(`${key}[${index}]`, item);
                    });
                } else if (key === 'opening_hours') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, JSON.stringify(value));
                }
            } else if (typeof value === 'boolean') {
                formData.append(key, value ? '1' : '0');
            } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });
        
        // Add display photos
        data.display_photos.forEach((file, index) => {
            formData.append(`display_photos[${index}]`, file);
        });
        
        // Add menu photo
        if (data.menu_photo) {
            formData.append('menu_photo', data.menu_photo);
        }
        
        post(route('admin.umkm.store'), {
            data: formData,
            forceFormData: true,
        });
    };

    const addProduct = () => {
        setData('products', [...data.products, '']);
    };

    const removeProduct = (index: number) => {
        const newProducts = data.products.filter((_, i) => i !== index);
        setData('products', newProducts);
    };

    const updateProduct = (index: number, value: string) => {
        const newProducts = [...data.products];
        newProducts[index] = value;
        setData('products', newProducts);
    };

    const updateOpeningHours = (day: string, field: string, value: boolean | string) => {
        const newOpeningHours = {
            ...data.opening_hours,
            [day]: {
                ...data.opening_hours[day],
                [field]: value
            }
        };
        setData('opening_hours', newOpeningHours);
    };

    const handleDisplayPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const currentPhotos = data.display_photos;
        const totalPhotos = currentPhotos.length + files.length;
        
        if (totalPhotos > 3) {
            alert('Maksimal 3 foto display');
            return;
        }
        
        const newPhotos = [...currentPhotos, ...files];
        setData('display_photos', newPhotos);
        
        // Create previews
        const newPreviews = [...displayPhotosPreviews];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                newPreviews.push(e.target?.result as string);
                setDisplayPhotosPreviews([...newPreviews]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeDisplayPhoto = (index: number) => {
        const newPhotos = data.display_photos.filter((_, i) => i !== index);
        const newPreviews = displayPhotosPreviews.filter((_, i) => i !== index);
        setData('display_photos', newPhotos);
        setDisplayPhotosPreviews(newPreviews);
    };

    const handleMenuPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('menu_photo', file);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setMenuPhotoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeMenuPhoto = () => {
        setData('menu_photo', null);
        setMenuPhotoPreview(null);
    };

    const days = [
        { key: 'senin', label: 'Senin' },
        { key: 'selasa', label: 'Selasa' },
        { key: 'rabu', label: 'Rabu' },
        { key: 'kamis', label: 'Kamis' },
        { key: 'jumat', label: 'Jumat' },
        { key: 'sabtu', label: 'Sabtu' },
        { key: 'minggu', label: 'Minggu' },
    ];

    const emojis = ['🏪', '🍽️', '🐟', '🦐', '🌊', '🧺', '⚒️', '🔧'];

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Head title="Tambah UMKM" />
            
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
                    input[type="time"] {
                        color: #111827 !important;
                    }
                    input[type="number"] {
                        color: #111827 !important;
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
                <main className="flex-1 px-8 py-6 max-w-5xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tambah UMKM Baru</h1>
                        <p className="text-gray-600 mt-1">Lengkapi informasi UMKM untuk ditambahkan ke sistem</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Informasi Dasar</h2>
                                <p className="text-sm text-gray-600 mt-1">Data utama UMKM</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama UMKM *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        placeholder="Contoh: Keripik Rumput Laut Sari Rasa"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Owner */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Pemilik *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.owner}
                                        onChange={(e) => setData('owner', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        placeholder="Contoh: Bu Siti"
                                        required
                                    />
                                    {errors.owner && <p className="text-red-500 text-sm mt-1">{errors.owner}</p>}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori *
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        required
                                    >
                                        <option value="" disabled style={{color: '#9CA3AF'}}>Pilih Kategori</option>
                                        {categories.map(category => (
                                            <option key={category} value={category} style={{color: '#111827'}}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                </div>

                                {/* Image/Emoji */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Icon UMKM * (Wajib - akan digunakan sebagai display jika tidak ada foto)
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {emojis.map(emoji => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => setData('image', emoji)}
                                                className={`text-2xl p-2 rounded-lg border transition-colors ${
                                                    data.image === emoji
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Icon akan digunakan sebagai display utama jika tidak ada foto display yang diupload.
                                    </p>
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                </div>

                                {/* Contact */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kontak *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        placeholder="Contoh: +62 812-3456-7890"
                                        required
                                    />
                                    {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rating (0-5)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={data.rating || ''}
                                        onChange={(e) => setData('rating', parseFloat(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        placeholder="Contoh: 4.5"
                                    />
                                    {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kisaran Harga (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.price_range}
                                        onChange={(e) => setData('price_range', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        placeholder="Contoh: Rp 10.000 - Rp 50.000"
                                    />
                                    {errors.price_range && <p className="text-red-500 text-sm mt-1">{errors.price_range}</p>}
                                    <p className="text-gray-500 text-xs mt-1">
                                        Kosongkan jika tidak ingin menampilkan kisaran harga
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi *
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                    placeholder="Ceritakan tentang UMKM ini, keunggulan, dan hal menarik lainnya..."
                                    required
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            {/* Address */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alamat *
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                    placeholder="Contoh: Jl. Pantai Utara No. 12, Kemujan"
                                    required
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>
                        </div>

                        {/* Products */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Produk</h2>
                                <p className="text-sm text-gray-600 mt-1">Daftar produk yang dijual</p>
                            </div>
                            
                            <div className="space-y-3">
                                {data.products.map((product, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={product}
                                            onChange={(e) => updateProduct(index, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                            placeholder={`Produk ${index + 1}`}
                                            required
                                        />
                                        {data.products.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeProduct(index)}
                                                className="text-red-600 hover:text-red-700 p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                
                                <button
                                    type="button"
                                    onClick={addProduct}
                                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Tambah Produk</span>
                                </button>
                            </div>
                            {errors.products && <p className="text-red-500 text-sm mt-1">{errors.products}</p>}
                        </div>

                        {/* Photos Section */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                    <ImageIcon className="w-5 h-5" />
                                    <span>Foto UMKM</span>
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">Upload foto untuk menampilkan UMKM Anda</p>
                            </div>
                            
                            {/* Display Photos */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Foto Display (Maksimal 3 foto)
                                </label>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    {displayPhotosPreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img 
                                                src={preview} 
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-40 object-cover rounded-lg border border-gray-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeDisplayPhoto(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {data.display_photos.length < 3 && (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleDisplayPhotosChange}
                                                className="hidden"
                                                id="display-photos"
                                            />
                                            <label 
                                                htmlFor="display-photos" 
                                                className="cursor-pointer flex flex-col items-center space-y-2"
                                            >
                                                <Upload className="w-8 h-8 text-gray-400" />
                                                <span className="text-sm text-gray-500">
                                                    Upload foto display
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    JPG, PNG (Max 5MB)
                                                </span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Info Box - Mempertahankan detail asli */}
                                {data.display_photos.length === 0 && (
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-xl">{data.image}</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-blue-900 mb-1">
                                                    Belum ada foto? Gunakan icon sebagai display
                                                </h4>
                                                <p className="text-sm text-blue-700">
                                                    Jika belum memiliki foto UMKM, icon yang dipilih di atas akan digunakan sebagai display utama. 
                                                    Anda dapat menambahkan foto nanti melalui edit UMKM.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {errors.display_photos && (
                                    <p className="text-red-500 text-sm mt-1">{errors.display_photos}</p>
                                )}
                            </div>

                            {/* Menu Photo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Foto Menu/Pricelist (1 foto)
                                </label>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {menuPhotoPreview ? (
                                        <div className="relative">
                                            <img 
                                                src={menuPhotoPreview} 
                                                alt="Menu Preview"
                                                className="w-full h-40 object-cover rounded-lg border border-gray-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeMenuPhoto}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleMenuPhotoChange}
                                                className="hidden"
                                                id="menu-photo"
                                            />
                                            <label 
                                                htmlFor="menu-photo" 
                                                className="cursor-pointer flex flex-col items-center space-y-2"
                                            >
                                                <Upload className="w-8 h-8 text-gray-400" />
                                                <span className="text-sm text-gray-500">
                                                    Upload foto menu/pricelist
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    JPG, PNG (Max 5MB)
                                                </span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                                
                                {errors.menu_photo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.menu_photo}</p>
                                )}
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                    <Clock className="w-5 h-5" />
                                    <span>Jam Buka</span>
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">Atur jam operasional UMKM</p>
                            </div>
                            
                            <div className="space-y-4">
                                {days.map(({ key, label }) => (
                                    <div key={key} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-20">
                                            <span className="text-sm font-medium text-gray-700">{label}</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={data.opening_hours[key]?.is_open || false}
                                                    onChange={(e) => updateOpeningHours(key, 'is_open', e.target.checked)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-600">Buka</span>
                                            </label>
                                            
                                            {data.opening_hours[key]?.is_open && (
                                                <>
                                                    <input
                                                        type="time"
                                                        value={data.opening_hours[key]?.open_time || '08:00'}
                                                        onChange={(e) => updateOpeningHours(key, 'open_time', e.target.value)}
                                                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                                    />
                                                    <span className="text-gray-400">-</span>
                                                    <input
                                                        type="time"
                                                        value={data.opening_hours[key]?.close_time || '17:00'}
                                                        onChange={(e) => updateOpeningHours(key, 'close_time', e.target.value)}
                                                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Media Sosial</h2>
                                <p className="text-sm text-gray-600 mt-1">Link media sosial (opsional)</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Instagram
                                    </label>
                                    <input
                                        type="text"
                                        value={data.instagram}
                                        onChange={(e) => setData('instagram', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        placeholder="@username atau link profil"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Facebook
                                    </label>
                                    <input
                                        type="text"
                                        value={data.facebook}
                                        onChange={(e) => setData('facebook', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                                        placeholder="Nama halaman atau link profil"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200 pb-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">Status UMKM</h2>
                                <p className="text-sm text-gray-600 mt-1">Pengaturan status aktif</p>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <div className="min-w-0">
                                    <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                        UMKM Aktif
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        UMKM yang aktif akan ditampilkan di halaman publik
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan UMKM'}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}