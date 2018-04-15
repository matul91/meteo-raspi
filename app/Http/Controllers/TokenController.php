<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Token;

class TokenController extends Controller
{
    public function addToken(Request $request)
    {
        if ($request->has('token')) {
            $token = new Token();
            $token->user_id = User::getUserIdFromToken($request);
            $token->token = $request->token;
            $token->save();
            return response()->json(["proved" => true, "message" => "token add"], 200);
        } else {
            return response()->json(["proved" => false, "message" => "token is empty"], 500);
        }
    }

    public function index()
    {
        return "Test";
    }
}
