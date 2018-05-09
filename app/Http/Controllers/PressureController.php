<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Weather\Records\Pressure;

class PressureController extends Controller
{
    public function index()
    {
        return Pressure::loadData(request()->query('start_date'), request()->query('end_date'));
    }

    public function latest()
    {
        return Pressure::last();
    }

    public function store(Request $request)
    {
        $request->validate([
            'pressure' => 'required|numeric|between:900.00,1300.00',
        ]);
        Pressure::create($request->all());
    }
}
