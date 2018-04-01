<?php

namespace App\Http\Controllers;

use App\Wind;

class WindController extends Controller
{
    public function index()
    {
        return Wind::loadData(request()->query('start_date'), request()->query('end_date'));
    }

    public function latest()
    {
        return Wind::getLastRecord();
    }
}
