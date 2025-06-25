import FooterLanding from '@/components/footer-landing';
import NavLanding from '@/components/nav-landing';
import { Head } from '@inertiajs/react';

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
            <section className="relative min-h-[100dvh] bg-gradient-to-b from-[#0C344C] to-[#0f415e] px-4 py-16 text-white sm:px-8 md:px-16 lg:px-24">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold md:text-4xl">Produk Hasil Laut</h1>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-gray-300 md:text-base">
                        Menampilkan hasil laut unggulan dari Desa Kemujan, Karimunjawa — kaya akan cita rasa laut dan potensi ekonomi lokal.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md transition hover:scale-[1.02] hover:shadow-2xl"
                        >
                            {product.gambar && (
                                <img
                                    src={`/storage/${product.gambar}`}
                                    alt={product.name}
                                    className="mb-4 h-48 w-full rounded-xl object-cover shadow-md"
                                />
                            )}

                            <h2 className="text-xl font-semibold text-white">{product.name}</h2>

                            <p className="text-sm text-gray-300 italic">
                                {product.category} — {product.type}
                            </p>

                            <p className="mt-3 line-clamp-3 text-sm text-gray-200">{product.description}</p>

                            {product.link && (
                                <a
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/30"
                                >
                                    Lihat Detail
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <FooterLanding />
        </>
    );
}
