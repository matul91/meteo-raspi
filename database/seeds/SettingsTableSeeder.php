<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = factory(App\Setting::class)->make([
            'name' => "max_data_per_graph",
            'value' => 100
        ]);

        $setting->save();

        $setting = factory(App\Setting::class)->make([
            'name' => "minutes_per_notification_photo",
            'value' => 30
        ]);

        $setting->save();
    }
}
