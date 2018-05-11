<?php

namespace App\Http\Controllers;

use App\Models\Voltage;
use Illuminate\Http\Request;

class VoltageController extends Controller
{
    public function latest()
    {
        return Voltage::getLastRecord();
    }

    public function store(Request $request)
    {
        $request->validate([
            'volt' => 'required|numeric|between:7.00,20.00',
        ]);
        Voltage::create($request->all());
    }
}
