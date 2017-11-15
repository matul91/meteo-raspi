<?php

use Illuminate\Database\Seeder;

class TemperaturesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Temperature::class, 50)->create();
    }
}
