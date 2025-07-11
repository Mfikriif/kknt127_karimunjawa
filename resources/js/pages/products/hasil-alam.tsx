import FooterLanding from '@/components/footer-landing'; // Pastikan path ini benar
import NavLanding from '@/components/nav-landing'; // Pastikan path ini benar
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Mendefinisikan tipe data untuk Hasil Alam
type HasilAlam = {
    id: number;
    nama: string;
    deskripsi?: string;
    kategori: 'laut' | 'darat';
    gambar?: string;
};

// Mendefinisikan tipe untuk props halaman
type PageProps = {
    resources: HasilAlam[];
};

// Komponen Halaman Utama
export default function ProductHasilAlamPage() {
    // Mengambil data 'resources' dari props halaman
    const { props } = usePage<PageProps>();
    const resources = props.resources || [];

    return (
        <>
            <NavLanding />
            <Head title="Hasil Alam Desa" />

            <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#0A2342] to-[#0E3A5A] px-4 py-16 text-white sm:px-8 md:px-16 lg:px-24">
                <div className="my-28">
                    <div className="relative z-10 mb-16 text-center">
                        <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
                            Jelajahi <span className="text-[#64FFDA] drop-shadow-lg">Hasil Alam</span> Desa Kami
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                            Temukan potensi dan kekayaan alam yang berasal dari darat dan laut, masing-masing dengan keunikan dan manfaatnya.
                        </p>
                    </div>

                    {/* Grid untuk menampilkan kartu hasil alam */}
                    <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {resources.map((resource) => (
                            <HasilAlamCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                </div>
            </section>

            <FooterLanding />
        </>
    );
}

// Komponen Kartu untuk setiap Hasil Alam
function HasilAlamCard({ resource }: { resource: HasilAlam }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="group relative flex transform flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:border-[#64FFDA] hover:shadow-cyan-500/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">
            {/* Gambar dan placeholder */}
            {resource.gambar ? (
                <div className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-800 pb-[75%] shadow-lg">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-700 text-sm text-gray-400">
                            Memuat Gambar...
                        </div>
                    )}
                    <img
                        src={`/storage/${resource.gambar}`}
                        alt={resource.nama}
                        className={`absolute inset-0 h-full w-full rounded-lg object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)} // Sembunyikan placeholder jika gambar gagal dimuat
                    />
                </div>
            ) : (
                <div className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-700 pb-[75%] text-base text-gray-400 shadow-md">
                    Gambar Tidak Tersedia
                </div>
            )}

            {/* Konten Teks */}
            <h2 className="mb-2 text-2xl leading-snug font-bold text-white drop-shadow-sm">{resource.nama}</h2>

            {/* Badge Kategori */}
            <div className="mb-3">
                <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${resource.kategori === 'laut' ? 'bg-cyan-900 text-cyan-300' : 'bg-emerald-900 text-emerald-300'}`}
                >
                    {resource.kategori}
                </span>
            </div>

            {/* Deskripsi */}
            {resource.deskripsi && (
                <div className="flex-grow">
                    <p className="mb-1 text-sm font-semibold text-gray-300">Deskripsi:</p>
                    <p className="line-clamp-3 text-base text-gray-200">{resource.deskripsi}</p>
                </div>
            )}
        </div>
    );
}
