<?php

namespace App\Http\Controllers;

use App\Wind;
use Illuminate\Http\Request;

class WindController extends Controller
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
            $result = Wind::where('date', '>=', request()->query('start_date'))
                ->where('date', '<=', request()->query('end_date'))
                ->limit($limit)
                ->get();
        } else {
            $result = Wind::limit($limit)->get();
        }

        return $result;
    }

    public function latest()
    {
        return Wind::orderBy('date', 'desc')->first();
    }
}
