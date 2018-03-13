<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    public static function getCountRows(){
        return self::get()->count();
    }

    public static function getAllRows(\Illuminate\Http\Request $request){
        $id = User::getUserIdFromToken($request);
        if(User::isAdminById($id) == true OR User::isModelarById($id) == true){
        $return = self::get();
        }else{
            $return = User::unauthorizedAccess();
        }
        return $return;
    }

    public static function getLastRecord(){
        return self::orderBy('id', 'desc')->first();
    }
}
