<?php

use Faker\Generator as Faker;
use App\Models\Weather\Records\Pressure;

$factory->define(Pressure::class, function (Faker $faker) {
    return [
        'pressure' => $faker->numberBetween(0, 2000),
        'date' => $faker->date()
    ];
});
