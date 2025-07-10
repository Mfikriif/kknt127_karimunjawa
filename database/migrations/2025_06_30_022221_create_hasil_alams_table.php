<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('hasil_alams', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->enum('kategori', ['laut', 'darat']); 
            $table->string('gambar')->nullable();  
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hasil_alams');
    }
};
