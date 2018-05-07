<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Token;
use Illuminate\Support\Facades\Auth;

class FCMTokenController extends Controller
{
    public function addToken(Request $request)
    {
        $user = Auth::user();
        if ($request->has('FCMToken')) {
            return Token::saveToken($request, $user);
        } else {
            return response()->json(["proved" => false, "message" => "Token is empty"], 500);
        }
    }
}
