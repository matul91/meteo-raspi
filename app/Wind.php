<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wind extends Model
{
    public $timestamps = false;

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
