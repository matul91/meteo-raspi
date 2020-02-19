<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\Station\BatteryStatus;

class BatteryStatusTableSeeder extends Seeder
{
    public function run(): void
    {
        $dateTime = Carbon::now();
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 30; $i++) {
            $humidity = factory(BatteryStatus::class)->make([
                'voltage' => $faker->numberBetween(3.1, 4.2),
                'date' => $dateTime
            ]);

            $humidity->save();
            $dateTime->addMinutes(2);
        }
    }
}
