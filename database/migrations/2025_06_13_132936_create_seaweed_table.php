<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seaweed_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('characteristics')->nullable();
            $table->text('benefits')->nullable();
            $table->string('image')->nullable(); 
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seaweed_types');
    }
};
