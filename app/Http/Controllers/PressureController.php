<?php

namespace App\Http\Controllers;

use App\Pressure;
use Illuminate\Http\Request;

class PressureController extends Controller
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
            $result = Pressure::where('date', '>=', request()->query('start_date'))
                ->where('date', '<=', request()->query('end_date'))
                ->limit($limit)
                ->get();
        } else {
            $result = Pressure::limit($limit)->get();
        }

        return $result;
    }
}
