<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ApiWindTest extends DuskTestCase
{

    public function testApiWorking()
    {
        $response = $this->get('/winds');
        $response->assertStatus(200);
    }
}
