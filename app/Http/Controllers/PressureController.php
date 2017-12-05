<?php

namespace App\Http\Controllers;

use App\Pressure;
use App\Setting;
use Faker\Provider\Person;
use Illuminate\Http\Request;

class PressureController extends Controller
{
    public function index()
    {
        $result = null;
        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            if (Pressure::getSettingMaxValuesPerGraph() <= Pressure::getCountRowsByDate(request()->query('start_date'), request()->query('end_date'))) {
                $result = Pressure::getOptimizedDataByDate(request()->query('start_date'), request()->query('end_date'));
            } else {
                $result = Pressure::getDataByDate(request()->query('start_date'), request()->query('end_date'));
            }
        } else {
            if (Pressure::getSettingMaxValuesPerGraph() <= Pressure::getCountRows()) {
                $result = Pressure::whereRaw('id mod ' . Pressure::getNthRows(Pressure::getCountRows()) . ' = 0')->get();
            } else {
                $result = Pressure::get();
            }
        }
        return $result;
    }

    public function latest()
    {
        return Pressure::getLastDateRow();
    }
}
