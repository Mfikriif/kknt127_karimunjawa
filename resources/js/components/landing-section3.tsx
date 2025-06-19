import { useEffect, useRef } from 'react';

export default function LandingSection3() {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLDivElement;
                    if (entry.isIntersecting) {
                        target.classList.add('animate-visible');
                        target.classList.remove('opacity-0', 'blur-sm', 'translate-y-10');
                    } else {
                        target.classList.remove('animate-visible');
                        target.classList.add('opacity-0', 'blur-sm', 'translate-y-10');
                    }
                });
            },
            { threshold: 0.2 },
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const items = [
        {
            title: 'Karimunjawa',
            content:
                'Karimunjawa adalah sebuah kepulauan yang terletak di utara Jawa Tengah, Indonesia. Kepulauan ini terkenal dengan keindahan alamnya, terutama pantai-pantai yang eksotis dan terumbu karang yang memukau. Selain itu, Karimunjawa juga memiliki kekayaan budaya yang kaya, dengan masyarakat yang ramah dan tradisi yang unik.',
        },
        {
            title: 'Kemujan',
            content:
                'Kemujan, permata tersembunyi di gugusan Karimunjawa, dikenal sebagai pusat budidaya rumput laut dan surga wisata bahari yang tenang. Dikelilingi oleh keindahan alam Taman Nasional Karimunjawa, desa ini menjadi contoh harmoni antara kehidupan masyarakat pesisir dan pelestarian lingkungan.',
        },
    ];

    return (
        <section className="relative min-h-[100dvh] bg-[rgb(12,52,76)] px-4 py-16">
            <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-10 pt-28 text-white md:flex-row md:gap-16">
                {/* Judul */}
                <div className="w-full text-center md:w-1/2 md:text-left">
                    <h1 className="text-3xl font-bold tracking-wide sm:text-4xl lg:text-5xl">Tentang Karimunjawa dan Kemujan</h1>
                </div>

                {/* Konten Deskripsi */}
                <div className="w-full space-y-6 text-justify md:w-1/2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            className="translate-y-10 rounded-lg bg-white p-6 text-[rgb(12,52,76)] opacity-0 shadow-md blur-sm transition-all duration-1000 ease-out hover:shadow-xl"
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <h2 className="mb-2 text-2xl font-bold sm:text-3xl">{item.title}</h2>
                            <p className="text-sm sm:text-base lg:text-lg">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
