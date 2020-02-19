<?php

use Faker\Generator as Faker;
use App\Models\Station\NetworkStatus;

$factory->define(NetworkStatus::class, function (Faker $faker) {

    return [
        'signal_strength' => $faker->numberBetween(0, 30),
        'date' => $faker->date()
    ];
});
