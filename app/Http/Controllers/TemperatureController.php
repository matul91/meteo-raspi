<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use App\Temperature;

class TemperatureController extends Controller
{
    public function index()
    {
        $result = null;
        $maxValues = Setting::getByID(1)->value;
        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            $numRows = Temperature::where('date', '>=', request()->query('start_date'))
                ->where('date', '<=', request()->query('end_date'))
                ->get()->count();
            if ($maxValues <= $numRows) {
                $nthRows = $numRows / $maxValues;
                $nthRows = ceil($nthRows);
                $result = Temperature::where('date', '>=', request()->query('start_date'))
                    ->where('date', '<=', request()->query('end_date'))
                    ->whereRaw('id mod ' . $nthRows . ' = 0')
                    ->get();
            } else {
                $result = Temperature::where('date', '>=', request()->query('start_date'))
                    ->where('date', '<=', request()->query('end_date'))
                    ->get();
            }
        } else {
            $numRows = Temperature::get()->count();
            if ($maxValues <= $numRows) {
                $nthRows = $numRows / $maxValues;
                $nthRows = ceil($nthRows);
                $result = Temperature::whereRaw('id mod ' . $nthRows . ' = 0')->get();
            } else {
                $result = Temperature::get();
            }
        }

        return $result;

    }
}