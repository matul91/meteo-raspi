<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public static function getUserIdFromToken(\Illuminate\Http\Request $request){
        $result = 0;
        if ($request->header('Authorization')){
            $res = self::sendTokenToPassport($request);
            if($res->getStatusCode() != 401){
                $result = json_decode($res->getBody())->id;
            }
        }
        return $result;
    }

    public static function sendTokenToPassport(\Illuminate\Http\Request $request){
        $client = new \GuzzleHttp\Client(['http_errors' => false]);
        $res = $client->request('GET', $_ENV['APP_URL'] . '/api/user',[
            'headers' => [
                'Authorization' => $request->header('Authorization'),
                'Accept'     => 'application/json'
            ]
        ]);
        return $res;
    }

    public static function isAdminById(int $id){
        $result = false;
        if($id != 0){
            $role = self::where('id', '=', $id)->get()->first();
            if($role->role == "Admin"){
                $result = true;
            }
        }
        return $result;
    }

    public static function isModelarById(int $id){
        $result = false;
        if($id != 0){
            $role = self::where('id', '=', $id)->get()->first();
            if($role->role == "Modelar"){
                $result = true;
            }
        }
        return $result;
    }

    public static function unauthorizedAccess(){
        return array(
            'code'      => 401,
            'message'   => 'unauthorized Access'
        );
    }
}
