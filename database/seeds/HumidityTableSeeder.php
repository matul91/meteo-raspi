<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\Weather\Records\Humidity;

class HumidityTableSeeder extends Seeder
{
    public function run(): void
    {
        $dateTime = Carbon::now();
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 1000; $i++) {
            $humidity = factory(Humidity::class)->make([
                'humidity' => $faker->numberBetween(0, 100),
                'date' => $dateTime
            ]);

            $humidity->save();
            $dateTime->addMinutes(2);
        }
    }
}
