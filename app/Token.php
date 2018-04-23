<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;
use FCM;
use Carbon\Carbon;

class Token extends Model
{
    protected $table = 'tokens';

    public function users()
    {
        return $this->hasMany(User::class, 'id', 'user_id');
    }

    public static function sendPhotoNotification($title, $body, $data, $groupArray)
    {
        $minutes_per_notification = Setting::getByID('minutes_per_notification_photo')->value;
        $timeTmp = Carbon::now()->subMinutes($minutes_per_notification);

        $lastTimeSent = LogNotification::getLastRecord();

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

    private static function getTokenForGroups($arrayGroup)
    {
        $arraySendUserId = [];
        $tokenToSend = [];
        $test = Role::with(['users'])->whereIn('name', $arrayGroup)->get();
        //Asking how to do it differently
        foreach ($test as $item) {
            foreach ($item->users as $user) {
                $arraySendUserId[] = $user->id;
            }
        }
        $tokensToSendArray = Token::whereIn('user_id', $arraySendUserId)->get();
        foreach ($tokensToSendArray as $token) {
            $tokenToSend[] = $token->token;
        }
        return $tokenToSend;
    }
}
