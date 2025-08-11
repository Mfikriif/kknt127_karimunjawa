import { Head } from '@inertiajs/react';
import { Users, GraduationCap, Building2, FileText, Globe, BarChart3, Scale, Video, Handshake, Target, Lightbulb, Clock, MapPin, Calendar, ChevronRight, ExternalLink, ArrowRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import UmkmNavbar from '@/components/umkm/UmkmNavbar';
import UmkmFooter from '@/components/umkm/umkm-footer';

// Data Program Kerja Monodisiplin (10 proker mahasiswa)
const programMonodisiplinData = [
    {
        nama: "LEILA VITA RASENDRIYA",
        prodi: "Psikologi",
        fakultas: "Psikologi",
        kegiatan: "Pengukuran Efektivitas Kegiatan UMKM terhadap Motivasi dan Kesiapan Psikologis Warga dalam Berwirausaha",
        deskripsi: "Mengukur seberapa efektif kegiatan pengembangan UMKM yang telah dijalankan di desa dengan melihat dampaknya terhadap kesiapan, motivasi, dan sikap warga dalam berwirausaha. Program ini menggunakan metode survei dan wawancara mendalam untuk mendapatkan data yang komprehensif mengenai perubahan mindset dan kesiapan masyarakat dalam berwirausaha setelah mengikuti program pemberdayaan UMKM.",
        icon: <BarChart3 className="w-6 h-6" />,
        kategori: "Evaluasi & Penelitian",
        tanggal: "7 Juli 2025",
        techStack: ["SPSS", "Survei", "Analisis Data", "Psikologi"],
        outcomes: ["Laporan efektivitas program", "Data statistik motivasi warga", "Rekomendasi pengembangan"]
    },
    {
        nama: "PRAMESTY SANGGITA CAHYANI",
        prodi: "Ilmu Pemerintahan",
        fakultas: "FISIP",
        kegiatan: "Menciptakan Kolaborasi kaitannya pada Layanan Publik untuk UMKM dengan Kelurahan/Desa",
        deskripsi: "Mengajak Pemerintah Desa untuk ikut andil menyukseskan Expo sebagai bentuk reaksi mendukung peningkatan pemberdayaan Masyarakat Peningkatan UMKM. Program ini akan memfasilitasi dialog antara UMKM dan pemerintah desa untuk menciptakan sinergi dalam pengembangan ekonomi lokal dan memudahkan akses terhadap layanan publik yang dibutuhkan UMKM.",
        icon: <Handshake className="w-6 h-6" />,
        kategori: "Kolaborasi Pemerintah",
        tanggal: "7 Juli 2025",
        techStack: ["Public Service", "Government", "Collaboration", "Policy"],
        outcomes: ["MOU kolaborasi", "SOP layanan UMKM", "Program kemitraan"]
    },
    
    {
        nama: "MUHAMMAD NAJWAN ABIDZHAAR",
        prodi: "Agribisnis", 
        fakultas: "FPP",
        kegiatan: "Sosialisasi Pentingnya UMKM dalam Masyarakat",
        deskripsi: "Memberikan penyuluhan terkait dampak positif dari adanya UMKM terhadap masyarakat sekitar dengan harapan untuk meningkatkan minat masyarakat dalam berUMKM. Sosialisasi ini akan membahas manfaat ekonomi, sosial, dan lingkungan dari pengembangan UMKM lokal, serta memberikan motivasi kepada masyarakat untuk memulai usaha berbasis potensi desa.",
        icon: <Users className="w-6 h-6" />,
        kategori: "Sosialisasi & Edukasi",
        tanggal: "12 Juli 2025",
        techStack: ["Presentasi", "Workshop", "Community", "Agribisnis"],
        outcomes: ["Modul sosialisasi", "Video dokumentasi", "Feedback peserta"]
    },
    {
        nama: "REVINDA ARADEA ADAT",
        prodi: "Perikanan Tangkap",
        fakultas: "FPIK",
        kegiatan: "BMC IDE LAUT: Menyelam ke Ide, Naik dengan Bisnis",
        deskripsi: "Pelatihan kepada pelaku UMKM agar mampu memahami dan menggunakan kerangka Business Model Canvas (BMC) untuk mengembangkan usahanya. Memberikan pemahaman dasar tentang konsep BMC, melatih pelaku UMKM mengisi komponen-komponen BMC sesuai dengan karakteristik usaha masing-masing, dan mendorong pengembangan UMKM secara lebih strategis dan berorientasi pasar.",
        icon: <FileText className="w-6 h-6" />,
        kategori: "Model Bisnis",
        tanggal: "12 Juli 2025",
        techStack: ["Business Model Canvas", "Training", "Strategy", "Maritime"],
        outcomes: ["Template BMC", "Panduan pengisian", "BMC UMKM peserta"]
    },

    {
        nama: "RIANZA ALGHIFARI",
        prodi: "Hukum",
        fakultas: "FH",
        kegiatan: "Pendampingan Legalitas UMKM: Mewujudkan Usaha Mikro yang Tertib Hukum dan Berdaya Saing",
        deskripsi: "Program kerja yang bertujuan untuk membantu pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) dalam memperoleh legalitas usahanya dengan penerbitan Nomor Induk Berusaha (NIB) melalui sistem Online Single Submission sehingga program ini hadir untuk memberikan pendampingan secara langsung dan praktis kepada para pelaku UMKM.",
        icon: <Scale className="w-6 h-6" />,
        kategori: "Legalitas & Hukum",
        tanggal: "12 Juli 2025",
        techStack: ["Legal", "NIB", "OSS", "Business Law"],
        outcomes: ["Panduan legalitas", "Daftar NIB yang diperoleh", "Template dokumen"]
    },
    {
        nama: "NAOMI KRISTI",
        prodi: "Akuntansi Perpajakan",
        fakultas: "SV",
        kegiatan: "Sosialisasi Brand Lokal: Mengenal dan Mendukung Produk Rumput Laut",
        deskripsi: "Proker Sosialisasi Brand Lokal dengan menjelaskan sejarah dan visi brand, jenis produk, proses produksi, dan demo produk (product testing) ini akan membantu menguatkan branding dari produk UMKM sehingga diharapkan produk tersebut memiliki nilai jual dan daya saing di pasar lokal. Program ini juga akan mengajarkan teknik packaging dan marketing yang menarik.",
        icon: <Target className="w-6 h-6" />,
        kategori: "Branding & Pemasaran",
        tanggal: "12 Juli 2025",
        techStack: ["Branding", "Marketing", "Product Testing", "Packaging"],
        outcomes: ["Brand guideline", "Desain packaging", "Strategi pemasaran"]
    },
    {
        nama: "NARESWARI INEZ INDRIANI",
        prodi: "Administrasi Publik",
        fakultas: "FISIP",
        kegiatan: "UMKM Cerdas, Usaha Berkualitas",
        deskripsi: "Bertujuan untuk meningkatkan kapasitas manajerial kelompok UMKM melalui pelatihan penyusunan rencana usaha sederhana, pencatatan keuangan, dan strategi pemasaran. Pendekatan partisipatif digunakan agar nelayan dapat mengelola usaha secara berkelanjutan dan adaptif terhadap inovasi teknologi. Program ini akan memberikan tools praktis untuk pengelolaan bisnis yang efektif.",
        icon: <Lightbulb className="w-6 h-6" />,
        kategori: "Manajemen & Strategi",
        tanggal: "12 Juli 2025",
        techStack: ["Management", "Financial", "Strategy", "Business Plan"],
        outcomes: ["Template rencana usaha", "Sistem pencatatan keuangan", "Modul pelatihan"]
    },
{
        nama: "RADITYA WISNU CAHYO NUGROHO",
        prodi: "Teknik Komputer",
        fakultas: "FT",
        kegiatan: "Kemujan UMKM Hub: Pengembangan Website Pusat Informasi dan Edukasi UMKM",
        deskripsi: "Optimalisasi website sebagai platform utama dalam memperkenalkan UMKM Desa Kemujan secara digital kepada masyarakat luas. Website ini akan menjadi etalase online yang menampilkan daftar UMKM aktif di desa, lengkap dengan profil usaha, jenis produk atau layanan yang ditawarkan, foto pendukung berkualitas, lokasi, serta informasi kontak yang langsung terhubung ke media sosial pemilik usaha.",
        icon: <Globe className="w-6 h-6" />,
        kategori: "Teknologi & Digital",
        tanggal: "Juni - 11 Juli 2025",
        techStack: ["React", "Laravel", "MySQL", "Tailwind CSS"],
        outcomes: ["Website UMKM Hub", "Database UMKM", "Admin dashboard"]
    },
    {
        nama: "MUHAMMAD TONDI NASUTION",
        prodi: "Akuakultur",
        fakultas: "FPIK", 
        kegiatan: "Langkah Awal: Edukasi Dasar Pembentukan Usaha Mikro",
        deskripsi: "Sosialisasi tentang bagaimana cara membentuk suatu usaha mikro kepada masyarakat agar dapat membentuk usahanya sendiri. Program ini menjelaskan kepada masyarakat mengenai pemahaman tentang dasar UMKM, membantu masyarakat memahami prosedur pembentukan UMKM mulai dari penstrukturan organisasi, pembuatan NIB, pemilihan target pasar, dan mendorong terbentuknya UMKM baru berbasis potensi lokal.",
        icon: <GraduationCap className="w-6 h-6" />,
        kategori: "Edukasi & Pelatihan",
        tanggal: "12 Juli 2025",
        techStack: ["Pelatihan", "Akuakultur", "Business Plan", "NIB"],
        outcomes: ["Panduan pembentukan usaha", "Template business plan", "Daftar UMKM baru"]
    },
    {
        nama: "WISNU GALANG NUR FAJAR",
        prodi: "Informasi dan Humas",
        fakultas: "SV",
        kegiatan: "Company Profile UMKM",
        deskripsi: "Video dokumentasi terkait UMKM, berisi tentang UMKM dan cerita dari pelaku UMKM untuk meningkatkan awareness dan branding. Program ini akan menghasilkan konten visual yang menarik untuk mempromosikan UMKM Desa Kemujan melalui storytelling yang kuat dan dokumentasi visual berkualitas tinggi yang dapat digunakan untuk media promosi dan edukasi.",
        icon: <Video className="w-6 h-6" />,
        kategori: "Dokumentasi & Media",
        tanggal: "4 - 13 Juli 2025",
        techStack: ["Video Production", "Storytelling", "Documentation", "Media"],
        outcomes: ["Video company profile", "Foto dokumentasi", "Konten media sosial"]
    }
];

type ProgramCardProps = {
    program: any;
    index: number;
};

function ProgramCard({ program, index }: ProgramCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const colorThemes = [
        {
            gradient: 'from-[rgb(12,52,76)] to-blue-800',
            accent: 'rgb(12,52,76)',
            light: 'bg-blue-50',
            border: 'border-blue-200'
        },
        {
            gradient: 'from-green-400 to-green-700',
            accent: 'green',
            light: 'bg-green-50',
            border: 'border-green-200'
        },
        {
            gradient: 'from-orange-500 to-orange-600',
            accent: '#f97316',
            light: 'bg-orange-50',
            border: 'border-orange-200'
        }
    ];
    
    const theme = colorThemes[index % 3];
    
    // Background images untuk setiap mahasiswa 
    const getBackgroundImage = (nama: string) => {
        const imageMap: Record<string, string> = {
            "RADITYA WISNU CAHYO NUGROHO": "/imageassets/fase4buktiprokerwisnu.png",
            "PRAMESTY SANGGITA CAHYANI": "/imageassets/fase4buktiprokerpramesty.jpg", 
            "LEILA VITA RASENDRIYA": "/imageassets/fase4buktiprokerleila.png",
            "MUHAMMAD NAJWAN ABIDZHAAR": "/imageassets/fase4buktiprokernajwanabidzhaar.png",
            "REVINDA ARADEA ADAT": "/imageassets/fase4buktiprokerrere.png",
            "MUHAMMAD TONDI NASUTION": "/imageassets/fase4buktiprokerMuhammadTondiNasution.jpg",
            "RIANZA ALGHIFARI": "/imageassets/fase4buktiprokerRianza.jpg", 
            "NAOMI KRISTI": "/imageassets/fase4buktiprokernaomi.jpg",
            "NARESWARI INEZ INDRIANI": "/imageassets/fase4buktiprokernareswari.png",
            "WISNU GALANG NUR FAJAR": "/imageassets/fase4buktiprokerWisnuGalang.png"
        };
        
        return imageMap[nama] || "/imageassets/prokerbg.jpg"; // fallback
    };
    
    return (
        <div className={`bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-500 ${
            isExpanded ? 'shadow-2xl' : 'shadow-sm hover:shadow-lg'
        }`}>
            <div className={`grid ${index % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-0`}>
                {/* Image Section - Semua menggunakan background image */}
                <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'} relative h-64 md:h-auto min-h-[300px] overflow-hidden`}>
                    <div 
                        className="h-full min-h-[300px] relative bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `linear-gradient(rgba(12, 52, 76, 0.7), rgba(12, 52, 76, 0.5)), url('${getBackgroundImage(program.nama)}')`
                        }}
                    >
                        {/* Content Overlay untuk semua mahasiswa */}
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                            <div className="text-center text-white">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                    {program.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 line-clamp-2">{program.kegiatan}</h3>
                                <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    {program.kategori}
                                </span>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            <span className="bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full text-white font-medium">
                                #{String(index + 1).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>


                {/* Content Section */}
                <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'} p-8`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold`}>
                            {program.nama.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{program.nama}</h4>
                            <p className="text-sm font-medium" style={{ color: theme.accent }}>{program.prodi}</p>
                            <p className="text-gray-500 text-xs">{program.fakultas}</p>
                        </div>
                    </div>

                    <p className={`text-gray-600 leading-relaxed mb-6 ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {program.deskripsi}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{program.tanggal}</span>
                        </div>
                        
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`group relative overflow-hidden backdrop-blur-sm border transition-all duration-300 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg ${theme.border}`}
                            style={{ 
                                color: theme.accent,
                                backgroundColor: `${theme.accent}10`
                            }}
                        >
                            <span>{isExpanded ? 'Tutup Detail' : 'Lihat Detail'}</span>
                            <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                        <div className="border-t border-gray-100 pt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                            <div>
                                <h5 className="font-semibold text-gray-900 mb-3">Tech Stack & Tools</h5>
                                <div className="flex flex-wrap gap-2">
                                    {program.techStack.map((tech: string, idx: number) => (
                                        <span 
                                            key={idx} 
                                            className={`text-xs px-3 py-1 rounded-full ${theme.light}`}
                                            style={{ color: theme.accent }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h5 className="font-semibold text-gray-900 mb-3">Outcome & Deliverables</h5>
                                <div className="space-y-2">
                                    {program.outcomes.map((outcome: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                                            <span className="text-sm text-gray-600">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button 
                                    onClick={() => window.open('https://drive.google.com/drive/folders/1tdvRXBcOGRU63-T6jRpcYU4XRJxDP6iX?usp=sharing', '_blank')}
                                    className={`flex-1 group relative overflow-hidden border transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 rounded-lg ${theme.border}`}
                                    style={{ color: theme.accent }}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Lihat Lebih Lanjut</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProgramKerja() {
    const [selectedTab, setSelectedTab] = useState("multi");
    const [showDetailCard, setShowDetailCard] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    // Parallax effect handler
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

        return (
        <>
            <Head title="Program Kerja - KEMILAU 2025" />
            
            <UmkmNavbar activeMenu="program-kerja" />
            
            <div className="min-h-screen bg-gray-50">
                
                {/* Hero Section with Parallax Effect */}
                <section id="hero" className="relative min-h-screen bg-[rgb(12,52,76)] overflow-hidden pt-20 pb-4">
                    <div className="relative m-4">
                        <div className="relative rounded-3xl overflow-hidden min-h-[calc(100vh-8rem)]">
                            {/* Parallax Background */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url("/imageassets/prokerbg.jpg")`,
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

                            {/* Content Container */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="container mx-auto px-4 sm:px-8 py-8 sm:py-16">
                                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                                        <div 
                                            className="text-white pb-48 sm:pb-20 lg:pb-0 max-w-sm sm:max-w-none"
                                            style={{
                                                transform: `translateY(${scrollY * 0.2}px)`,
                                            }}
                                        >
                                            <div className="mb-3 sm:mb-6">
                                                <span className="text-[#64FFDA] text-xs sm:text-lg font-medium">
                                                    KKN Multidisiplin Kelompok 4
                                                </span>
                                            </div>
                            
                            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-8">
                                KEMILAU<br />
                                <span className="text-[#64FFDA]">2025</span>
                            </h1>
                            
                            <h2 className="text-base sm:text-xl lg:text-2xl font-medium mb-2 sm:mb-4 text-gray-200">
                                Kemujan Mini Expo Lokal
                            </h2>
                            
                            <p className="text-sm sm:text-lg text-gray-300 mb-4 sm:mb-8 leading-relaxed">
                                Angkat UMKM - Dari Laut Untuk Rakyat
                            </p>
                            
                            <div className="flex flex-row gap-3 sm:gap-4 mb-3 sm:mb-8">
                                <button 
                                    onClick={() => {
                                        const element = document.getElementById('navigation');
                                        if (element) {
                                            element.scrollIntoView({ 
                                                behavior: 'smooth',
                                                block: 'start' 
                                            });
                                        }
                                    }}
                                    className="group relative inline-flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-3 sm:px-6 py-2 sm:py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:border-[#64FFDA] hover:shadow-[#64FFDA]/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100 cursor-pointer"
                                >
                                    <span className="text-xs sm:text-base">Lihat Program Kerja</span>
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>11 Juli 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Desa Kemujan, Karimunjawa</span>
                                </div>
                            </div>
                        </div>                                  
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Statistics Card - Ultra responsive untuk semua layar */}
    <div className="absolute bottom-0 right-0 bg-[rgb(12,52,76)] 
        rounded-tl-2xl sm:rounded-tl-3xl 
        overflow-hidden z-50">
        <div className="relative z-10 p-1.5 sm:p-2 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-10 text-center 
                w-full md:min-w-[480px] 
                min-w-[140px] sm:min-w-[200px]">
                
                <div className="group hover:transform hover:scale-105 transition-all duration-300 py-1 sm:py-2 md:py-0 px-1 sm:px-2 md:px-0">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] bg-clip-text text-transparent mb-1 sm:mb-2 md:mb-3">
                        11
                    </div>
                    <div className="text-xs sm:text-sm md:text-sm text-white leading-tight font-medium">
                        Program Kerja<br />
                        Fase 4
                    </div>
                    <div className="w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] rounded-full mx-auto mt-1 sm:mt-2 md:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="group hover:transform hover:scale-105 transition-all duration-300 py-1 sm:py-2 md:py-0 px-1 sm:px-2 md:px-0">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] bg-clip-text text-transparent mb-1 sm:mb-2 md:mb-3">
                        10
                    </div>
                    <div className="text-xs sm:text-sm md:text-sm text-white leading-tight font-medium">
                        Fakultas & Program <br />
                        Studi Terlibat
                    </div>
                    <div className="w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] rounded-full mx-auto mt-1 sm:mt-2 md:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="group hover:transform hover:scale-105 transition-all duration-300 py-1 sm:py-2 md:py-0 px-1 sm:px-2 md:px-0">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] bg-clip-text text-transparent mb-1 sm:mb-2 md:mb-3">
                        10
                    </div>
                    <div className="text-xs sm:text-sm md:text-sm text-white leading-tight font-medium">
                        Hari Pelaksanaan<br />
                        Program KKN
                    </div>
                    <div className="w-6 sm:w-8 md:w-10 h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-[#1B9C85] to-[#4DD0E1] rounded-full mx-auto mt-1 sm:mt-2 md:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            </div>
        </div>
    </div>
</section>

                {/* Navigation Section */}
                <section id="navigation" className="bg-white sticky top-0 z-10">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center py-4">
                            <div className="flex rounded-lg bg-gray-100 p-1">
                                <button
                                    onClick={() => setSelectedTab("multi")}
                                    className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                                        selectedTab === "multi"
                                            ? "bg-[rgb(12,52,76)] text-white shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    Program Kerja Multidisiplin
                                </button>
                                <button
                                    onClick={() => setSelectedTab("mono")}
                                    className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                                        selectedTab === "mono"
                                            ? "bg-[rgb(12,52,76)] text-white shadow-sm"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    Program Kerja Monodisiplin
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program Kerja Multidisiplin Section */}
{selectedTab === "multi" && (
    <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
            {/* KEMILAU Card & Detail Card Container */}
            <div className="max-w-full mx-auto">
                
                {/* Desktop Layout: Side by Side (>=768px) */}
                <div className="hidden md:flex md:gap-8 md:items-start">
                    {/* KEMILAU Card - Desktop */}
                    <div className={`bg-gradient-to-b from-[rgb(12,52,76)] to-[#64FFDA] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
                        showDetailCard ? 'md:w-1/2' : 'md:w-full'
                    }`}>
                        <div className="p-8 md:p-12">
                            {/* Header Content */}
                            <div className="text-center text-white mb-12">
                                <h3 className="text-3xl md:text-5xl font-bold mb-4">
                                    KEMILAU • Program Kerja • Expo UMKM
                                </h3>
                                <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                                    Program kerja multidisiplin yang mengintegrasikan seluruh keahlian dari berbagai fakultas 
                                    untuk menciptakan expo UMKM terbesar di Desa Kemujan melalui kolaborasi tim yang solid.
                                </p>
                            </div>

                            {/* Mockup Section */}
                            <div className="flex justify-center items-center">
                                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
                                    
                                    {/* Card 1 - Program Overview */}
                                    <div className="transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
                                        <div className="bg-white rounded-2xl p-6 shadow-xl w-72 h-96">
                                            <div className="text-center mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-2xl">🎯</span>
                                                </div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">Program Overview</h4>
                                                <p className="text-sm text-gray-600">KEMILAU 2025</p>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-700">Target UMKM</span>
                                                    <span className="text-[rgb(12,52,76)] font-bold">20+</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-700">Produk Display</span>
                                                    <span className="text-[rgb(12,52,76)] font-bold">6+</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-700">Target Pengunjung</span>
                                                    <span className="text-[rgb(12,52,76)] font-bold">40+</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2 - Timeline & Schedule */}
                                    <div className="transform rotate-[2deg] hover:rotate-0 transition-transform duration-300">
                                        <div className="bg-white rounded-2xl p-6 shadow-xl w-72 h-96">
                                            <div className="text-center mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-2xl">📆</span>
                                                </div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">Timeline</h4>
                                                <p className="text-sm text-gray-600">Jadwal Pelaksanaan</p>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="p-3 border-l-4 border-orange-400 bg-gray-50 rounded-r-lg">
                                                    <div className="font-semibold text-gray-900 text-sm">Persiapan</div>
                                                    <div className="text-xs text-gray-600">5-11 Juli 2025</div>
                                                    <div className="text-xs text-orange-500 font-medium mt-1">Persiapan Materi & Produk</div>
                                                </div>
                                                <div className="p-3 border-l-4 border-green-400 bg-gray-50 rounded-r-lg">
                                                    <div className="font-semibold text-gray-900 text-sm">Expo Day</div>
                                                    <div className="text-xs text-gray-600">12 Juli 2025</div>
                                                    <div className="text-xs text-green-500 font-medium mt-1">10:00 - 13:00 WIB</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 3 - Location & Contact */}
                                    <div className="transform rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
                                        <div className="bg-white rounded-2xl p-6 shadow-xl w-72 h-96">
                                            <div className="text-center mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-2xl">📍</span>
                                                </div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">Lokasi & Info</h4>
                                                <p className="text-sm text-gray-600">Desa Kemujan</p>
                                            </div>
                                            
                                            <div className="space-y-4">
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Users className="w-4 h-4 text-[rgb(12,52,76)]" />
                                                        <span className="font-semibold text-gray-900 text-sm">Tim Pelaksana</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600">
                                                        10 Mahasiswa KKN Kelompok 4<br />
                                                        10 Program Studi & Fakultas Berbeda
                                                    </p>
                                                </div>
                                                
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Building2 className="w-4 h-4 text-[rgb(12,52,76)]" />
                                                        <span className="font-semibold text-gray-900 text-sm">Venue</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600">
                                                        Balai Desa Kemujan &<br />
                                                        Area Sekitar Desa
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom CTA */}
                            <div className="text-center mt-12">
                                <button 
                                    onClick={() => setShowDetailCard(!showDetailCard)}
                                    className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-[rgb(12,52,76)]/20 text-[rgb(12,52,76)]/80 px-8 py-4 rounded-xl hover:bg-white hover:text-[rgb(12,52,76)] transition-all duration-300 font-semibold text-lg inline-flex items-center gap-3"
                                >
                                    <span>{showDetailCard ? 'Tutup Detail Program KEMILAU' : 'Lihat Detail Program KEMILAU'}</span>
                                    <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${showDetailCard ? 'rotate-180' : ''}`} />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Detail Card - Desktop (Side by Side) */}
                    {showDetailCard && (
                        <div className="md:w-1/2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-right-5 duration-500">
                            <div className="p-8">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Detail Program KEMILAU</h3>
                                        <p className="text-gray-600">Kemujan Mini Expo Lokal 2025</p>
                                    </div>
                                    <button
                                        onClick={() => setShowDetailCard(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                {/* Program Description */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Deskripsi Program</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            KEMILAU (Kemujan Mini Expo Lokal) merupakan program kerja multidisiplin yang mengintegrasikan 
                                            seluruh keahlian dari berbagai fakultas untuk menciptakan expo UMKM terbesar di Desa Kemujan. 
                                            Program ini bertujuan untuk mengangkat potensi UMKM lokal dengan tema "Dari Laut Untuk Rakyat".
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Rundown Acara KEMILAU</h4>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div className="text-sm font-medium text-gray-600 mb-3">12 Juli 2025 - Balai Desa Kemujan</div>
                                            <div className="space-y-3">
                                                
                                                {/* Registrasi */}
                                                <div className="flex gap-4 py-2">
                                                    <div className="w-20 text-sm font-medium text-[rgb(12,52,76)]">09.30-10.00</div>
                                                    <div className="flex-1 text-sm text-gray-700 font-medium">Registrasi Peserta</div>
                                                </div>

                                                {/* Pembukaan */}
                                                <div className="flex gap-4 py-2">
                                                    <div className="w-20 text-sm font-medium text-[rgb(12,52,76)]">10.00-10.40</div>
                                                    <div className="flex-1 text-sm text-gray-700">
                                                        <div className="font-medium">Pembukaan</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Sambutan Ketua Tim KKN, Mitra IDBU, DPL & Kepala Desa
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Penyerahan */}
                                                <div className="flex gap-4 py-2">
                                                    <div className="w-20 text-sm font-medium text-[rgb(12,52,76)]">10.40-10.45</div>
                                                    <div className="flex-1 text-sm text-gray-700">
                                                        <div className="font-medium">Penyerahan Cinderamata</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Kepada Pemerintah Desa & Kelompok Budidaya
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Sesi Materi */}
                                                <div className="flex gap-4 py-2">
                                                    <div className="w-20 text-sm font-medium text-[rgb(12,52,76)]">10.45-11.55</div>
                                                    <div className="flex-1 text-sm text-gray-700">
                                                        <div className="font-medium">Sesi Materi UMKM</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Pembentukan UMKM, Perancangan & Legalitas, Brand Marketing + Tanya Jawab
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Review Produk */}
                                                <div className="flex gap-4 py-2">
                                                    <div className="w-20 text-sm font-medium text-[rgb(12,52,76)]">12.00-12.30</div>
                                                    <div className="flex-1 text-sm text-gray-700">
                                                        <div className="font-medium">Review Produk & Expo</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Keliling stand UMKM, games & interaksi produk
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Penutupan */}
                                                <div className="flex gap-4 py-2">
                                                    <div className="w-20 text-sm font-medium text-[rgb(12,52,76)]">12.30-13.00</div>
                                                    <div className="flex-1 text-sm text-gray-700">
                                                        <div className="font-medium">Sambutan & Penutupan</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Reviewer P2KKN UNDIP & Perwakilan DPL
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Layout: Stacked Vertically (<768px) */}
                <div className="md:hidden">
                    {/* KEMILAU Card - Mobile */}
                    <div className="bg-gradient-to-b from-[rgb(12,52,76)] to-[#64FFDA] rounded-3xl overflow-hidden shadow-2xl w-full">
                        <div className="p-6">
                            {/* Header Content - Mobile */}
                            <div className="text-center text-white mb-8">
                                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                                    KEMILAU • Program Kerja • Expo UMKM
                                </h3>
                                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                                    Program kerja multidisiplin yang mengintegrasikan seluruh keahlian dari berbagai fakultas 
                                    untuk menciptakan expo UMKM terbesar di Desa Kemujan.
                                </p>
                            </div>

                            {/* Mockup Section - Mobile (Single Column) */}
                            <div className="space-y-6">
                                
                                {/* Card 1 - Program Overview - Mobile */}
                                <div className="mx-auto">
                                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-sm mx-auto">
                                        <div className="text-center mb-4">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <span className="text-lg sm:text-2xl">🎯</span>
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Program Overview</h4>
                                            <p className="text-xs sm:text-sm text-gray-600">KEMILAU 2025</p>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                                                <span className="text-xs sm:text-sm font-medium text-gray-700">Target UMKM</span>
                                                <span className="text-[rgb(12,52,76)] font-bold text-sm sm:text-base">20+</span>
                                            </div>
                                            <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                                                <span className="text-xs sm:text-sm font-medium text-gray-700">Produk Display</span>
                                                <span className="text-[rgb(12,52,76)] font-bold text-sm sm:text-base">6+</span>
                                            </div>
                                            <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                                                <span className="text-xs sm:text-sm font-medium text-gray-700">Target Pengunjung</span>
                                                <span className="text-[rgb(12,52,76)] font-bold text-sm sm:text-base">40+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 - Timeline - Mobile */}
                                <div className="mx-auto">
                                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-sm mx-auto">
                                        <div className="text-center mb-4">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <span className="text-lg sm:text-2xl">📆</span>
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Timeline</h4>
                                            <p className="text-xs sm:text-sm text-gray-600">Jadwal Pelaksanaan</p>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="p-2 sm:p-3 border-l-4 border-orange-400 bg-gray-50 rounded-r-lg">
                                                <div className="font-semibold text-gray-900 text-xs sm:text-sm">Persiapan</div>
                                                <div className="text-xs text-gray-600">5-11 Juli 2025</div>
                                                <div className="text-xs text-orange-500 font-medium mt-1">Persiapan Materi & Produk</div>
                                            </div>
                                            <div className="p-2 sm:p-3 border-l-4 border-green-400 bg-gray-50 rounded-r-lg">
                                                <div className="font-semibold text-gray-900 text-xs sm:text-sm">Expo Day</div>
                                                <div className="text-xs text-gray-600">12 Juli 2025</div>
                                                <div className="text-xs text-green-500 font-medium mt-1">10:00 - 13:00 WIB</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 - Location - Mobile */}
                                <div className="mx-auto">
                                    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-sm mx-auto">
                                        <div className="text-center mb-4">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <span className="text-lg sm:text-2xl">📍</span>
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Lokasi & Info</h4>
                                            <p className="text-xs sm:text-sm text-gray-600">Desa Kemujan</p>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[rgb(12,52,76)]" />
                                                    <span className="font-semibold text-gray-900 text-xs sm:text-sm">Tim Pelaksana</span>
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    10 Mahasiswa KKN Kelompok 4<br />
                                                    10 Program Studi & Fakultas Berbeda
                                                </p>
                                            </div>
                                            
                                            <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-[rgb(12,52,76)]" />
                                                    <span className="font-semibold text-gray-900 text-xs sm:text-sm">Venue</span>
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    Balai Desa Kemujan &<br />
                                                    Area Sekitar Desa
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom CTA - Mobile */}
                            <div className="text-center mt-8">
                                <button 
                                    onClick={() => setShowDetailCard(!showDetailCard)}
                                    className="group relative overflow-hidden bg-white/10 backdrop-blur-sm border border-[rgb(12,52,76)]/20 text-[rgb(12,52,76)]/80 px-6 py-3 sm:px-8 sm:py-4 rounded-xl hover:bg-white hover:text-[rgb(12,52,76)] transition-all duration-300 font-semibold text-base sm:text-lg inline-flex items-center gap-2 sm:gap-3"
                                >
                                    <span className="text-sm sm:text-base">{showDetailCard ? 'Tutup Detail' : 'Lihat Detail'}</span>
                                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform ${showDetailCard ? 'rotate-180' : ''}`} />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Detail Card - Mobile (Below main card) */}
                    {showDetailCard && (
                        <div className="mt-6 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
                            <div className="p-4 sm:p-6">
                                {/* Header - Mobile */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Detail Program KEMILAU</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Kemujan Mini Expo Lokal 2025</p>
                                    </div>
                                    <button
                                        onClick={() => setShowDetailCard(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                                    </button>
                                </div>

                                {/* Program Description - Mobile */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Deskripsi Program</h4>
                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                            KEMILAU (Kemujan Mini Expo Lokal) merupakan program kerja multidisiplin yang mengintegrasikan 
                                            seluruh keahlian dari berbagai fakultas untuk menciptakan expo UMKM terbesar di Desa Kemujan. 
                                            Program ini bertujuan untuk mengangkat potensi UMKM lokal dengan tema "Dari Laut Untuk Rakyat".
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Rundown Acara KEMILAU</h4>
                                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                            <div className="text-xs sm:text-sm font-medium text-gray-600 mb-3">12 Juli 2025 - Balai Desa Kemujan</div>
                                            <div className="space-y-3">
                                                
                                                {/* Registrasi - Mobile */}
                                                <div className="flex gap-3 py-2">
                                                    <div className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-[rgb(12,52,76)] flex-shrink-0">09.30-10.00</div>
                                                    <div className="flex-1 text-xs sm:text-sm text-gray-700 font-medium">Registrasi Peserta</div>
                                                </div>

                                                {/* Pembukaan - Mobile */}
                                                <div className="flex gap-3 py-2">
                                                    <div className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-[rgb(12,52,76)] flex-shrink-0">10.00-10.40</div>
                                                    <div className="flex-1 text-xs sm:text-sm text-gray-700">
                                                        <div className="font-medium">Pembukaan</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Sambutan Ketua Tim KKN, Mitra IDBU, DPL & Kepala Desa
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Penyerahan - Mobile */}
                                                <div className="flex gap-3 py-2">
                                                    <div className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-[rgb(12,52,76)] flex-shrink-0">10.40-10.45</div>
                                                    <div className="flex-1 text-xs sm:text-sm text-gray-700">
                                                        <div className="font-medium">Penyerahan Cinderamata</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Kepada Pemerintah Desa & Kelompok Budidaya
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Sesi Materi - Mobile */}
                                                <div className="flex gap-3 py-2">
                                                    <div className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-[rgb(12,52,76)] flex-shrink-0">10.45-11.55</div>
                                                    <div className="flex-1 text-xs sm:text-sm text-gray-700">
                                                        <div className="font-medium">Sesi Materi UMKM</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Pembentukan UMKM, Perancangan & Legalitas, Brand Marketing + Tanya Jawab
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Review Produk - Mobile */}
                                                <div className="flex gap-3 py-2">
                                                    <div className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-[rgb(12,52,76)] flex-shrink-0">12.00-12.30</div>
                                                    <div className="flex-1 text-xs sm:text-sm text-gray-700">
                                                        <div className="font-medium">Review Produk & Expo</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Keliling stand UMKM, games & interaksi produk
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Penutupan - Mobile */}
                                                <div className="flex gap-3 py-2">
                                                    <div className="w-16 sm:w-20 text-xs sm:text-sm font-medium text-[rgb(12,52,76)] flex-shrink-0">12.30-13.00</div>
                                                    <div className="flex-1 text-xs sm:text-sm text-gray-700">
                                                        <div className="font-medium">Sambutan & Penutupan</div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Reviewer P2KKN UNDIP & Perwakilan DPL
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
)}

                {/* Program Kerja Monodisiplin Section */}
                {selectedTab === "mono" && (
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            {/* Program Cards */}
                            <div className="space-y-8 max-w-6xl mx-auto">
                                {programMonodisiplinData.map((program, index) => (
                                    <ProgramCard key={index} program={program} index={index} />
                                ))}
                            </div>

                            {/* CTA Section */}
                            <div className="mt-16">
                                <div className="bg-[rgb(12,52,76)] text-white py-16 rounded-3xl">
                                    <div className="container mx-auto px-4">
                                        {/* Statistics Summary - Simplified */}
                                        <div className="max-w-4xl mx-auto">
                                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                                <div className="text-center mb-8">
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ringkasan Program Monodisiplin</h3>
                                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                                        Koleksi lengkap materi dan dokumentasi dari 10 program kerja spesialis yang telah dilaksanakan
                                                    </p>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-[rgb(12,52,76)] mb-2">10 + 1</div>
                                                        <div className="text-sm text-gray-600">Program Kerja Mono + Multi</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-orange-500 mb-2">10</div>
                                                        <div className="text-sm text-gray-600">Fakultas Berbeda</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-[rgb(12,52,76)] mb-2">10</div>
                                                        <div className="text-sm text-gray-600">Hari Pelaksanaan</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-orange-500 mb-2">100%</div>
                                                        <div className="text-sm text-gray-600">Fokus UMKM</div>
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button 
                                                        onClick={() => window.open('https://drive.google.com/drive/folders/1tdvRXBcOGRU63-T6jRpcYU4XRJxDP6iX?usp=sharing', '_blank')}
                                                        className="group relative overflow-hidden bg-gradient-to-r from-[rgb(12,52,76)] to-blue-500 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg inline-flex items-center gap-3"
                                                    >
                                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12.3 5.5l-1.8 3.1h7l-1.8-3.1H12.3zm-2.6 0L7.9 8.6H4.7l1.8-3.1h3.2zm9.8 4.2H4.5l-1.8 3.1 1.8 3.1h15l1.8-3.1-1.8-3.1z"/>
                                                        </svg>
                                                        <span>Akses Materi Lengkap di Google Drive</span>
                                                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                
            </div>
            <UmkmFooter />
        </>
    );
}