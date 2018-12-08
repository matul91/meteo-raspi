<?php

use Faker\Generator as Faker;
use \Illuminate\Support\Facades\File;

$factory->define(\App\Models\Photo::class, function (Faker $faker) {
    $pathGenerator = new \App\Storage\PhotoPathGenerator();
    $destinationPath = $pathGenerator->generateDestinationPath();

    $storageFolder = public_path() . DIRECTORY_SEPARATOR . $destinationPath;
    File::makeDirectory($storageFolder, 0755, true, true);

    $imageName = $faker->image($storageFolder, 1920, 1080, null, false);

    return [
        'name' => $destinationPath . DIRECTORY_SEPARATOR . $imageName,
        'metaInfo' => 'none'
    ];
});
