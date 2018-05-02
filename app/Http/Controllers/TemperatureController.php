<?php

namespace App\Http\Controllers;

use App\Temperature;
use Illuminate\Http\Request;

class TemperatureController extends Controller
{
    public function index()
    {
        return Temperature::loadData(request()->query('start_date'), request()->query('end_date'));
    }

    public function latest()
    {
        return Temperature::getLastRecord();
    }

    public function store(Request $request)
    {
        $request->validate([
            'temperature' => 'required|numeric|between:-40.00,80.00',
        ]);
        Temperature::create($request->all());
    }

}
