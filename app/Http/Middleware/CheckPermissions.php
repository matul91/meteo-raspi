<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Closure;
use App\Role;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();
        if ($user == null) {
            return self::getUnauthorized();
        } else {
            $userPermissions = $user->roles;
            $rolesArray = explode(";", $role);

            return self::compareUserPermissions($userPermissions, $rolesArray, $next, $request);
        }
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
