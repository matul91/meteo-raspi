<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = factory(App\User::class)->make([
            'name' => 'Jiří Matula',
            'email' => 'jiri@osu.cz',
            'role' => 'Admin'
        ]);
        $user->save();

        $user = factory(App\User::class)->make([
            'name' => 'Vladimír Fojtík',
            'email' => 'vladimir@osu.cz',
            'role' => 'Admin'
        ]);
        $user->save();

        $user = factory(App\User::class)->make([
            'name' => 'Lukáš Antl',
            'email' => 'lukas@osu.cz',
            'role' => 'Admin'
        ]);
        $user->save();


        factory(App\User::class, 10)->create();
    }
}
