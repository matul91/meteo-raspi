<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    const DATE_FORMAT_IMAGE_NAME = "Y-m-d-G-i-s";
    const DATE_FORMAT_SORTING_BY_DATE = "Y/m";

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

    private static function saveImage($file)
    {
        $destinationPath = env('RASPI_PHOTO_FOLDER_PATH') . date(self::DATE_FORMAT_SORTING_BY_DATE);
        $filename = date(self::DATE_FORMAT_IMAGE_NAME) . "." . $file->getClientOriginalExtension();
        $file = $file->move($destinationPath, $filename);
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
            $file = self::saveImage($request->file('photo'));
            self::saveInfoToDatabase($file->getPathInfo(), $file->getBasename(), $request);
            $result = "Complete!";
        } else {
            $result = "Not found image!";
        }
        return $result;
    }
}
