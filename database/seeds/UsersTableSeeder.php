<?php

use Illuminate\Database\Seeder;
use App\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_admin  = Role::where('name', 'admin')->first();
        $role_modeller = Role::where('name', 'modeller')->first();

        $user = factory(App\User::class)->make([
            'name' => 'Jiří Matula',
            'email' => 'jiri@osu.cz'
        ]);
        $user->save();
        $user->roles()->attach($role_admin);

        $user = factory(App\User::class)->make([
            'name' => 'Vladimír Fojtík',
            'email' => 'vladimir@osu.cz'
        ]);
        $user->save();
        $user->roles()->attach($role_admin);

        $user = factory(App\User::class)->make([
            'name' => 'Lukáš Antl',
            'email' => 'lukas@osu.cz'
        ]);
        $user->save();
        $user->roles()->attach($role_admin);

        $user = factory(App\User::class)->make([
            'name' => 'Normální uživatel',
            'email' => 'test@osu.cz'
        ]);
        $user->save();
        $user->roles()->attach($role_modeller);

    }
}
