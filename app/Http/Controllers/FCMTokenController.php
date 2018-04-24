<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Token;

class FCMTokenController extends Controller
{
    public function addToken(Request $request)
    {
        if ($request->has('FCMToken')) {
            $FCMToken = new Token();
            $FCMToken->user_id = User::getUserIdFromToken($request);
            $FCMToken->token = $request->FCMToken;
            $FCMToken->save();
            return response()->json(["proved" => true, "message" => "Token has been added"], 200);
        } else {
            return response()->json(["proved" => false, "message" => "Token is empty"], 500);
        }
    }
}
