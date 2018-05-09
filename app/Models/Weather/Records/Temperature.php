<?php

namespace App\Models\Weather\Records;

use App\Models\Weather\Record;

class Temperature extends Record
{
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($query) {
            $query->date = now();
        });
    }

    protected $fillable = ['temperature'];
}
