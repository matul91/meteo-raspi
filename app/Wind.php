<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wind extends Model
{
    public $timestamps = false;

    public static function getDataForIndex(){
        $result = null;
        if (request()->query('start_date') != '' && request()->query('end_date') != '') {
            if (self::getSettingMaxValuesPerGraph() <= self::getCountRowsByDate(request()->query('start_date'), request()->query('end_date'))) {
                $result = self::getOptimizedDataByDate(request()->query('start_date'), request()->query('end_date'));
            } else {
                $result = self::getDataByDate(request()->query('start_date'), request()->query('end_date'));
            }
        } else {
            if (self::getSettingMaxValuesPerGraph() <= self::getCountRows()) {
                $result = self::whereRaw('id mod ' . self::getNthRows(self::getCountRows()) . ' = 0')->get();
            } else {
                $result = self::get();
            }
        }
        return $result;

    }

    public static function getCountRowsByDate(string $startDate, string $endDate){
        return self::where('date', '>=', $startDate)
            ->where('date', '<=', $endDate)
            ->get()->count();
    }

    public static function getCountRows(){
        return self::get()->count();

    }

    public static function getSettingMaxValuesPerGraph(){
        return Setting::getByID(1)->value;
    }

    public static function getNthRows(int $numRows){
        return ceil($numRows / self::getSettingMaxValuesPerGraph());
    }

    public static function getOptimizedDataByDate(string $startDate, string $endDate){
        return self::where('date', '>=', $startDate)
            ->where('date', '<=', $endDate)
            ->whereRaw('id mod ' . self::getNthRows(self::getCountRowsByDate($startDate, $endDate)) . ' = 0')
            ->get();
    }

    public static function getDataByDate(string $startDate, string $endDate){
        return self::where('date', '>=', $startDate)
            ->where('date', '<=', $endDate)
            ->get();
    }

    public static function getLastDateRow(){
        return self::orderBy('date', 'desc')->first();
    }
}
