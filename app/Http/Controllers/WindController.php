<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Weather\Records\Wind;

class WindController extends Controller
{
    public function index()
    {
        return Wind::loadData(request()->query('start_date'), request()->query('end_date'));
    }

    public function latest()
    {
        return Wind::last();
    }

    public function addData(Request $request)
    {
        $value = Wind::addData($request);
        if ($value == true) {
            return response()->json("ok", 200);
        } else {
            return response()->json("error", 500);
        }
    }
}
