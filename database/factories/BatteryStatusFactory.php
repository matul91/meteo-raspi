<?php

use Faker\Generator as Faker;
use App\Models\Station\BatteryStatus;

$factory->define(BatteryStatus::class, function (Faker $faker) {

    return [
        'voltage' => $faker->numberBetween(3.1, 4.2),
        'date' => $faker->date()
    ];
});
