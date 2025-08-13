<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Umkm;

class UmkmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $umkms = [
            [
                'name' => 'Ikan Asap Pak Budi',
                'owner' => 'Budi Santoso',
                'category' => 'Ikan & Seafood',
                'description' => 'Spesialis ikan asap tradisional dengan cita rasa khas Karimunjawa. Menggunakan teknik pengasapan turun temurun dan ikan segar hasil tangkapan lokal.',
                'address' => 'Jl. Pantai Utara No. 15, Kemujan',
                'products' => ['Ikan Tongkol Asap', 'Ikan Tenggiri Asap', 'Ikan Baronang Asap'],
                'contact' => '+62 812-3456-7890',
                'rating' => 4.8,
                'image' => '🐟',
                'instagram' => '@ikanasappakbudi',
                'facebook' => 'Ikan Asap Pak Budi Kemujan',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Rumput Laut Sari Bahari',
                'owner' => 'Siti Aminah',
                'category' => 'Rumput Laut',
                'description' => 'Produksi dodol rumput laut, keripik rumput laut, dan minuman segar rumput laut. Menggunakan rumput laut organik hasil budidaya sendiri.',
                'address' => 'Kampung Nelayan Blok A No. 8, Kemujan',
                'products' => ['Dodol Rumput Laut', 'Keripik Rumput Laut', 'Minuman Rumput Laut'],
                'contact' => '+62 856-7890-1234',
                'rating' => 4.9,
                'image' => '🌿',
                'instagram' => '@saribahari_kemujan',
                'facebook' => 'Rumput Laut Sari Bahari',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Warung Bu Lastri',
                'owner' => 'Lastri Wulandari',
                'category' => 'Warung & Kuliner',
                'description' => 'Warung makan khas Karimunjawa dengan menu seafood segar dan masakan tradisional Jawa. Tempat favorit wisatawan dan warga lokal.',
                'address' => 'Jl. Raya Kemujan No. 45, Kemujan',
                'products' => ['Sop Ikan Segar', 'Cumi Bakar', 'Nasi Gudeg Ikan', 'Es Kelapa Muda'],
                'contact' => '+62 821-5678-9012',
                'rating' => 4.7,
                'image' => '🍽️',
                'instagram' => '@warungbulastri',
                'facebook' => null,
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Kerajinan Cangkang Kak Rina',
                'owner' => 'Rina Sari Dewi',
                'category' => 'Kerajinan',
                'description' => 'Kerajinan tangan dari cangkang kerang dan bahan laut lainnya. Produk unik dan ramah lingkungan untuk souvenir dan dekorasi.',
                'address' => 'Jl. Coral Garden No. 12, Kemujan',
                'products' => ['Lampu Hias Cangkang', 'Gantungan Kunci', 'Hiasan Dinding', 'Vas Bunga'],
                'contact' => '+62 813-4567-8901',
                'rating' => 4.6,
                'image' => '🐚',
                'instagram' => '@kerajinan_cangkang_rina',
                'facebook' => 'Kerajinan Cangkang Kemujan',
                'is_verified' => false,
                'is_active' => true
            ],
            [
                'name' => 'Jasa Snorkeling Mas Agus',
                'owner' => 'Agus Setiawan',
                'category' => 'Jasa',
                'description' => 'Jasa guide snorkeling dan diving dengan pengalaman 15 tahun. Mengenal spot-spot terbaik di sekitar Karimunjawa untuk wisata bahari.',
                'address' => 'Dermaga Kemujan, Kemujan',
                'products' => ['Paket Snorkeling', 'Diving Guide', 'Rental Alat Selam', 'Island Hopping'],
                'contact' => '+62 819-2345-6789',
                'rating' => 4.9,
                'image' => '🤿',
                'instagram' => '@snorkeling_masagus',
                'facebook' => 'Snorkeling Guide Karimunjawa',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Warung Kopi Pantai',
                'owner' => 'Joko Prabowo',
                'category' => 'Warung & Kuliner',
                'description' => 'Kedai kopi dengan pemandangan pantai yang indah. Menyajikan kopi lokal dan camilan ringan dengan suasana santai pinggir laut.',
                'address' => 'Pantai Kemujan, sebelah Dermaga, Kemujan',
                'products' => ['Kopi Robusta Lokal', 'Kopi Susu Gula Aren', 'Pisang Goreng', 'Singkong Keju'],
                'contact' => '+62 817-8901-2345',
                'rating' => 4.5,
                'image' => '☕',
                'instagram' => '@warungkopipantai',
                'facebook' => null,
                'is_verified' => false,
                'is_active' => true
            ],
            [
                'name' => 'Ikan Segar Pak Hasan',
                'owner' => 'Hasan Basri',
                'category' => 'Ikan & Seafood',
                'description' => 'Supplier ikan segar hasil tangkapan langsung dari laut Karimunjawa. Melayani pembelian retail dan grosir untuk restoran.',
                'address' => 'Pasar Ikan Kemujan No. 3, Kemujan',
                'products' => ['Ikan Kakap', 'Ikan Kerapu', 'Udang Segar', 'Cumi-cumi'],
                'contact' => '+62 815-1234-5678',
                'rating' => 4.7,
                'image' => '🦐',
                'instagram' => null,
                'facebook' => 'Ikan Segar Pak Hasan',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Budidaya Rumput Laut Maju',
                'owner' => 'Wahyu Santosa',
                'category' => 'Rumput Laut',
                'description' => 'Pembudidaya rumput laut dengan teknologi modern. Menyediakan bibit rumput laut dan produk olahan untuk dijual ke seluruh Indonesia.',
                'address' => 'Pantai Timur Kemujan, Kemujan',
                'products' => ['Bibit Rumput Laut', 'Rumput Laut Kering', 'Agar-agar Alami'],
                'contact' => '+62 822-9876-5432',
                'rating' => 4.8,
                'image' => '🌊',
                'instagram' => '@rumputlaut_maju',
                'facebook' => 'Budidaya Rumput Laut Maju',
                'is_verified' => true,
                'is_active' => true
            ],
            [
                'name' => 'Souvenir Karang Pak Dedi',
                'owner' => 'Dedi Kurniawan',
                'category' => 'Kerajinan',
                'description' => 'Kerajinan souvenir dari karang mati dan bahan alami laut. Ramah lingkungan dan mendukung konservasi terumbu karang.',
                'address' => 'Jl. Wisata Laut No. 7, Kemujan',
                'products' => ['Miniatur Kapal', 'Hiasan Karang', 'Gantungan Kunci Karang', 'Foto Frame'],
                'contact' => '+62 818-7654-3210',
                'rating' => 4.4,
                'image' => '🪸',
                'instagram' => '@souvenir_karang_dedi',
                'facebook' => null,
                'is_verified' => false,
                'is_active' => true
            ],
            [
                'name' => 'Rental Perahu Wisata',
                'owner' => 'Supriadi',
                'category' => 'Jasa',
                'description' => 'Jasa sewa perahu untuk wisata island hopping, fishing trip, dan transportasi antar pulau. Perahu terawat dengan kapten berpengalaman.',
                'address' => 'Dermaga Utama Kemujan, Kemujan',
                'products' => ['Sewa Perahu Harian', 'Paket Island Hopping', 'Fishing Trip', 'Charter Boat'],
                'contact' => '+62 811-2468-1357',
                'rating' => 4.6,
                'image' => '⛵',
                'instagram' => '@rental_perahu_kemujan',
                'facebook' => 'Rental Perahu Wisata Kemujan',
                'is_verified' => true,
                'is_active' => true
            ]
        ];

        foreach ($umkms as $umkmData) {
            Umkm::create($umkmData);
        }
    }
}