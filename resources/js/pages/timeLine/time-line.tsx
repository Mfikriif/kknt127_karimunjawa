import FooterLanding from '@/components/footer-landing';
import NavLanding from '@/components/nav-landing';
import { Head } from '@inertiajs/react';

export default function TimeLine() {
    const dosenImage = [
        {
            nama: 'Dr. Diana Chilmawati, S.Pi., M.Si.',
            image: 'imageassets/budiana.png',
            fakultas: 'Fakultas Perikanan dan Ilmu Kelautan',
        },
        {
            nama: 'Dr. Trisnani Dwi H, S.Pi., M.Si.',
            image: 'imageassets/bunina.png',
            fakultas: 'Fakultas Perikanan dan Kelautan',
        },
        {
            nama: 'Tristiana Yuniarti, S.Pi., M.Si.',
            image: 'imageassets/buyuni.png',
            fakultas: 'Fakultas Perikanan dan Kelautan',
        },
        {
            nama: 'Pranata Candra P.P,S.PI.,M.Ling',
            image: 'imageassets/Pranata.png',
            fakultas: 'Fakultas Perikanan dan Kelautan',
        },
    ];

    const timelineEvents = [
        {
            title: 'Kegiatan Fase 1',
            description:
                'Kegiatan fase dimulai pada tanggal 21 Mei 2025 sampai 30 Mei 2025. Kegiatan dimulai dengan penyerahan bibit rumput laut, melakukan penyuluhan, hingga aksi bersih-bersih pantai.',
            media: [
                { type: 'image', src: 'imageassets/penyerahanbibit.jpg' },
                { type: 'image', src: 'imageassets/penanamanbibit.PNG' },
                { type: 'image', src: 'imageassets/aksibersihpantai.jpg' },
                { type: 'image', src: 'imageassets/penyuluhanriska.jpg' },
            ],
            date: '21 Mei 2025 - 30 Mei 2025',
        },
        {
            title: 'Kegiatan Fase 2',
            media: [
                { type: 'image', src: 'imageassets/image.png' },
                { type: 'image', src: 'imageassets/penyuluhanitmamul.jpg' },
                { type: 'image', src: 'imageassets/penyuluhannafisah2.png' },
                { type: 'image', src: 'imageassets/nobarfase2.jpg' },
            ],
            description:
                'Kegiatan Fase 2 dimulai pada tanggal 28 Mei 2025 sampai 10 Juni 2025. Kegiatan ini dimulai dengan penyuluhan, Nonton bareng siswa-siswi di SDN 05 Kemujan.',
            date: '28 Mei 2025 - 10 Juni 2025',
        },
        {
            title: 'Kegiatan Fase 3',
            media: [
                { type: 'image', src: 'imageassets/penerjunanfase3.jpg' },
                { type: 'image', src: 'imageassets/survey2.jpg' },
                { type: 'image', src: 'imageassets/wabisnis.jpg' },
                { type: 'image', src: 'imageassets/logoumkm.jpg' },
                { type: 'image', src: 'imageassets/wsfase3.jpg' },
                { type: 'video', src: 'videoassets/pengambilantitik.mp4' },
            ],
            description:
                'Kegiatan fase 3 dimulai dengan pemetaan lokasi budidaya rumput laut, survey pelaku umkm, pembuatan wa bisnis dan logo umkm hingga kegiatan workshop untuk pelatihan serta pendampingan dalam melakukan digitalisasi produk.',
            date: '23 Juni 2025 - 4 Juli 2025',
        },
        {
            title: 'Kegiatan Fase 4',
            description: 'Deskripsi kegiatan 3 yang dilakukan pada tanggal tertentu.',
            date: '23 Juni 2025 - 4 Juli 2025',
        },
    ];

    const managementWeb = [
        {
            nama: 'Muhammad Fikri Firdaus',
            image: 'imageassets/mfikri.jpg',
            fakultas: 'Fakultas Sains dan Matematika',
            jurusan: 'S1 Informatika',
        },
        {
            nama: 'Linda Ratna Kholifah',
            image: 'imageassets/linda.jpg',
            fakultas: 'Fakultas Teknik',
            jurusan: 'S1 Teknik Komputer',
        },
    ];

    return (
        <div>
            <NavLanding />
            <Head title="Timeline KKNT Desa Kemujan Karimunjawa" />
            <section className="relative min-h-[100dvh] bg-[rgb(12,52,76)] px-4 py-16 sm:px-8 md:px-16 lg:px-24">
                <div className="my-28">
                    <div className="relative z-10 mb-16 text-center">
                        <h1 className="mx-auto mb-5 max-w-3xl text-center text-2xl font-bold tracking-wider text-white sm:text-3xl lg:text-4xl">
                            DOSEN PEMBIMBING<span className="text-[#64FFDA] drop-shadow-lg"> KKNT 127</span> DESA KEMUJAN KARMUNJAWA
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                            Mari kita kenali dosen pembimbing yang telah berkontribusi dalam program KKNT Desa Kemujan Karimunjawa.
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-center">
                        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-center gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                            {dosenImage.map((dosen, index) => (
                                <div key={index} className="relative h-96 w-72 overflow-hidden rounded-lg">
                                    <img src={dosen.image} alt={dosen.nama} className="absolute inset-0 h-full w-full rounded-lg object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-center">
                                        {/* Responsive font size for faculty member's name */}
                                        <h2 className="text-base font-semibold text-wrap text-white sm:text-lg lg:text-xl">{dosen.nama}</h2>
                                        {/* Responsive font size for faculty */}
                                        <p className="mt-1 text-xs text-gray-300 sm:text-sm lg:text-base">{dosen.fakultas}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-[rgb(12,52,76)] px-4 py-16 sm:px-8 md:px-16 lg:px-24">
                <div className="relative z-10 mb-16 text-center">
                    <h1 className="mx-auto mb-5 max-w-3xl text-center text-2xl font-bold tracking-wider text-white sm:text-3xl lg:text-4xl">
                        Timeline<span className="text-[#64FFDA] drop-shadow-lg"> KKNT 127</span> DESA KEMUJAN KARMUNJAWA
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                        Mari lihat lebih dekat kegiatan apa saja yang dilakukan oleh mahasiswa kknt 127 di desa kemujan
                    </p>
                </div>
                <div className="mt-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="relative">
                            {/* Timeline container */}
                            <div className="border-l-2 border-white pl-6">
                                {timelineEvents.map((event, index) => (
                                    <div key={index} className="relative mb-16">
                                        {/* Konten Event */}
                                        <div className="relative z-0 mt-2">
                                            {/* Judul, Tanggal, dan Deskripsi */}
                                            <div className="mb-6">
                                                <h3 className="text-2xl font-semibold tracking-wider text-white">{event.title}</h3>
                                                <p className="text-sm text-gray-300">{event.date}</p>
                                                <p className="mt-2 text-gray-200">{event.description}</p>
                                            </div>

                                            {/* Gambar dalam Kolom (Masonry Layout) - UPDATED */}
                                            {event.media && event.media.length > 0 && (
                                                // 1. Container now uses 'columns' instead of 'grid'
                                                <div className="mt-6 columns-1 gap-4 sm:columns-2">
                                                    {event.media.map((item, index) => {
                                                        // 2. No more colSpan logic needed
                                                        return (
                                                            // 3. Added classes to prevent items from breaking and to add space
                                                            <div key={index} className="mb-4 break-inside-avoid">
                                                                {item.type === 'image' ? (
                                                                    <img
                                                                        src={item.src}
                                                                        alt={`Media ${index + 1}`}
                                                                        className="h-auto w-full rounded-lg"
                                                                    />
                                                                ) : (
                                                                    <video src={item.src} autoPlay loop muted className="h-auto w-full rounded-lg" />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative min-h-[100dvh] bg-[rgb(12,52,76)] px-4 py-2 sm:px-8 md:px-16 lg:px-24">
                <div className="my-28">
                    <div className="relative z-10 mb-16 text-center">
                        <h1 className="mx-auto mb-5 max-w-3xl text-center text-2xl font-bold tracking-wider text-white sm:text-3xl lg:text-4xl">
                            Management<span className="text-[#64FFDA] drop-shadow-lg"> Website</span> Desa Kemujan Karimunjawa
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                            Kenali tim yang mengelola dan mengembangkan website Desa Kemujan Karimunjawa untuk memberikan informasi yang akurat dan
                            terkini.
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-center">
                        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-center gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                            {managementWeb.map((manage, index) => (
                                <div key={index} className="relative h-96 w-72 overflow-hidden rounded-lg">
                                    <img src={manage.image} alt={manage.nama} className="absolute inset-0 h-full w-full rounded-lg object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-center">
                                        {/* Responsive font size for faculty member's name */}
                                        <h2 className="text-base font-semibold text-wrap text-white sm:text-lg lg:text-xl">{manage.nama}</h2>
                                        {/* Responsive font size for faculty */}
                                        <p className="mt-1 text-xs text-gray-300 sm:text-sm lg:text-base">{manage.fakultas}</p>
                                        <p className="mt-1 text-xs text-gray-300 sm:text-sm lg:text-base">{manage.jurusan}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FooterLanding />
        </div>
    );
}
