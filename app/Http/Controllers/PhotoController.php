<?php

namespace App\Http\Controllers;

use App\Photo;
use App\Token;

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

    public function savePhoto(\Illuminate\Http\Request $request)
    {
        $value = Photo::processImageFromApi($request);
        if ($value == true) {
            Token::sendPhotoNotification(
                'Upozornění Meteostanice!',
                'Někdo je na letišti!',
                ['url' => 'meteostanice.cz'],
                ['admin', 'modeller']
            );
            return response()->json("ok", 200);
        } else {
            return response()->json("error", 500);
        }
    }
}
