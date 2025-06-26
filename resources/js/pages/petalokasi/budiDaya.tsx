import FooterLanding from '@/components/footer-landing';
import NavLanding from '@/components/nav-landing';

export default function Budidaya() {
    return (
        <>
            <NavLanding />
            <section className="relative min-h-[100dvh] bg-[rgb(12,52,76)] px-4 py-36 text-white sm:px-8 md:px-16 lg:px-24">
                {/* Judul */}
                <h1 className="mb-12 text-center text-3xl font-bold md:text-4xl">Peta Lokasi Budidaya Rumput Laut</h1>

                {/* Konten Gambar + Deskripsi */}
                <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-start">
                    {/* Gambar */}
                    <div className="flex-1">
                        <img src="/imageassets/lokasibudidaya.jpg" alt="Peta Lokasi Budidaya Rumput Laut" className="w-full rounded-lg shadow-xl" />
                    </div>

                    {/* Deskripsi */}
                    <div className="flex-1 text-base leading-relaxed">
                        <p className="mb-4">
                            Peta ini menunjukkan <strong>4 titik budidaya rumput laut</strong> di perairan Desa Kemujan, Karimunjawa dengan kedalaman
                            kurang lebih 5 meter - lokasi tersebut ideal ditanami rumput laut karena cahaya yang cukup, sirkulasi yang baik, dan
                            substrat yang sesuai.
                        </p>
                        <ul className="mb-4 list-inside list-disc">
                            <li>Budidaya 1-4 ditandai lingkaran merah</li>
                            <li>Citra satelit mempermudah visualisasi lokasi</li>
                            <li>Inset peta menunjukkan posisi regional</li>
                        </ul>
                        <p className="mb-4">
                            🧭 <strong>Legenda dan skala</strong> membantu membaca detail peta (<em>1:1.451</em>). Peta ini dibuat oleh{' '}
                            <strong>Mediana Virgie Oryza Kristianto</strong> (Oseanografi UNDIP) dalam rangka <strong>KKN Tematik 127 Fase 3</strong>.
                        </p>
                    </div>
                </div>
            </section>
            <FooterLanding />
        </>
    );
}
