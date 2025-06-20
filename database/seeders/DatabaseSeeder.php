<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User biasa (dengan pengecekan duplikat)
        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'role' => 'user',
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]
        );

        // Admin dan data lainnya
        $this->call([
            AdminUserSeeder::class,
       
        ]);
    }
}
