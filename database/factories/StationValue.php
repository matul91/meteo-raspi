<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Voltage::class, function (Faker $faker) {
    return [
        'volt' => $faker->numberBetween(0, 20),
        'date' => $faker->date()
    ];
});
