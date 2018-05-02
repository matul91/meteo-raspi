<?php

namespace App;

class Temperature extends Model
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
