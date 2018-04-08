<?php

use Illuminate\Database\Seeder;

class PhotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        self::deleteDirectory('public/images/photos');

        self::createDir('public/images/photos/' . date('Y') . '/' . date('m'));

        factory(App\Photo::class, 20)->create();
    }

    private static function createDir($path)
    {
        File::makeDirectory($path, 0775, true);
    }


    private static function deleteDirectory($dir)
    {
        File::deleteDirectory($dir);
    }

}
