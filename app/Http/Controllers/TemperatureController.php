<?php

namespace App\Http\Controllers;

use App\Temperature;

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
}
