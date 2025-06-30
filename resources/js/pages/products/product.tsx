import FooterLanding from '@/components/footer-landing';
import NavLanding from '@/components/nav-landing';
import { Head } from '@inertiajs/react';
import { useState } from 'react'; // Import useState for image loading

type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    type: string;
    gambar?: string;
    link?: string;
};

type Props = {
    products: Product[];
};

export default function LandingProducts({ products }: Props) {
    return (
        <>
            <NavLanding />
            <Head title="Produk Hasil Kemujan" />
            <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[#0A2342] to-[#0E3A5A] px-4 py-16 text-white sm:px-8 md:px-16 lg:px-24">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                    <svg
                        className="absolute inset-0 h-full w-full object-cover"
                        viewBox="0 0 1000 1000"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 200C200 50 400 350 600 200C800 50 1000 200 1000 200V1000H0V200Z" fill="url(#patternGradient)" opacity="0.1" />
                        <path d="M0 300C250 100 500 400 750 300C900 250 1000 300 1000 300V1000H0V300Z" fill="url(#patternGradient)" opacity="0.05" />
                        <defs>
                            <linearGradient id="patternGradient" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                                <stop stopColor="#3CB371" />
                                <stop offset="1" stopColor="#3CB371" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="relative z-10 mb-16 text-center">
                    <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
                        Produk <span className="text-[#64FFDA] drop-shadow-lg">Unggulan</span> Hasil Laut
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                        Jelajahi kekayaan laut dari Desa Kemujan, Karimunjawa. Setiap produk mencerminkan cita rasa autentik dan potensi ekonomi lokal
                        yang melimpah.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
            <FooterLanding />
        </>
    );
}

function ProductCard({ product }: { product: Product }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="group relative flex transform flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:border-[#64FFDA] hover:shadow-cyan-500/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">
            {/* Overlay untuk efek gradien saat hover - ini yang baru */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: 'linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.02) 50%, transparent 100%)',
                    zIndex: 0, // Pastikan di bawah konten
                }}
            ></div>

            {product.gambar ? (
                <div className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-800 pb-[75%] shadow-lg">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-700 text-sm text-gray-400">
                            Memuat Gambar...
                        </div>
                    )}
                    <img
                        src={`/storage/${product.gambar}`}
                        alt={product.name}
                        className={`absolute inset-0 h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)} // Penting: tetap sembunyikan placeholder jika ada error
                    />
                </div>
            ) : (
                <div className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-700 pb-[75%] text-base text-gray-400 shadow-md">
                    Gambar Tidak Tersedia
                </div>
            )}

            <h2 className="mb-1 text-2xl leading-snug font-bold text-white drop-shadow-sm">{product.name}</h2>

            <p className="mb-3 text-sm text-gray-300 italic">
                {product.category} — {product.type}
            </p>

            {product.description && <p className="mb-4 line-clamp-3 flex-grow text-base text-gray-200">{product.description}</p>}

            {product.link && (
                <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center rounded-full bg-[#64FFDA] px-6 py-3 text-base font-semibold text-[#0A2342] shadow-lg transition-all duration-300 ease-in-out hover:bg-[#4ddfbc] hover:shadow-[#64FFDA]/40 focus:ring-2 focus:ring-[#64FFDA] focus:ring-offset-2 focus:ring-offset-[#0E3A5A] focus:outline-none"
                >
                    Lihat Detail
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            )}
        </div>
    );
}
