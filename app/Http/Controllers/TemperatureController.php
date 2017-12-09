<?php

namespace App\Http\Controllers;


use App\Temperature;

class TemperatureController extends Controller
{
    public function index()
    {
        return Temperature::getDataForIndex();
    }

    public function latest()
    {
        return Temperature::getLastDateRow();
    }
}