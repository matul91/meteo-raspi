<?php

namespace App\Http\Controllers;

use App\Setting;
use App\Wind;
use Illuminate\Http\Request;

class WindController extends Controller
{
    public function index()
    {

        $result = null;
        $maxValues = Setting::getByID(1)->value;
        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            $numRows = Wind::where('date', '>=', request()->query('start_date'))
                ->where('date', '<=', request()->query('end_date'))
                ->get()->count();
            if ($maxValues <= $numRows) {
                $nthRows = $numRows / $maxValues;
                $nthRows = ceil($nthRows);
                $result = Wind::where('date', '>=', request()->query('start_date'))
                    ->where('date', '<=', request()->query('end_date'))
                    ->whereRaw('id mod ' . $nthRows . ' = 0')
                    ->get();
            } else {
                $result = Wind::where('date', '>=', request()->query('start_date'))
                    ->where('date', '<=', request()->query('end_date'))
                    ->get();
            }
        } else {
            $numRows = Wind::get()->count();
            if ($maxValues <= $numRows) {
                $nthRows = $numRows / $maxValues;
                $nthRows = ceil($nthRows);
                $result = Wind::whereRaw('id mod ' . $nthRows . ' = 0')->get();
            } else {
                $result = Wind::get();
            }
        }

        return $result;
    }

    public function latest()
    {
        return \App\Wind::orderBy('date', 'desc')->first();
    }
}
