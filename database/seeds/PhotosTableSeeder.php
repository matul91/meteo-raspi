<?php

use Illuminate\Database\Seeder;

class PhotosTableSeeder extends Seeder
{
    public function run()
    {
        factory(\App\Models\Photo::class, 3)->create();
    }

}
