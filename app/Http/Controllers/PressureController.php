<?php

namespace App\Http\Controllers;

use App\Pressure;
use Illuminate\Http\Request;

class PressureController extends Controller
{
    public function index()
    {
        return Pressure::loadData(request()->query('start_date'), request()->query('end_date'));
    }

    public function latest()
    {
        return Pressure::getLastRecord();
    }

    public function addData(Request $request)
    {
        $value = Pressure::addData($request);
        if ($value == true) {
            return response()->json("ok", 200);
        } else {
            return response()->json("error", 500);
        }
    }
}
