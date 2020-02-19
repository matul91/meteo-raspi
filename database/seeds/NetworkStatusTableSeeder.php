<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\Station\NetworkStatus;

class NetworkStatusTableSeeder extends Seeder
{
    public function run(): void
    {
        $dateTime = Carbon::now();
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 30; $i++) {
            $humidity = factory(NetworkStatus::class)->make([
                'signal_strength' => $faker->numberBetween(0, 30),
                'date' => $dateTime
            ]);

            $humidity->save();
            $dateTime->addMinutes(2);
        }
    }
}
