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
            PhotoTableSeeder::class,
            UsersTableSeeder::class,
            PressuresTableSeeder::class,
            TemperaturesTableSeeder::class,
            WindsTableSeeder::class,
            SettingsTableSeeder::class,
        ]);
    }
}
