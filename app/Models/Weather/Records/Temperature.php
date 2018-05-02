<?php

use App\Weather\Record;

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
