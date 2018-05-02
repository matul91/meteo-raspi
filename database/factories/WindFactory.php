<?php

use Faker\Generator as Faker;
use App\Models\Weather\Records\Wind;

$factory->define(Wind::class, function (Faker $faker) {
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
