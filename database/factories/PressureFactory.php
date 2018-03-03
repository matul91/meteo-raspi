<?php

use Faker\Generator as Faker;

$factory->define(\App\Pressure::class, function (Faker $faker) {
    return [
        'pressure' => $faker->numberBetween(0, 2000),
        'date' => $faker->date()
    ];
});
