<?php

use Illuminate\Database\Seeder;
use App\Role;

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
            'name' => config('database.name'),
            'email' => config('database.email'),
            'password' => bcrypt(config('database.password'))
        ]);
        $user->save();
        $user->roles()->attach($adminRole);
    }
}
