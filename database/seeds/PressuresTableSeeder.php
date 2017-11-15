<?php

use Illuminate\Database\Seeder;

class PressuresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Pressure::class, 50)->create();
    }
}
