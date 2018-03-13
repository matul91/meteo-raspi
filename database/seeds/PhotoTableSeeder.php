<?php

use Illuminate\Database\Seeder;

class PhotoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        self::rrmdir('public/images/photoFromRaspi');
        mkdir('public/images/photoFromRaspi/');
        mkdir('public/images/photoFromRaspi/' . date("Y") . "/");
        mkdir('public/images/photoFromRaspi/' . date("Y") . "/" . date("m"));
        factory(App\Photo::class, 20)->create();
    }

    public static function rrmdir($dir) {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (filetype($dir."/".$object) == "dir")
                        self::rrmdir($dir."/".$object);
                    else unlink   ($dir."/".$object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }
}
