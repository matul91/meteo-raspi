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
        self::deleteDirectory('public/images/photos');

        self::createDir('public/images');
        self::createDir('public/images/photos/');
        self::createDir('public/images/photos/' . date('Y') . '/');
        self::createDir('public/images/photos/' . date('Y') . '/' . date('m'));

        factory(App\Photo::class, 20)->create();
    }

    private static function createDir($path)
    {
        if (!file_exists($path)) {
            mkdir($path, 0700);
        }
    }


    private static function deleteDirectory($dir)
    {
        $result = null;
        if (!file_exists($dir)) {
            return true;
        }

        if (!is_dir($dir)) {
            return unlink($dir);
        }

        $result = self::deleteScanDirectory($dir);

        if ($result == null) {
            return rmdir($dir);
        }

        return $result;

    }

    private static function deleteScanDirectory($dir)
    {
        foreach (scandir($dir) as $item) {
            if (self::checkScanDirForDeleteDir($item) == true) {
                continue;
            }

            return self::checkDeleteFolderByDirectorySeparator($dir, $item);

        }
    }

    private static function checkScanDirForDeleteDir($item)
    {
        if ($item == '.' || $item == '..') {
            return true;
        }
    }

    private static function checkDeleteFolderByDirectorySeparator($dir, $item)
    {
        if (!self::deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }
}
