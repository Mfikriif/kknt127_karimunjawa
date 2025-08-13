import FooterLanding from '@/components/footer-landing';
import NavLanding from '@/components/nav-landing';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

type SeaweedType = {
    id: number;
    name: string;
    characteristics?: string;
    benefits?: string;
    image?: string;
};

type PageProps = {
    seaweedTypes: SeaweedType[];
};

export default function SeaweedTypesPage() {
    const { props } = usePage<PageProps>();
    const seaweedTypes = props.seaweedTypes || [];

    return (
        <>
            <NavLanding />
            <Head title="Jenis Rumput Laut" />
            <section className="relative min-h-[100dvh] bg-gradient-to-b from-[#0C344C] to-[#0f415e] px-4 py-16 text-white sm:px-8 md:px-16 lg:px-24">
                <div className="my-28">
                    <div className="relative z-10 mb-16 text-center">
                        <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
                            Kenali <span className="text-[#64FFDA] drop-shadow-lg">Jenis-Jenis</span> Rumput Laut
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                            Jelajahi keanekaragaman rumput laut, karakteristik unik, dan manfaat luar biasa yang mereka tawarkan.
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {seaweedTypes.map((seaweed) => (
                            <SeaweedCard key={seaweed.id} seaweed={seaweed} />
                        ))}
                    </div>
                </div>
            </section>
            <FooterLanding />
        </>
    );
}

// Komponen Card Rumput Laut yang terpisah (dengan karakteristik terpisah)
function SeaweedCard({ seaweed }: { seaweed: SeaweedType }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="group relative flex transform flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:border-[#64FFDA] hover:shadow-cyan-500/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100">
            {/* Overlay untuk efek gradien saat hover */}
            <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: 'linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.02) 50%, transparent 100%)',
                    zIndex: 0,
                }}
            ></div>

            {seaweed.image ? (
                <div className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-800 pb-[75%] shadow-lg">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-700 text-sm text-gray-400">
                            Memuat Gambar...
                        </div>
                    )}
                    <img
                        src={`/storage/${seaweed.image}`}
                        alt={seaweed.name}
                        className={`absolute inset-0 h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                    />
                </div>
            ) : (
                <div className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-700 pb-[75%] text-base text-gray-400 shadow-md">
                    Gambar Tidak Tersedia
                </div>
            )}

            <h2 className="mb-2 text-2xl leading-snug font-bold text-white drop-shadow-sm">{seaweed.name}</h2>

            {/* Karakteristik sebagai badge chips */}
            {seaweed.characteristics && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {seaweed.characteristics
                        .split('-') // Pecah string berdasarkan tanda '-'
                        .map((char) => char.trim()) // Hapus spasi di awal/akhir setiap item
                        .filter((char) => char) // Hapus item yang kosong jika ada
                        .map((char, index) => (
                            <span
                                key={index} // Beri key unik untuk setiap badge
                                className="inline-block rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-300 uppercase"
                            >
                                {char}
                            </span>
                        ))}
                </div>
            )}

            {seaweed.benefits && (
                <div className="flex-grow">
                    <p className="mb-1 text-sm font-semibold text-gray-300">Manfaat:</p>
                    <p className="line-clamp-3 text-base text-gray-200">{seaweed.benefits}</p>
                </div>
            )}
        </div>
    );
}