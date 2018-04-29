<?php

namespace App\Http\Controllers;

use App\Temperature;
use Illuminate\Http\Request;

class TemperatureController extends Controller
{
    public function index()
    {
        return Temperature::loadData(request()->query('start_date'), request()->query('end_date'));
    }

    public function latest()
    {
        return Temperature::getLastRecord();
    }

    public function addData(Request $request)
    {
        $value = Temperature::addData($request);
        if ($value == true) {
            return response()->json("ok", 200);
        } else {
            return response()->json("error", 500);
        }
    }
}
