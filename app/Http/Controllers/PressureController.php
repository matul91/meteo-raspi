<?php

namespace App\Http\Controllers;

use App\Pressure;
use App\Setting;
use Faker\Provider\Person;
use Illuminate\Http\Request;

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
