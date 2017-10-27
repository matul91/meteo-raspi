<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PressureController extends Controller
{
    public function index()
    {
        return \App\Pressure::limit(1000)->get();
    }
}
