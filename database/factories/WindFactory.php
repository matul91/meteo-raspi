<?php

use Faker\Generator as Faker;
use App\Models\Weather\Records\Wind;

$factory->define(Wind::class, function (Faker $faker) {
    
    return [
        'speed' => $faker->numberBetween(0, 160),
        'direction' => Wind::DIRECTIONS[$faker->numberBetween(0,15)],
        'date' => $faker->date()
    ];
});
