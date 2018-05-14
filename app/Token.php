<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Token extends Model
{
    protected $table = 'tokens';
    protected $fillable = ['user_id', 'token'];

    public static function getTokenForGroups(array $arrayGroup)
    {
        return DB::table('tokens')
            ->join('users', 'users.id', '=', 'tokens.user_id')
            ->join('role_user', 'users.id', '=', 'role_user.user_id')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->whereIn('roles.name', $arrayGroup)->pluck('token')->toArray();
    }

    public static function saveToken($request, $user)
    {
        self::firstOrCreate(['user_id' => $user->id, 'token' => $request->FCMToken]);
    }
}
