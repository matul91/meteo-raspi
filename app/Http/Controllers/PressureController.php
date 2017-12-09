<?php

namespace App\Http\Controllers;

use App\Pressure;


class PressureController extends Controller
{
    public function index()
    {
        return Pressure::getDataForIndex();
    }

    public function latest()
    {
        return Pressure::getLastDateRow();
    }
}
