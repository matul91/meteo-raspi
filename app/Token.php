<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use FCM;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Token extends Model
{
    protected $table = 'tokens';

    /**
     * @param $title = title (plain text)
     * @param $body = message (plain text)
     * @param $data = array example: ['key' => 'value', 'key2' => 'value2'] this is for future use
     * @param $groupArray = array example: ['admin', 'modeller']
     */
    public static function sendPhotoNotification($title, $body, $data, $groupArray)
    {
        $minutesPerNotification = Setting::getByID('minutes_per_notification_photo')->value;
        $timeTmp = Carbon::now()->subMinutes($minutesPerNotification);

        $lastTimeSent = LogNotification::getLast();

        if ($lastTimeSent == null or $timeTmp > $lastTimeSent->created_at) {
            $logNotification = new LogNotification();
            $logNotification->name = "photo notfication";
            $logNotification->save();
            self::buildFcm($title, $body, $data, $groupArray);
        }
    }

    private static function buildFcm($title, $body, $data, $groupArray)
    {
        $groupTokens = self::getTokenForGroups($groupArray);
        $optionBuilder = new OptionsBuilder();
        $optionBuilder->setTimeToLive(60 * 20);

        $notificationBuilder = new PayloadNotificationBuilder($title);
        $notificationBuilder->setBody($body)->setSound('default');

        $dataBuilder = new PayloadDataBuilder();
        $dataBuilder->addData($data);

        FCM::sendTo(
            $groupTokens,
            $optionBuilder->build(),
            $notificationBuilder->build(),
            $dataBuilder->build()
        );
    }

    private static function getTokenForGroups(array $arrayGroup)
    {
        return DB::table('tokens')
            ->join('users', 'users.id', '=', 'tokens.user_id')
            ->join('role_user', 'users.id', '=', 'role_user.user_id')
            ->join('roles', 'role_user.role_id', '=', 'roles.id')
            ->whereIn('roles.name', $arrayGroup)->pluck('token')->toArray();
    }
}
