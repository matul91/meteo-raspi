<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Temperature;

class TemperatureController extends Controller
{
    public function index()
    {
        $result = null;

        if(request()->query('limit') != ''){
            $limit = request()->query('limit');
        }else{
            $limit = 1000;
        }

        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            $result = Temperature::where('date', '>=', request()->query('start_date'))
                ->where('date', '<=', request()->query('end_date'))
                ->limit($limit)
                ->get();
        } else {
            $result = Temperature::limit($limit)->get();
        }

        return $result;

    }
}