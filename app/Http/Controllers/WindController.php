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

    public function store(Request $request)
    {
        $request->validate([
            'speed' => 'required|numeric|between:0.00,160.00',
            'direction' => 'required|in:' . implode(",", Wind::DIRECTIONS)
        ]);
        Wind::create($request->all());
    }
}
