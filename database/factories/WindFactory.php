<?php

use Faker\Generator as Faker;

$factory->define(\App\Wind::class, function (Faker $faker) {
    $windDirections = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW'
    ];

    return [
        'speed' => $faker->numberBetween(0, 160),
        'direction' => $windDirections[$faker->numberBetween(0,15)],
        'date' => $faker->date()
    ];
});
