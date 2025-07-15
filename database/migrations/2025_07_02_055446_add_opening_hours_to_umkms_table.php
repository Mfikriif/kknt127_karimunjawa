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
            // Tambah kolom untuk social media
            if (!Schema::hasColumn('umkms', 'instagram')) {
                $table->string('instagram')->nullable()->after('contact');
            }
            if (!Schema::hasColumn('umkms', 'facebook')) {
                $table->string('facebook')->nullable()->after('instagram');
            }
            // Tambah kolom untuk opening hours
            if (!Schema::hasColumn('umkms', 'opening_hours')) {
                $table->json('opening_hours')->nullable()->after('facebook');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('umkms', function (Blueprint $table) {
            $columnsToDrop = [];
            
            if (Schema::hasColumn('umkms', 'instagram')) {
                $columnsToDrop[] = 'instagram';
            }
            if (Schema::hasColumn('umkms', 'facebook')) {
                $columnsToDrop[] = 'facebook';
            }
            if (Schema::hasColumn('umkms', 'opening_hours')) {
                $columnsToDrop[] = 'opening_hours';
            }
            
            if (!empty($columnsToDrop)) {
                $table->dropColumn($columnsToDrop);
            }
        });
    }
};