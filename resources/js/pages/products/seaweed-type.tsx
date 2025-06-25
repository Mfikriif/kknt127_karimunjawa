import FooterLanding from '@/components/footer-landing';
import NavLanding from '@/components/nav-landing';
import { Head, usePage } from '@inertiajs/react';

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
            <section className="relative min-h-[100dvh] bg-gradient-to-b from-[#0C344C] to-[#0f415e] px-4 py-16 text-white sm:px-8 md:px-16 lg:px-24">
                <Head title="Jenis Rumput Laut" />
                <h1 className="mb-8 text-center text-3xl font-bold text-white">Jenis Rumput Laut</h1>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {seaweedTypes.map((seaweed) => (
                        <div
                            key={seaweed.id}
                            className="group rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md transition hover:scale-[1.02] hover:shadow-2xl"
                        >
                            {seaweed.image && (
                                <img
                                    src={`/storage/${seaweed.image}`}
                                    alt={seaweed.name}
                                    className="mb-4 h-48 w-full rounded-xl object-cover shadow-md"
                                />
                            )}
                            <h2 className="text-xl font-semibold text-white">{seaweed.name}</h2>
                            <p className="text-sm text-gray-300 italic">
                                {seaweed.characteristics?.slice(0, 100)}
                                {seaweed.characteristics && seaweed.characteristics.length > 100 && '...'}
                            </p>
                            <p className="mt-3 line-clamp-3 text-sm text-gray-200">{seaweed.benefits?.slice(0, 200)}</p>
                        </div>
                    ))}
                </div>
            </section>
            <FooterLanding />
        </>
    );
}
