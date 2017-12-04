<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    public $timestamps = false;


    public static function getByID(int $id)
    {
        return Setting::where('id', $id)->first();
    }


}
