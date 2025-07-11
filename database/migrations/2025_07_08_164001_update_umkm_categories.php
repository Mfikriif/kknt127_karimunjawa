<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Mapping kategori lama ke kategori baru
        $categoryMapping = [
            'Ikan & Seafood' => 'Ikan, Seafood, & Rumput Laut',
            'Rumput Laut' => 'Ikan, Seafood, & Rumput Laut',
            'Warung & Kuliner' => 'Warung & Kuliner',
            'Kerajinan' => 'Kerajinan & Jasa',
            'Jasa' => 'Kerajinan & Jasa',
            // Tambahkan mapping lainnya sesuai data yang ada
        ];

        foreach ($categoryMapping as $oldCategory => $newCategory) {
            DB::table('umkms')
                ->where('category', $oldCategory)
                ->update(['category' => $newCategory]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Rollback mapping (opsional)
        $reverseMapping = [
            'Ikan, Seafood, & Rumput Laut' => 'Ikan & Seafood',
            'Warung & Kuliner' => 'Warung & Kuliner',
            'Kerajinan & Jasa' => 'Kerajinan',
            'Penginapan' => 'Jasa',
            'Wisata' => 'Jasa',
        ];

        foreach ($reverseMapping as $newCategory => $oldCategory) {
            DB::table('umkms')
                ->where('category', $newCategory)
                ->update(['category' => $oldCategory]);
        }
    }
};