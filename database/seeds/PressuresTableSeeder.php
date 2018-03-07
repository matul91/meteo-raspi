<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PressuresTableSeeder extends Seeder
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
        $pressureValue = $faker->numberBetween(800, 2000);

        for ($i = 0; $i < 100; $i++) {
            if (random_int(1, 6) <= 3) {
                $max = ($pressureValue + 100 <= 2000) ? $pressureValue + 100 : 2000;
                $pressureValue = $faker->numberBetween($pressureValue, $max);
            } else {
                $min = ($pressureValue - 100 >= 0) ? $pressureValue - 100 : 0;
                $pressureValue = $faker->numberBetween($min, $pressureValue);
            }

            $pressure = factory(App\Pressure::class)->make([
                'date' => $dateTime,
                'pressure' => $pressureValue
            ]);

            $pressure->save();
            $dateTime->addMinutes(2);
        }
    }
}
