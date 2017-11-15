<?php

use Faker\Generator as Faker;

$factory->define(\App\Temperature::class, function (Faker $faker) {
    return [
        'temperature' => $faker->numberBetween(0, 40),
        'date' => $faker->date()
    ];
});
