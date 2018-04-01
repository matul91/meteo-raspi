<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class WindsTableSeeder extends Seeder
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
        $speed = $faker->numberBetween(5, 50);

        for ($i = 0; $i < 1000; $i++) {
            if (random_int(1, 6) <= 3) {
                $max = ($speed + 10 <= 100) ? $speed + 10 : 100;
                $speed = $faker->numberBetween($speed, $max);
            } else {
                $min = ($speed - 10 >= 5) ? $speed - 10 : 5;
                $speed = $faker->numberBetween($min, $speed);
            }

            $wind = factory(App\Wind::class)->make([
                'date' => $dateTime,
                'speed' => $speed
            ]);

            $wind->save();
            $dateTime->addMinutes(2);
        }
    }
}
