<?php

namespace App\Http\Controllers;

use App\Photo;

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
}
