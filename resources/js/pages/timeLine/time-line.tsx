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
            image: 'imageassets/buyuni.jpeg',
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
                'Kegiatan fase dimulai pada tanggal 21 Mei 2025 sampai 30 Mei 2025. Kegiatan dimulai dengan penyerahan bibit rumput laut, hingga aksi bersh-bersih pantai.',
            media: [
                { type: 'image', src: 'imageassets/penyerahanbibit.jpg' },
                { type: 'image', src: 'imageassets/aksibersihpantai.jpg' },
            ],
            date: '21 Mei 2025 - 30 Mei 2025',
        },
        {
            title: 'Kegiatan Fase 2',
            media: [
                { type: 'image', src: 'imageassets/penyerahanbibit.jpg' },
                { type: 'image', src: 'imageassets/aksibersihpantai.jpg' },
            ],
            description: 'Deskripsi kegiatan 2 yang dilakukan pada tanggal tertentu.',
            date: '28 Mei 2025 - 10 Juni 2025',
        },
        {
            title: 'Kegiatan Fase 3',
            media: [
                { type: 'image', src: 'imageassets/penyerahanbibit.jpg' },
                { type: 'image', src: 'imageassets/aksibersihpantai.jpg' },
                { type: 'video', src: 'videoassets/pengambilantitik.mp4' },
            ],
            description:
                'Kegiatan fase 3 dimulai dengan pemetaan lokasi budidaya rumput laut hingga kegiatan workshop untuk pelatihan serta pendampingan dalam melakukan digitalisasi produk.',
            date: '23 Juni 2025 - 4 Juli 2025',
        },
        {
            title: 'Kegiatan Fase 4',
            description: 'Deskripsi kegiatan 3 yang dilakukan pada tanggal tertentu.',
            date: '23 Juni 2025 - 4 Juli 2025',
        },
    ];

    return (
        <div>
            <NavLanding />
            <Head title="Timeline KKNT Desa Kemujan Karimunjawa" />
            <section className="relative min-h-[100dvh] bg-[rgb(12,52,76)] px-4 py-16 sm:px-8 md:px-16 lg:px-24">
                <div className="my-28">
                    <h1 className="mx-auto mb-14 max-w-3xl text-center text-2xl font-bold tracking-wider text-white sm:text-3xl lg:text-4xl">
                        DOSEN PEMBIMBING KKNT DESA KEMUJAN KARIMUNJAWA
                    </h1>
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

            <section className="relative min-h-[100dvh] bg-[rgb(12,52,76)] px-4 py-16 sm:px-8 md:px-16 lg:px-24">
                <h1 className="text-center text-white">
                    <span className="text-2xl font-bold tracking-wider sm:text-3xl lg:text-4xl">Timeline KKNT Desa Kemujan Karimunjawa</span>
                </h1>
                <div className="mt-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="relative">
                            {/* Timeline container */}
                            <div className="border-l-2 border-white pl-6">
                                {timelineEvents.map((event, index) => (
                                    <div key={index} className="relative mb-16">
                                        {' '}
                                        {/* Konten Event */}
                                        <div className="relative z-0 mt-2">
                                            {/* Judul, Tanggal, dan Deskripsi */}
                                            <div className="mb-6">
                                                <h3 className="text-2xl font-semibold tracking-wider text-white">{event.title}</h3>
                                                <p className="text-sm text-gray-300">{event.date}</p>
                                                <p className="mt-2 text-gray-200">{event.description}</p>
                                            </div>

                                            {/* Gambar dalam Grid */}
                                            {event.media && event.media.length > 0 && (
                                                <div className="mt-6 grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-6">
                                                    {event.media.map((item, index) => {
                                                        // Grid layout logic
                                                        let colSpan = 'md:col-span-2';
                                                        let rowSpan = '';

                                                        if (index % 5 === 0) {
                                                            colSpan = 'md:col-span-3';
                                                            rowSpan = 'row-span-2';
                                                        } else if (index % 5 === 3) {
                                                            colSpan = 'md:col-span-2';
                                                            rowSpan = 'row-span-1';
                                                        } else if (index % 5 === 4) {
                                                            colSpan = 'md:col-span-1';
                                                            rowSpan = 'row-span-2';
                                                        }

                                                        return (
                                                            <div key={index} className={`relative overflow-hidden rounded-lg ${colSpan} ${rowSpan}`}>
                                                                {item.type === 'image' ? (
                                                                    <img
                                                                        src={item.src}
                                                                        alt={`Media ${index + 1}`}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <video
                                                                        src={item.src}
                                                                        autoPlay
                                                                        loop
                                                                        muted
                                                                        className="h-full w-full object-cover"
                                                                    />
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

            <FooterLanding />
        </div>
    );
}
