<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Photo extends Model
{
    const DATE_FORMAT_IMAGE_NAME = "Y-m-d-G-i-s";
    const DATE_FORMAT_SORTING_BY_DATE = "Y/m";
    const PUBLIC_FOLDER = "public";

    public static function getCountRows()
    {
        return self::get()->count();
    }

    public static function getAllRows()
    {
        return self::get();
    }

    public static function getLastRecord()
    {
        return self::orderBy('id', 'desc')->first();
    }

    public static function latest(int $limit = 5)
    {
        return self::limit($limit)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    private static function saveImage($file)
    {
        $destinationPath = env('PHOTO_FOLDER_PATH') . date(self::DATE_FORMAT_SORTING_BY_DATE);
        $filename = date(self::DATE_FORMAT_IMAGE_NAME) . "." . $file->getClientOriginalExtension();
        $file = $file->move($destinationPath, $filename);
        return $file;
    }

    private static function saveInfoToDatabase(string $pathInfo, string $baseName, \Illuminate\Http\Request $request)
    {
        $photo = new Photo();
        $photo->name = $pathInfo . "/" . $baseName;
        if ($request->input("metaInfo")) {
            $photo->metaInfo = $request->input("metaInfo");
        } else {
            $photo->metaInfo = "None";
        }
        $photo->save();

        return $photo;
    }

    public static function processImageFromApi(\Illuminate\Http\Request $request)
    {
        if ($request->hasFile('photo')) {
            $file = self::saveImage($request->file('photo'));
            return self::saveInfoToDatabase($file->getPathInfo(), $file->getBasename(), $request);
        }

        return null;
    }
}
