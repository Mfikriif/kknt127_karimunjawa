<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('umkms', function (Blueprint $table) {
            // Cek apakah kolom price_range sudah ada
            if (!Schema::hasColumn('umkms', 'price_range')) {
                $table->string('price_range', 100)->nullable()->after('rating');
            }
        });
    }

    public function down(): void
    {
        Schema::table('umkms', function (Blueprint $table) {
            if (Schema::hasColumn('umkms', 'price_range')) {
                $table->dropColumn('price_range');
            }
        });
    }
};