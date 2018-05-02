<?php

namespace App\Models\Weather\Records;

use App\Weather\Record;
use Illuminate\Http\Request;

class Pressure extends Record
{
    public static function addData(Request $request)
    {
        if ($request->has('pressureValue')) {
            $value = $request->input("pressureValue");
            $data = new Pressure();
            $data->pressure = $value;
            $data->date = NOW();
            $data->save();
            return true;
        } else {
            return false;
        }
    }
}
