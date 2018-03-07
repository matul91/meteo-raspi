<?php

namespace App\Http\Controllers;

use App\User;
class TestController extends Controller
{


    public function index(\Illuminate\Http\Request $request)
    {

        return User::getUserIdFromToken($request);

    }
}
