<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AdminActivity;

class AdminActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Biarkan kosong agar tidak ada aktivitas dummy
        // Semua aktivitas akan dicatat melalui controller saat create/update/delete

        // Contoh (hanya jika butuh dummy testing):
        /*
        AdminActivity::create([
            'description' => 'Seeder testing: Admin menambahkan data awal',
            'admin_id' => 1, // pastikan admin_id = 1 sudah ada
        ]);
        */
    }
}
