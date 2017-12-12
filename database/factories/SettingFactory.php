<?php

use Faker\Generator as Faker;

$factory->define(\App\Setting::class, function () {
    return [
        'name' => "defaltName",
        'value' => 0
    ];
});
