<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;
use Closure;
use App\Role;
use App\User;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        $userId = self::getUserIdFromToken($request);
        if($userId == 0){
            return response('unathorized', 401);
        }else{
            $userPermissions = User::find($userId)->roles;
            $roleArray = explode(";", $role);
            foreach ($userPermissions as $userRole){
                foreach ($roleArray as $pageRole){
                    if($userRole->name == $pageRole){
                        return $next($request);
                    }
                }
            }
            return response('unathorized', 401);
        }
    }

    public static function getUserIdFromToken(Request $request){
        $result = 0;
        if ($request->header('Authorization')){
            $res = self::sendTokenToPassport($request);
            if($res->getStatusCode() != 401){
                $result = json_decode($res->getBody())->id;
            }
        }
        return $result;
    }

    public static function sendTokenToPassport(Request $request){
        $client = new \GuzzleHttp\Client(['http_errors' => false]);
        $res = $client->request('GET', $_ENV['APP_URL'] . '/api/user',[
            'headers' => [
                'Authorization' => $request->header('Authorization'),
                'Accept'     => 'application/json'
            ]
        ]);
        return $res;
    }

}
