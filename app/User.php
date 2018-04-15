<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

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

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public static function getUserIdFromToken(Request $request)
    {
        $result = null;
        if ($request->header('Authorization')) {
            $token = self::sendTokenToPassport($request);
            if ($token->getStatusCode() != Response::HTTP_UNAUTHORIZED) {
                $result = json_decode($token->getBody())->id;
            }
        }
        return $result;
    }

    public static function sendTokenToPassport(Request $request)
    {
        $client = new \GuzzleHttp\Client(['http_errors' => false]);
        $result = $client->request('GET', env("APP_URL"). '/api/user', [
            'headers' => [
                'Authorization' => $request->header('Authorization'),
                'Accept' => 'application/json'
            ]
        ]);
        return $result;
    }
}
