<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('processing_method_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('processing_method_id')->constrained()->onDelete('cascade');
            $table->integer('tahap_ke');
            $table->text('deskripsi_tahapan')->nullable();
            $table->string('gambar_tahapan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('processing_method_steps');
    }
};
