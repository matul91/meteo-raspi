<?php

namespace App;

use App\Weather\Record;

class Wind extends Record
{
    public static function addData(Request $request)
    {
        if ($request->has('windValue') and $request->has('windDirection')) {
            $valueSpeed = $request->input("windValue");
            $valueDirection = $request->input("windDirection");
            $data = new Wind();
            $data->speed = $valueSpeed;
            $data->direction = $valueDirection;
            $data->date = NOW();
            $data->save();
            return true;
        } else {
            return false;
        }
    }
}
