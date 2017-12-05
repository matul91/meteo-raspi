<?php

namespace App\Http\Controllers;

use App\Setting;
use App\Wind;
use Illuminate\Http\Request;

class WindController extends Controller
{
    public function index()
    {
        $result = null;
        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            if (Wind::getSettingMaxValuesPerGraph() <= Wind::getCountRowsByDate(request()->query('start_date'), request()->query('end_date'))) {
                $result = Wind::getOptimizedDataByDate(request()->query('start_date'), request()->query('end_date'));
            } else {
                $result = Wind::getDataByDate(request()->query('start_date'), request()->query('end_date'));
            }
        } else {
            if (Wind::getSettingMaxValuesPerGraph() <= Wind::getCountRows()) {
                $result = Wind::whereRaw('id mod ' . Wind::getNthRows(Wind::getCountRows()) . ' = 0')->get();
            } else {
                $result = Wind::get();
            }
        }
        return $result;
    }

    public function latest()
    {
        return Wind::getLastDateRow();
    }
}
