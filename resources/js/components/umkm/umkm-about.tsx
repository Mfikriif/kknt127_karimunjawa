import React from 'react';
import { Anchor, Leaf, MapPin, PlayCircle } from 'lucide-react';

export default function AboutKemujan() {
    return (
        <div className="min-h-screen bg-[rgb(12,52,76)]">
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
                                Masyarakat Desa Kemujan sebagian besar berprofesi sebagai nelayan, petani 
                                rumput laut, dan pelaku usaha pariwisata. Berbagai UMKM berkembang pesat di 
                                desa ini, mulai dari produk olahan seafood, kerajinan khas Karimunjawa, 
                                homestay, hingga jasa wisata bahari.
                            </p>
                            
                            <p>
                                Dengan dukungan pemerintah daerah dan komitmen masyarakat untuk 
                                melestarikan lingkungan, Desa Kemujan terus mengembangkan ekonomi 
                                berkelanjutan yang bersinergi dengan konservasi alam.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="mt-12 space-y-4">
                            <div className="flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">
                                <div className="w-12 h-12 bg-[#64FFDA]/20 rounded-lg flex items-center justify-center">
                                    <Anchor className="w-6 h-6 text-[#64FFDA]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Wisata Bahari & Diving</h3>
                                    <p className="text-gray-300 text-sm">Eksplorasi keindahan bawah laut Karimunjawa</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">
                                <div className="w-12 h-12 bg-[#64FFDA]/20 rounded-lg flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-[#64FFDA]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Budidaya Rumput Laut</h3>
                                    <p className="text-gray-300 text-sm">Inovasi teknologi budidaya berkelanjutan</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">                            
                                <div className="w-12 h-12 bg-[#64FFDA]/20 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-[#64FFDA]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Destinasi Eco-Tourism</h3>
                                    <p className="text-gray-300 text-sm">Pariwisata ramah lingkungan dan berkelanjutan</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Video & Downloads */}
                    <div className="space-y-8">
                        
                        {/* Video UMKM Section */}
                        <div className="group relative transform overflow-hidden rounded-2xl border border-white/30 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.02] hover:border-[#64FFDA]/50 hover:shadow-[#64FFDA]/20 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">
                            <h3 className="relative z-10 text-2xl font-bold text-white mb-6 flex items-center transition-all duration-300 group-hover:text-[#64FFDA]">
                                <PlayCircle className="w-8 h-8 text-[#64FFDA] mr-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                Video UMKM Kemujan
                            </h3>
                            
                            {/* YouTube Video Embed */}
                            <div className="relative z-10 w-full h-80 rounded-xl overflow-hidden mb-6 border border-white/20 transition-all duration-300 group-hover:border-[#64FFDA]/30 group-hover:shadow-lg group-hover:shadow-[#64FFDA]/10">
                                <iframe
                                    className="absolute inset-0 w-full h-full transition-all duration-300"
                                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
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

                        {/* Google Maps Container - UPDATED */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Google Maps Embed */}
                            <div className="relative h-80">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}