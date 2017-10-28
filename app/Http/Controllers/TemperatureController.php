<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TemperatureController extends Controller
{
    public function index()
    {
        return \App\Temperature::limit(1000)->get();
    }
}
