<?php

namespace App;

use App\Model;
use Illuminate\Http\Request;

class Temperature extends Model
{
    public static function addData(Request $request)
    {
        if ($request->has('temperatureValue')) {
            $value = $request->input("temperatureValue");
            $data = new Temperature();
            $data->temperature = $value;
            $data->date = NOW();
            $data->save();
            return true;
        }else{
            return false;
        }
    }
}
