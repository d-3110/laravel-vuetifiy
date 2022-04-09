<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create(['name' => 'Lara太郎', 'email' => 'hoge@example.com']);
        \App\Models\User::factory(10)->create();
    }
}
