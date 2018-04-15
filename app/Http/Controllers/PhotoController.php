<?php

namespace App\Http\Controllers;

use App\Photo;
use Illuminate\Support\Facades\Input;

class PhotoController extends Controller
{
    public function index()
    {
        return Photo::getLastRecord();
    }

    public function all(\Illuminate\Http\Request $request)
    {
        return Photo::getAllRows($request);
    }

    public function last()
    {
        return Photo::getLastRecord();
    }

    public function lastDetection()
    {
        return Photo::getLastDetectionRecord();
    }

    public function savePhoto(\Illuminate\Http\Request $request)
    {
        $value = Photo::processImageFromApi($request);
        if ($value == true) {
            return response()->json("ok", 200);
        } else {
            return response()->json("error", 500);
        }
    }
}
