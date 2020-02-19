<?php

namespace App\Models\Station;

use App\Models\Weather\Record;

class NetworkStatus extends Record
{
    protected $fillable = ['signal_strength'];
}
