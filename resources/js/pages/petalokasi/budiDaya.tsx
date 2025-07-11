import FooterLanding from '@/components/footer-landing';
import NavLanding from '@/components/nav-landing';
import { Head } from '@inertiajs/react';

export default function Budidaya() {
    return (
        <>
            <NavLanding />
            <Head title="Peta Lokasi Budidaya Rumput Laut" /> {/* The 'pb-16' (padding-bottom) is reduced to decrease space below this section */}
            <section className="relative bg-[rgb(12,52,76)] px-4 pt-36 pb-16 text-white sm:px-8 md:px-16 lg:px-24">
                {/* Judul */}
                <div className="relative z-10 mb-16 text-center">
                    <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
                        Peta <span className="text-[#64FFDA] drop-shadow-lg">Lokasi Budidaya</span> Rumput Laut
                    </h1>
                </div>
                {/* Konten Gambar + Deskripsi */}
                <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-start">
                    {/* Gambar */}
                    <div className="flex-1">
                        <img src="/imageassets/lokasibudidaya.jpg" alt="Peta Lokasi Budidaya Rumput Laut" className="w-full rounded-lg shadow-xl" />
                    </div>
                    {/* Deskripsi */}
                    <div className="flex-1 text-base leading-relaxed">
                        <p className="mb-4">
                            Desa Kemujan di Kepulauan Karimunjawa merupakan salah satu sentra budidaya rumput laut yang berkembang di wilayah pesisir
                            utara Jawa Tengah. Kondisi perairan yang relatif tenang, jernih, dan memiliki tingkat salinitas yang sesuai menjadikan
                            wilayah ini potensial untuk pengembangan budidaya secara berkelanjutan. Aktivitas budidaya ini telah menjadi sumber
                            penghasilan utama bagi sebagian besar masyarakat setempat. Kemujan Marine Insight hadir sebagai program yang menyajikan
                            peta lokasi budidaya rumput laut. Program ini bertujuan memberikan gambaran menyeluruh dan mudah diakses oleh masyarakat,
                            peneliti, maupun pemangku kebijakan untuk mendukung budidaya yang efisien, ramah lingkungan, dan berkelanjutan. Output
                            akhir dari program kerja ini yaitu menghasilkan peta lokasi budidaya rumput laut Desa Kemujan, Karimun Jawa yang dibuat
                            dengan menggunakan Software ArcGIS untuk pengolahan data dan data titik koordinat lokasi budidaya rumput laut sebagai data
                            awal.
                        </p>
                    </div>
                </div>
            </section>
            <section className="relative bg-[rgb(12,52,76)] px-4 pt-16 pb-36 text-white sm:px-8 md:px-16 lg:px-24">
                {/* Judul */}
                <div className="relative z-10 mb-16 text-center">
                    <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
                        Kemujan <span className="text-[#64FFDA] drop-shadow-lg">Smart Contract</span> Booklet
                    </h1>
                </div>
                {/* Konten Gambar + Deskripsi */}
                <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-start">
                    {/* Gambar */}
                    <div className="flex-1">
                        <img src="/imageassets/booklet.jpg" alt="Booklet Kemujan Smart Contract" className="w-full rounded-lg shadow-xl" />
                    </div>
                    {/* Deskripsi */}
                    <div className="flex-1 text-base leading-relaxed">
                        <p className="mb-4">
                            Berikut merupakan booklet yang berisi informasi mengenai budidaya rumput laut, Produk, dan Wisata di Desa Kemujan,
                            Karimunjawa. Booklet ini dirancang untuk memberikan panduan praktis dan informasi penting bagi para petani rumput laut.
                        </p>
                    </div>
                </div>
            </section>
            <FooterLanding />
        </>
    );
}
