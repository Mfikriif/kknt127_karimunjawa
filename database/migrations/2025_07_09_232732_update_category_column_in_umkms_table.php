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
    public function up(): void
    {
        // STEP 1: Change column type from ENUM to STRING first
        Schema::table('umkms', function (Blueprint $table) {
            // Drop foreign key constraints if any exist
            $table->string('category', 255)->change();
        });

        // STEP 2: Now update the data with new categories
        $categoryMapping = [
            'Ikan & Seafood' => 'Ikan, Seafood, & Rumput Laut',
            'Rumput Laut' => 'Ikan, Seafood, & Rumput Laut',
            'Warung & Kuliner' => 'Warung & Kuliner',
            'Kerajinan' => 'Kerajinan & Jasa',
            'Jasa' => 'Kerajinan & Jasa',
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
    public function down(): void
    {
        // First update data back to old categories
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

        // Then change back to ENUM
        Schema::table('umkms', function (Blueprint $table) {
            $table->enum('category', [
                'Ikan & Seafood',
                'Rumput Laut', 
                'Warung & Kuliner',
                'Kerajinan',
                'Jasa'
            ])->change();
        });
    }
};