<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('umkms', function (Blueprint $table) {
            // Tambah kolom untuk foto display 
            $table->json('display_photos')->nullable()->after('image');
            // Tambah kolom untuk foto menu/pricelist
            $table->string('menu_photo')->nullable()->after('display_photos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('umkms', function (Blueprint $table) {
            $table->dropColumn(['display_photos', 'menu_photo']);
        });
    }
};