<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('admin_activities', function (Blueprint $table) {
            if (!Schema::hasColumn('admin_activities', 'admin_id')) {
                $table->integer('admin_id')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('admin_activities', function (Blueprint $table) {
            if (Schema::hasColumn('admin_activities', 'admin_id')) {
                $table->dropColumn('admin_id');
            }
        });
    }
};