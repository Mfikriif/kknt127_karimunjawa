import NavLanding from '@/components/nav-landing';

export default function TimeLine() {
    const dosenImage = [
        {
            nama: 'Muhammad Fathul Hidayat, S.Pd.I., M.Pd.',
            image: 'imageassets/bagisahur1.jpg',
            fakultas: 'Fakultas Perikanan dan Ilmu Kelautan',
        },
        {
            nama: 'Irawan, S.Pd.I., M.Pd.',
            image: 'imageassets/bagisahur1.jpg',
            fakultas: 'Fakultas Perikanan dan Kelautan',
        },
        {
            nama: 'Suciati, S.Pd.I., M.Pd.',
            image: 'imageassets/bagisahur1.jpg',
            fakultas: 'Fakultas Perikanan dan Kelautan',
        },
        {
            nama: 'pranasari, S.Pd.I., M.Pd.',
            image: 'imageassets/bagisahur1.jpg',
            fakultas: 'Fakultas Perikanan dan Kelautan',
        },
        {
            nama: 'pranasari, S.Pd.I., M.Pd.',
            image: 'imageassets/bagisahur1.jpg',
            fakultas: 'Fakultas Perikanan dan Kelautan',
        },
    ];

    return (
        <div>
            <NavLanding />

            {/* Menyesuaikan padding horizontal pada section untuk ruang lebih di iPad dan desktop */}
            <section className="relative min-h-[100dvh] bg-[rgb(12,52,76)] px-4 py-16 sm:px-8 md:px-16 lg:px-24">
                <div className="my-28">
                    {/* H1 heading, responsive for various screen sizes */}
                    {/* Using text-2xl for mobile, sm:text-3xl for tablets, lg:text-4xl for desktops */}
                    <h1 className="mx-auto mb-14 max-w-3xl text-center text-2xl font-bold tracking-wider text-white sm:text-3xl lg:text-4xl">
                        DOSEN PEMBIMBING KKNT DESA KEMUJAN KARIMUNJAWA
                    </h1>
                    <div className="flex flex-row items-center justify-center">
                        {/* Grid container untuk kartu dosen */}
                        {/* Mengubah 'w-6xl' menjadi 'max-w-6xl' untuk memastikan responsivitas lebar di semua perangkat */}
                        {/* Mengubah md:grid-cols-3 menjadi md:grid-cols-2 agar lebih lapang di iPad */}
                        {/* Menambahkan md:gap-12 untuk gap yang lebih besar di iPad */}
                        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-center gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                            {dosenImage.map((dosen, index) => (
                                <div key={index} className="relative h-96 w-72 overflow-hidden rounded-lg">
                                    {/* Faculty member card: fixed size h-96 w-72 as requested, overflow-hidden for overlay effect */}
                                    {/* Image fills the card, maintaining aspect ratio and cropping if necessary */}
                                    <img src={dosen.image} alt={dosen.nama} className="absolute inset-0 h-full w-full rounded-lg object-cover" />
                                    {/* Text Overlay: positioned at the bottom, full width, with a gradient for readability */}
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
        </div>
    );
}
