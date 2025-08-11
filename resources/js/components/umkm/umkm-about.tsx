import React, { useState } from 'react';
import { MapPin, PlayCircle, Link, ChevronDown, X, ZoomIn, Download } from 'lucide-react';

export default function AboutKemujan() {
    // State untuk modal popup
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    const openMapModal = () => setIsMapModalOpen(true);
    const closeMapModal = () => setIsMapModalOpen(false);

    return (
        <section id="about" className="min-h-screen bg-[rgb(12,52,76)]">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    
                    {/* Left Content */}
                    <div className="text-white">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Tentang Desa <span className="text-[#64FFDA]">Kemujan</span>
                            </h1>
                        </div>

                        <div className="space-y-6 text-lg leading-relaxed text-gray-200">
                            <p>
                                Desa Kemujan merupakan salah satu desa di Kepulauan Karimunjawa, 
                                Kabupaten Jepara, Jawa Tengah. Sebagai bagian dari Taman Nasional 
                                Karimunjawa, desa ini memiliki potensi wisata bahari yang luar biasa dengan 
                                keindahan pantai, terumbu karang, dan kekayaan laut yang melimpah.
                            </p>
                            
                            <p>
                                Masyarakat Desa Kemujan sebagian besar berprofesi sebagai nelayan dan 
                                petani rumput laut. Dengan potensi sumber daya alam yang melimpah, 
                                berbagai Usaha Mikro, Kecil, dan Menengah (UMKM) berkembang pesat 
                                di desa ini.
                            </p>

                            <p>
                                UMKM di Desa Kemujan sangat beragam, mulai dari pengolahan hasil laut 
                                seperti ikan asin, kerupuk ikan, dan dodol rumput laut. Terdapat juga 
                                UMKM kerajinan khas Karimunjawa, homestay untuk wisatawan, serta 
                                jasa wisata bahari yang memanfaatkan keindahan alam sekitar.
                            </p>

                            <p>
                                Dengan dukungan program pemberdayaan masyarakat dan komitmen untuk 
                                ekonomi berkelanjutan, UMKM Desa Kemujan terus berkembang menjadi 
                                tulang punggung perekonomian selain Budidaya Ikan & Rumput Lautnya.
                            </p>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="relative z-10 w-full h-80 rounded-xl overflow-hidden border border-white/20 transition-all duration-300 group-hover:border-[#64FFDA]/30 group-hover:shadow-lg group-hover:shadow-[#64FFDA]/10 mt-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d34450.44805372992!2d110.46370367371266!3d-5.798838515507821!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e710d247285d9d1%3A0xf1344cb6f1b9d391!2sKemujan%2C%20Karimunjawa%2C%20Jepara%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1751488321918!5m2!1sen!2sid"
                                width="100%"
                                height="320"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                                title="Lokasi Desa Kemujan, Karimunjawa"
                            ></iframe>
                        </div>
                                
                        <p className="relative z-10 text-gray-300 text-sm mt-4 transition-all duration-300 group-hover:text-gray-200">
                            Desa Kemujan adalah salah satu desa terbesar yang terletak di Kepulauan Karimunjawa, dapat diakses melalui jalur laut dari Pelabuhan Kartini Jepara
                        </p>
                    </div>

                    {/* Right Content - Video & Map */}
                    <div className="space-y-8">
                        
                        {/* Video UMKM Section */}
                        <div className="group relative transform overflow-hidden rounded-2xl border border-white/30 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.02] hover:border-[#64FFDA]/50 hover:shadow-[#64FFDA]/20 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">
                            <h3 className="relative z-10 text-2xl font-bold text-white mb-6 flex items-center transition-all duration-300 group-hover:text-[#64FFDA]">
                                <PlayCircle className="w-8 h-8 text-[#64FFDA] mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-90" />
                                Video UMKM Kemujan
                            </h3>
                            
                            {/* YouTube Video Embed */}
                            <div className="relative z-10 w-full h-80 rounded-xl overflow-hidden mb-6 border border-white/20 transition-all duration-300 group-hover:border-[#64FFDA]/30 group-hover:shadow-lg group-hover:shadow-[#64FFDA]/10">
                                <iframe
                                    className="absolute inset-0 w-full h-full transition-all duration-300"
                                    src="https://www.youtube.com/embed/bSYogAFBiTc?si=6EGtSVN3JSGDCB3b"
                                    title="UMKM Desa Kemujan"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            
                            <p className="relative z-10 text-gray-300 text-sm transition-all duration-300 group-hover:text-gray-200">
                                Saksikan profil lengkap UMKM dan potensi ekonomi kreatif di Desa Kemujan, Karimunjawa
                            </p>
                        </div>

                        {/* UMKM Distribution Map - Tambah onClick dan cursor-pointer */}
                        <div 
                            onClick={openMapModal}
                            className="group relative transform overflow-hidden rounded-2xl border border-white/30 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.02] hover:border-[#64FFDA]/50 hover:shadow-[#64FFDA]/20 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100 cursor-pointer">    
                            <h3 className="relative z-10 text-2xl font-bold text-white mb-6 flex items-center transition-all duration-300 group-hover:text-[#64FFDA]">
                                <MapPin className="w-8 h-8 text-[#64FFDA] mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                Peta Persebaran UMKM
                            </h3>

                            {/* Map Image - Same height as video for alignment */}
                            <div className="relative z-10 w-full h-80 rounded-xl overflow-hidden mb-6 border border-white/20 transition-all duration-300 group-hover:border-[#64FFDA]/30 group-hover:shadow-lg group-hover:shadow-[#64FFDA]/10 bg-gray-800 flex items-center justify-center">
                                <img 
                                    src="/imageassets/PetaLokasiPersebaranUMKMDesaKemujan.jpg" 
                                    alt="Peta Persebaran UMKM Desa Kemujan" 
                                    className="max-w-full max-h-full object-contain transition-all duration-300"
                                />
                                
                                {/* Zoom indicator overlay - Tambahan untuk UX */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                        <div className="bg-[#64FFDA] text-[rgb(12,52,76)] px-4 py-2 rounded-lg font-semibold text-sm flex items-center space-x-2 shadow-lg">
                                            <ZoomIn className="w-4 h-4" />
                                            <span>Klik untuk Perbesar</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                            <p className="relative z-10 text-gray-300 text-sm transition-all duration-300 group-hover:text-gray-200">
                                Lihat lokasi dan persebaran UMKM unggulan di Desa Kemujan, Karimunjawa untuk mendukung ekonomi lokal
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Modal Popup - Tambahan Komponen Modal */}
            {isMapModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-53 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300">
                        
                        {/* Modal Header */}
                        <div className="bg-[rgb(12,52,76)] px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-6 h-6 text-[#64FFDA]" />
                                <h3 className="text-xl font-bold text-white">Peta Persebaran UMKM Desa Kemujan</h3>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = '/imageassets/PetaLokasiPersebaranUMKMDesaKemujan.jpg';
                                        link.download = 'Peta-UMKM-Kemujan.jpg';
                                        link.click();
                                    }}
                                    className="p-2 text-[#64FFDA] hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                    title="Download Peta"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={closeMapModal}
                                    className="p-2 text-white hover:text-[#64FFDA] hover:bg-white/10 rounded-lg transition-all duration-200"
                                    title="Tutup"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content - Map Image */}
                        <div className="p-6 bg-gray-100 max-h-[calc(90vh-80px)] overflow-auto">
                            <div className="flex items-center justify-center">
                                <img 
                                    src="/imageassets/PetaLokasiPersebaranUMKMDesaKemujan.jpg" 
                                    alt="Peta Persebaran UMKM Desa Kemujan" 
                                    className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <p>Peta Lokasi UMKM Desa Kemujan, Kec. Karimunjawa, Kab. Jepara</p>
                                <p>Tim KKN Tematik 127 Fase 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyboard Navigation - ESC to close modal */}
            {isMapModalOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            closeMapModal();
                        }
                    }}
                    tabIndex={0}
                />
                
            )}
        </section>
    );
}