<?php

namespace App\Models\Weather;

use App\Model;
use App\Setting;

abstract class Record extends Model
{
    public $timestamps = false;

    public static function loadData(string $from = null, string $to = null)
    {
        $result = null;
        if ($from != '' && $to != '') {
            $result = self::loadDataWithDate($from, $to);
        } else {
            $result = self::loadDataWithoutDate();
        }
        return $result;
    }

    private static function loadDataWithDate($from, $to)
    {
        if (self::getSettingMaxValuesPerGraph() <= self::getCountRowsByDate($from, $to)) {
            $result = self::getOptimizedDataByDate($from, $to);
        } else {
            $result = self::getDataByDate($from, $to);
        }
        return $result;
    }

    private static function loadDataWithoutDate()
    {
        if (self::getSettingMaxValuesPerGraph() <= self::getCountRows()) {
            $result = self::whereRaw('id mod ' . self::getNthRows(self::getCountRows()) . ' = 0')->get();
        } else {
            $result = self::get();
        }
        return $result;
    }

    private static function getCountRowsByDate(string $startDate, string $endDate)
    {
        return self::where('date', '>=', $startDate)
            ->where('date', '<=', $endDate)
            ->get()->count();
    }

    private static function getCountRows()
    {
        return self::get()->count();
    }

    public static function getSettingMaxValuesPerGraph()
    {
        return Setting::getByID("max_data_per_graph")->value;
    }

    private static function getNthRows(int $numRows)
    {
        return ceil($numRows / self::getSettingMaxValuesPerGraph());
    }

    private static function getOptimizedDataByDate(string $startDate, string $endDate)
    {
        return self::where('date', '>=', $startDate)
            ->where('date', '<=', $endDate)
            ->whereRaw('id mod ' . self::getNthRows(self::getCountRowsByDate($startDate, $endDate)) . ' = 0')
            ->get();
    }

    private static function getDataByDate(string $startDate, string $endDate)
    {
        return self::where('date', '>=', $startDate)
            ->where('date', '<=', $endDate)
            ->get();
    }

    public static function last()
    {
        return self::orderBy('date', 'desc')->first();
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($query) {
            $query->date = now();
        });
    }
}
