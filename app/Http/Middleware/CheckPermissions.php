<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Closure;
use App\Role;
use App\User;

class CheckPermissions
{
    const CODE401 = 401;
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
            $token = self::sendTokenToPassport($request);
            if ($token->getStatusCode() != self::CODE401) {
                $result = json_decode($token->getBody())->id;
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
        return response('unauthorized', self::CODE401);
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
