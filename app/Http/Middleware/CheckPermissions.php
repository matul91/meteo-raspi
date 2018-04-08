<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Closure;
use App\Role;
use App\User;
use Illuminate\Http\Response;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        $userId = self::getUserIdFromToken($request);
        if ($userId == null) {
            return self::getUnauthorized();
        } else {
            $userPermissions = User::find($userId)->roles;
            $rolesArray = explode(";", $role);

            return self::compareUserPermissions($userPermissions, $rolesArray, $next, $request);
            
        }
    }

    private static function getUserIdFromToken(Request $request)
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

    private static function sendTokenToPassport(Request $request)
    {
        $client = new \GuzzleHttp\Client(['http_errors' => false]);
        $result = $client->request('GET', $_ENV['APP_URL'] . '/api/user', [
            'headers' => [
                'Authorization' => $request->header('Authorization'),
                'Accept' => 'application/json'
            ]
        ]);
        return $result;
    }

    private static function getUnauthorized()
    {
        return response('unauthorized', Response::HTTP_UNAUTHORIZED);
    }

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
