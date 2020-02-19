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
            RolesTableSeeder::class,
            PhotosTableSeeder::class,
            UsersTableSeeder::class,
            PressuresTableSeeder::class,
            TemperaturesTableSeeder::class,
            WindsTableSeeder::class,
            HumidityTableSeeder::class,
            SettingsTableSeeder::class,
            BatteryStatusTableSeeder::class,
            NetworkStatusTableSeeder::class,
        ]);
    }
}
