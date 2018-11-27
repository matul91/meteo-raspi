<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Photo::class, function (Faker $faker) {

    $folderName =  env('PHOTO_FOLDER_PATH') . date("Y") . DIRECTORY_SEPARATOR . date("m");
    $storageFolder = "public" . DIRECTORY_SEPARATOR . $folderName;
    $imageName = $faker->image($storageFolder, 1920, 1080, null, false);

    return [
        'name' => $folderName . DIRECTORY_SEPARATOR . $imageName,
        'metaInfo' => 'none'
    ];
});
