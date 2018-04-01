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
        $user = self::createUser('Lukáš Antl', 'lukas@osu.cz');
        $user->save();
        $user->roles()->attach($role_admin);

        $user = self::createUser('Vladimír Fojtík', 'vladimir@osu.cz');
        $user->save();
        $user->roles()->attach($role_admin);

        $user = self::createUser('Jiří Matula', 'jiri@osu.cz');
        $user->save();
        $user->roles()->attach($role_admin);

        $user = self::createUser('Normální Uživatel', 'info@osu.cz');
        $user->save();
        $user->roles()->attach($role_modeller);
    }

    private function createUser($name, $email){
        $user = factory(App\User::class)->make([
            'name' => $name,
            'email' => $email
        ]);
        return $user;
    }
}
