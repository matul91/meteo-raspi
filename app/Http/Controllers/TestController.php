<?php

namespace App\Http\Controllers;





class TestController extends Controller
{

    public function index(\Illuminate\Http\Request $request)
    {
        $header = $request->header('Authorization');
        if ($header){
            return response()->json(['authorized' => 'yes', 'code' => '405']);
        }else{
            return response()->json(['authorized' => 'none', 'code' => '401']);
        }

    }
}
