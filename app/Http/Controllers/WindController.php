<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WindController extends Controller
{
    public function index()
    {
        return \App\Wind::limit(1000)->get();
    }

    public function latest()
    {
        return \App\Wind::orderBy('date', 'desc')->first();
    }
}
