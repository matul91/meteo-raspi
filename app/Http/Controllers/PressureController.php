<?php

namespace App\Http\Controllers;

use App\Pressure;
use App\Setting;
use Illuminate\Http\Request;

class PressureController extends Controller
{
    public function index()
    {
        $result = null;
        $maxValues = Setting::getByID(1)->value;
        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            $numRows = Pressure::where('date', '>=', request()->query('start_date'))
                ->where('date', '<=', request()->query('end_date'))
                ->get()->count();
            if ($maxValues <= $numRows) {
                $nthRows = $numRows / $maxValues;
                $nthRows = ceil($nthRows);
                $result = Pressure::where('date', '>=', request()->query('start_date'))
                    ->where('date', '<=', request()->query('end_date'))
                    ->whereRaw('id mod ' . $nthRows . ' = 0')
                    ->get();
            } else {
                $result = Pressure::where('date', '>=', request()->query('start_date'))
                    ->where('date', '<=', request()->query('end_date'))
                    ->get();
            }
        } else {
            $numRows = Pressure::get()->count();
            if ($maxValues <= $numRows) {
                $nthRows = $numRows / $maxValues;
                $nthRows = ceil($nthRows);
                $result = Pressure::whereRaw('id mod ' . $nthRows . ' = 0')->get();
            } else {
                $result = Pressure::get();
            }
        }
        return $result;
    }
}
