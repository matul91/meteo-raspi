<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use App\Temperature;

class TemperatureController extends Controller
{
    public function index()
    {
        $result = null;
        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            if (Temperature::getSettingMaxValuesPerGraph() <= Temperature::getCountRowsByDate(request()->query('start_date'), request()->query('end_date'))) {
                $result = Temperature::getOptimizedDataByDate(request()->query('start_date'), request()->query('end_date'));
            } else {
                $result = Temperature::getDataByDate(request()->query('start_date'), request()->query('end_date'));
            }
        } else {
            if (Temperature::getSettingMaxValuesPerGraph() <= Temperature::getCountRows()) {
                $result = Temperature::whereRaw('id mod ' . Temperature::getNthRows(Temperature::getCountRows()) . ' = 0')->get();
            } else {
                $result = Temperature::get();
            }
        }
        return $result;
    }

    public function latest()
    {
        return Temperature::getLastDateRow();
    }
}