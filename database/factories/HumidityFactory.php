<?php

use Faker\Generator as Faker;
use App\Models\Weather\Records\Humidity;

$factory->define(Humidity::class, function (Faker $faker) {
    return [
        'humidity' => $faker->numberBetween(0, 100),
        'date' => $faker->date()
    ];
});
