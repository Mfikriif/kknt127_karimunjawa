<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Cek dulu apakah kolom sudah ada
        if (!\Schema::hasColumn('umkms', 'opening_hours')) {
            Schema::table('umkms', function (Blueprint $table) {
                $table->json('opening_hours')->nullable()->after('facebook');
            });
        }
    }

    public function down(): void
    {
        Schema::table('umkms', function (Blueprint $table) {
            if (\Schema::hasColumn('umkms', 'opening_hours')) {
                $table->dropColumn('opening_hours');
            }
        });
    }
};