<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{
    public function run()
    {
        $role_employee = new Role();
        $role_employee->name = 'admin';
        $role_employee->description = 'Admin of project';
        $role_employee->save();

        $role_manager = new Role();
        $role_manager->name = 'modeller';
        $role_manager->description = 'User as modeller';
        $role_manager->save();
    }
}
