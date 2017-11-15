<?php

use Illuminate\Database\Seeder;

class WindsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Wind::class, 50)->create();
    }
}
