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
        $header = $request->header('Authorization');
        if ($header){
            $client = new \GuzzleHttp\Client(['http_errors' => false]);
            $res = $client->request('GET', 'http://meteostanice.test/api/user',[
                'headers' => [
                    'Authorization' => $header,
                    'Accept'     => 'application/json'
                ]
            ]);


            if($res->getStatusCode() == 401){
                $result = response()->json(['authorized' => 'none', 'code' => '401']);
            }else{
                $user = json_decode($res->getBody());
                $result = $user->id;
            }

            return $result;
        }else{
            return response()->json(['authorized' => 'none', 'code' => '401']);
        }


    }
}
