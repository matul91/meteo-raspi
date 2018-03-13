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

    private static function saveImageFromRaspi(\Illuminate\Http\Request $request){
        $destinationPath="images/photoFromRaspi/".date("Y")."/". date("m");
        $file = $request->file('photo');
        $filename=date("Y-m-d-G-i-s") . "." . $file->getClientOriginalExtension();
        $file = $request->file('photo')->move($destinationPath,$filename);
        return $file;
    }

    private static function saveInfoToDatabase(string $pathInfo, string $baseName, \Illuminate\Http\Request $request){
        $photo = new Photo;
        $photo->name = "public/". $pathInfo . "/" . $baseName;
        if($request->input("metaInfo")){
            $photo->metaInfo = $request->input("metaInfo");
        }else{
            $photo->metaInfo = "None";
        }
        $photo->save();
    }

    public static function processImageFromApi(\Illuminate\Http\Request $request){
        if($request->hasFile('photo'))
        {
            $file = self::saveImageFromRaspi($request);
            self::saveInfoToDatabase($file->getPathInfo(), $file->getBasename(), $request);
            $result = "Complete!";
        }else{
            $result = "Not found image!";
        }
        return $result;
    }
}
