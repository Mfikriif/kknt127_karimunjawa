import LandingSection1 from '@/components/landing-sectoin1';
import NavLanding from '@/components/nav-landing';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
    const asset2 = 'image/maxresdefault.jpg';

    const section2Ref = useRef<HTMLDivElement>(null);
    const [section2Visible, setSection2Visible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection2Visible(true);
                    observer.disconnect(); // optional: observe once
                }
            },
            { threshold: 0.2 },
        );

        if (section2Ref.current) {
            observer.observe(section2Ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <Head title="Home Page" />
            <NavLanding />

            {/* Section 1 with scroll zoom and animated text */}
            <LandingSection1 />

            {/* Section 2 */}
            <section ref={section2Ref} className="relative h-[100dvh] overflow-hidden">
                {/* Background image with same tone */}
                <div className="absolute inset-0 bg-cover bg-center brightness-75 saturate-150" style={{ backgroundImage: `url(${asset2})` }} />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Text content */}
                <div
                    className={`relative z-10 flex h-full flex-col items-center justify-evenly px-4 text-center text-white transition-all duration-1000 ease-out lg:flex-row ${section2Visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <div className="text-left">
                        <h1 className="mb-4 text-4xl leading-tight font-bold tracking-wide sm:text-4xl md:text-5xl lg:text-5xl">Kenal Lebih Dekat</h1>
                        <button>Anggota</button>
                    </div>

                    {/* Theme Descriptions $ Team*/}
                    <div className="w-1/2 font-medium tracking-wider text-[rgb(0,77,113)]">
                        <div className="my-3 rounded-2xl border bg-white p-4">
                            <h1 className="text-3xl font-bold tracking-wider">TEMA</h1>
                            <p className="mt-3 text-left">
                                Revitalisasi Budidaya Rumput Laut KappaphycusSP. Integrasi Inovasiteknologi, Pemberdayaan Ekonomi Nelayan, dan
                                Keberlanjutan Lingkungan di Desa Kemojan, Karimunjawa
                            </p>
                        </div>
                        <div className="my-3 rounded-2xl border bg-white p-4 backdrop-blur-md">
                            <h1 className="text-3xl font-bold tracking-wider">TIM</h1>
                            <p className="mt-3 text-left">
                                Tim Kkn terdiri atas 50 orang mahasiswa yang terbagi menjadi 4 fase kelompok penerjunan dengan bermacam Program Kerja
                                dari Berbagai fase penerjunan.
                            </p>
                        </div>
                        <div className="my-3 rounded-2xl border bg-white p-4 backdrop-blur-md">
                            <h1 className="text-3xl font-bold tracking-wider">PERIODE</h1>
                            <p className="mt-3 text-left">
                                Kegiatan Kuliah Kerja Nyata berlangsung selama 44 hari yang dimulai pada tanggal 21 Mei 2025 sampai dengan 8 Juni 2025
                                dan 23 Juni 2025 sampai dengan 13 Juli 2025.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
