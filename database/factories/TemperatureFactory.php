<?php

use Faker\Generator as Faker;
use App\Models\Weather\Records\Temperature;

$factory->define(Temperature::class, function (Faker $faker) {
    return [
        'temperature' => $faker->numberBetween(0, 40),
        'date' => $faker->date()
    ];
});
