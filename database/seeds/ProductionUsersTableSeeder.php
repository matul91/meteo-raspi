<?php

use Illuminate\Database\Seeder;

class ProductionUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRole  = Role::where('name', 'admin')->first();
        $user = factory(App\User::class)->make([
            'name' => 'Administrator',
            'email' => 'admin@osu.cz'
        ]);
        $user->save();
        $user->roles()->attach($adminRole);
    }
}
