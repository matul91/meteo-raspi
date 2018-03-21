<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

define("DATE_FORMAT_IMAGE_NAME", date("Y-m-d-G-i-s"));
define("DATE_FORMAT_SORTING_BY_DATE", date("Y") . "/" . date("m"));
class Photo extends Model
{
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

    private static function saveImageFromRaspi(\Illuminate\Http\Request $request)
    {
        $destinationPath = env('RASPI_PHOTO_FOLDER_PATH') . DATE_FORMAT_SORTING_BY_DATE;
        $file = $request->file('photo');
        $filename = DATE_FORMAT_IMAGE_NAME . "." . $file->getClientOriginalExtension();
        $file = $request->file('photo')->move($destinationPath, $filename);
        return $file;
    }

    private static function saveInfoToDatabase(string $pathInfo, string $baseName, \Illuminate\Http\Request $request)
    {
        $photo = new Photo;
        $photo->name = "public/" . $pathInfo . "/" . $baseName;
        if ($request->input("metaInfo")) {
            $photo->metaInfo = $request->input("metaInfo");
        } else {
            $photo->metaInfo = "None";
        }
        $photo->save();
    }

    public static function processImageFromApi(\Illuminate\Http\Request $request)
    {
        if ($request->hasFile('photo')) {
            $file = self::saveImageFromRaspi($request);
            self::saveInfoToDatabase($file->getPathInfo(), $file->getBasename(), $request);
            $result = "Complete!";
        } else {
            $result = "Not found image!";
        }
        return $result;
    }
}
