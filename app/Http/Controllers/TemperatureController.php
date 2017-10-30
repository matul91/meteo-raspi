<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Temperature;

class TemperatureController extends Controller
{
    public function index()
    {
        $result;

        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            $result = Temperature::where('date', '>=', request()->query('start_date'))
                ->where('date', '<=', request()->query('end_date'))
                ->get();
        } else {
            $result = Temperature::limit(100)->get();
        }

        return $result;

    }
}