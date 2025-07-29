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
            // Add new fields for enhanced UMKM detail page
            if (!Schema::hasColumn('umkms', 'price_range')) {
                $table->string('price_range')->nullable()->after('rating');
            }
            if (!Schema::hasColumn('umkms', 'website')) {
                $table->string('website')->nullable()->after('facebook');
            }
            if (!Schema::hasColumn('umkms', 'email')) {
                $table->string('email')->nullable()->after('website');
            }
            if (!Schema::hasColumn('umkms', 'facilities')) {
                $table->json('facilities')->nullable()->after('email');
            }
            if (!Schema::hasColumn('umkms', 'opening_hours')) {
                $table->json('opening_hours')->nullable()->after('facilities');
            }
            if (!Schema::hasColumn('umkms', 'display_photos')) {
                $table->json('display_photos')->nullable()->after('image');
            }
            if (!Schema::hasColumn('umkms', 'menu_photo')) {
                $table->string('menu_photo')->nullable()->after('display_photos');
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
            
            if (Schema::hasColumn('umkms', 'price_range')) {
                $columnsToDrop[] = 'price_range';
            }
            if (Schema::hasColumn('umkms', 'website')) {
                $columnsToDrop[] = 'website';
            }
            if (Schema::hasColumn('umkms', 'email')) {
                $columnsToDrop[] = 'email';
            }
            if (Schema::hasColumn('umkms', 'facilities')) {
                $columnsToDrop[] = 'facilities';
            }
            if (Schema::hasColumn('umkms', 'opening_hours')) {
                $columnsToDrop[] = 'opening_hours';
            }
            if (Schema::hasColumn('umkms', 'display_photos')) {
                $columnsToDrop[] = 'display_photos';
            }
            if (Schema::hasColumn('umkms', 'menu_photo')) {
                $columnsToDrop[] = 'menu_photo';
            }
            
            if (!empty($columnsToDrop)) {
                $table->dropColumn($columnsToDrop);
            }
        });
    }
};