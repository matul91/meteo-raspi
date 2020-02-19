<?php

namespace App\Models\Station;

use App\Models\Weather\Record;

class BatteryStatus extends Record
{
    protected $fillable = ['voltage'];
}
