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
        Schema::create('umkms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('owner');
            $table->enum('category', [
                'Ikan & Seafood',
                'Rumput Laut', 
                'Warung & Kuliner',
                'Kerajinan',
                'Jasa'
            ]);
            $table->text('description');
            $table->string('address');
            $table->json('products'); // Array of products
            $table->string('contact');
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('image')->nullable(); // Emoji or image path
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umkms');
    }
};