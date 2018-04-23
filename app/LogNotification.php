<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogNotification extends Model
{
    protected $table = 'log_notifications';

    public static function getLastRecord()
    {
        return self::orderBy('id', 'desc')->first();
    }
}
