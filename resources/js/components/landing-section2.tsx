import { useEffect, useRef } from 'react';

export default function LandingSection2() {
    const asset2 = 'image/maxresdefault.jpg';

    const items = [
        {
            title: 'TEMA',
            text: 'Revitalisasi Budidaya Rumput Laut Kappaphycus sp. Integrasi Inovasiteknologi, Pemberdayaan Ekonomi Nelayan, dan Keberlanjutan Lingkungan di Desa Kemojan, Karimunjawa',
        },
        {
            title: 'TIM',
            text: 'Tim KKN terdiri atas 50 orang mahasiswa yang terbagi menjadi 4 fase kelompok penerjunan dengan bermacam Program Kerja dari Berbagai fase penerjunan.',
        },
        {
            title: 'PERIODE',
            text: 'Kegiatan Kuliah Kerja Nyata berlangsung selama 44 hari yang dimulai pada tanggal 21 Mei 2025 sampai dengan 8 Juni 2025 dan 23 Juni 2025 sampai dengan 13 Juli 2025.',
        },
    ];

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLDivElement;
                    if (entry.isIntersecting) {
                        target.classList.add('animate-show');
                        target.classList.remove('opacity-0', 'translate-y-10');
                    } else {
                        target.classList.remove('animate-show');
                        target.classList.add('opacity-0', 'translate-y-10');
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

    return (
        <section className="relative h-fit min-h-[100dvh] overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center brightness-75 saturate-150" style={{ backgroundImage: `url(${asset2})` }} />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-evenly px-4 py-20 text-center text-white lg:flex-row">
                <div className="w-full max-w-4xl space-y-6 tracking-wider text-[rgb(12,52,76)]">
                    {items.map((item, index) => (
                        <div
                            key={item.title}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            className="my-3 translate-y-10 transform rounded-2xl border bg-white p-6 text-left opacity-0 transition-all duration-1000 ease-out hover:bg-blue-200"
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <h1 className="text-center text-3xl font-extrabold tracking-wider">{item.title}</h1>
                            <p className="mt-3 font-medium">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
