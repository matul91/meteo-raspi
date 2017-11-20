<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PressureController extends Controller
{
    public function index()
    {
        if(request()->query('limit') != ''){
            $limit = request()->query('limit');
        }else{
            $limit = 1000;
        }

        return \App\Pressure::limit($limit)->get();
    }
}
