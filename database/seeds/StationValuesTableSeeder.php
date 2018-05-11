<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class StationValuesTableSeeder extends Seeder
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

        for ($i = 0; $i < 1000; $i++) {

            $voltValue = $faker->randomFloat(NULL, 0, 20);
            $stationValue = factory(App\Models\StationValue::class)->make([
                'date' => $dateTime,
                'volt' => $voltValue
            ]);

            $stationValue->save();
            $dateTime->addMinutes(2);
        }
    }
}
