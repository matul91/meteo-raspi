<?php

namespace App\Http\Controllers;

use App\Models\StationValue;
use Illuminate\Http\Request;

class StationValueController extends Controller
{
    public function latest()
    {
        return StationValue::getLastRecord();
    }

    public function store(Request $request)
    {
        $request->validate([
            'volt' => 'required|numeric|between:0.00,20.00',
        ]);
        StationValue::create($request->all());
    }
}
