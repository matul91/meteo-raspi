<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;

class CheckWeatherStationToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->header('Authorization')){
            if($request->header('Authorization') == env('PASSWORD_WEATHER_STATION')){
                $result = $next($request);
            }else{
                $result = self::getUnauthorized();
            }

        }else{
            $result = self::getUnauthorized();
        }
    return $result;
    }

    private static function getUnauthorized()
    {
        return response('unauthorized', Response::HTTP_UNAUTHORIZED);
    }
}
