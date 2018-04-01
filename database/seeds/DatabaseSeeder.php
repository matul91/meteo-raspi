<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PhotosTableSeeder::class,
            UsersTableSeeder::class,
            PressuresTableSeeder::class,
            TemperaturesTableSeeder::class,
            WindsTableSeeder::class,
            SettingsTableSeeder::class,
        ]);
    }
}
