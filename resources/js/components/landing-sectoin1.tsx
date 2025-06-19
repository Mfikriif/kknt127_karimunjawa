import { useEffect, useRef } from 'react';

export default function LandingSection1() {
    const asset = 'image/karimunjawa.jpg';

    const zoomRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;

            // Zoom image
            if (zoomRef.current) {
                const scale = 1 + scrollTop / 10000;
                zoomRef.current.style.transform = `scale(${scale})`;
            }

            // Animate text scroll
            if (textRef.current) {
                const translateY = Math.min(scrollTop / 10, 50);
                const opacity = Math.max(1 - scrollTop / 600, 0);

                textRef.current.style.transform = `translateY(-${translateY}px)`;
                textRef.current.style.opacity = `${opacity}`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <section className="relative h-[100dvh] overflow-hidden">
                {/* Background image */}
                <div
                    ref={zoomRef}
                    className="absolute inset-0 bg-cover bg-center brightness-75 saturate-150 transition-transform duration-300 ease-out"
                    style={{ backgroundImage: `url(${asset})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/55" />

                {/* Text content */}
                <div
                    ref={textRef}
                    className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white transition-all duration-300 ease-out"
                >
                    <h1 className="mb-4 text-4xl leading-tight font-bold tracking-widest sm:text-5xl md:text-6xl lg:text-7xl">SELAMAT DATANG</h1>
                    <p className="text-lg font-medium tracking-widest sm:text-xl md:text-2xl">DI OLAHLAUTKEMUJAN</p>
                </div>
            </section>
        </>
    );
}
