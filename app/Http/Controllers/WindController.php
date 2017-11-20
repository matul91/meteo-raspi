<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WindController extends Controller
{
    public function index()
    {

        if(request()->query('limit') != ''){
            $limit = request()->query('limit');
        }else{
            $limit = 1000;
        }

        return \App\Wind::limit($limit)->get();
    }

    public function latest()
    {
        return \App\Wind::orderBy('date', 'desc')->first();
    }
}
