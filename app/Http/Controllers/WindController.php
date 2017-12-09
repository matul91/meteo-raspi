<?php

namespace App\Http\Controllers;

use App\Setting;
use App\Wind;
use Illuminate\Http\Request;

class WindController extends Controller
{
    public function index()
    {
        return Wind::getDataForIndex();
    }

    public function latest()
    {
        return Wind::getLastDateRow();
    }
}
