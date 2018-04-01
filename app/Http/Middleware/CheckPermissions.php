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
        if ($userId == 0) {
            return self::getUnauthorized();
        } else {
            $userPermissions = User::find($userId)->roles;
            $roleArray = explode(";", $role);
            return self::compareUserPermissions($userPermissions, $roleArray, $next, $request);
        }
    }

    private static function getUserIdFromToken(Request $request)
    {
        $result = 0;
        if ($request->header('Authorization')) {
            $res = self::sendTokenToPassport($request);
            if ($res->getStatusCode() != 401) {
                $result = json_decode($res->getBody())->id;
            }
        }
        return $result;
    }

    private static function sendTokenToPassport(Request $request)
    {
        $client = new \GuzzleHttp\Client(['http_errors' => false]);
        $res = $client->request('GET', $_ENV['APP_URL'] . '/api/user', [
            'headers' => [
                'Authorization' => $request->header('Authorization'),
                'Accept'     => 'application/json'
            ]
        ]);
        return $res;
    }

    private static function getUnauthorized()
    {
        return response('unauthorized', 401);
    }

    // použít nějakou funkci co najde
    private static function compareUserPermissions($userPermissions, $roleArray, $next, $request)
    {
        $result = self::getUnauthorized();

        foreach ($userPermissions as $userRole) {
            foreach ($roleArray as $pageRole) {

                $result = self::compareTwoPermissions($userRole, $pageRole, $next, $request);

            }
        }

        return $result;
    }


    // Dodělat že se vrátí true a následně udělat Next
    private static function compareTwoPermissions($userRole, $pageRole, $next, $request)
    {
        $result = null;
        if ($userRole->name == $pageRole) {
            $result = $next($request);
        } else {
            $result = self::getUnauthorized();
        }
        return $result;
    }
}
