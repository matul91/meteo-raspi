<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ApiTemperatureTest extends DuskTestCase
{

    public function testApiWorking()
    {
        $response = $this->get('/temperatures');
        $response->assertStatus(200);
    }
}
