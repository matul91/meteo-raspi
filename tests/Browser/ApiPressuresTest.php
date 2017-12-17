<?php

namespace Tests\Browser;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiPressuresTest extends TestCase
{

    public function testApiWorking()
    {
        $response = $this->get('/pressures');
        $response->assertStatus(200);
    }
}
