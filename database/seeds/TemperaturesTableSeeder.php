<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class TemperaturesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dateTime = Carbon::now();
        $faker = Faker\Factory::create();
        $tempValue = $faker->numberBetween(10, 36);

        for ($i = 0; $i < 100; $i++) {
            if (random_int(1, 6) <= 3) {
                $max = ($tempValue + 5 <= 40) ? $tempValue + 5 : 40;
                $tempValue = $faker->numberBetween($tempValue, $max);
            } else {
                $min = ($tempValue - 5 >= -10) ? $tempValue - 5 : 0;
                $tempValue = $faker->numberBetween($min, $tempValue);
            }

            $temperature = factory(App\Temperature::class)->make([
                'date' => $dateTime,
                'temperature' => $tempValue
            ]);

            $temperature->save();
            $dateTime->addMinutes(2);
        }
    }
}
