<?php

namespace App\Models\Weather\Records;

use App\Models\Weather\Record;

class Wind extends Record
{
    protected $fillable = ['speed', 'direction'];
}
