<?php

namespace App\Http\Controllers;


use App\Wind;


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
