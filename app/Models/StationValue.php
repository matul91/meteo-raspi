<?php
namespace App\Models;

use App\Model;

class StationValue extends Model
{
    protected $table = 'station_values';

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($query) {
            $query->date = now();
        });
    }

    protected $fillable = ['volt'];
}
