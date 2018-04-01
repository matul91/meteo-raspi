<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    public $timestamps = false;


    public static function getByID(string $name)
    {
        return Setting::where('name', $name)->first();
    }
}
