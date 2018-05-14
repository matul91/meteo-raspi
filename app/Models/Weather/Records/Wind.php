<?php

namespace App\Models\Weather\Records;

use App\Models\Weather\Record;

class Wind extends Record
{
    const DIRECTIONS = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];

    protected $fillable = ['speed', 'direction'];
}
