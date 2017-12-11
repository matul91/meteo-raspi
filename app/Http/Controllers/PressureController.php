<?php

namespace App\Http\Controllers;

use App\Pressure;


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

    public function latest()
    {
        return Pressure::orderBy('date', 'desc')->first();
    }
}
