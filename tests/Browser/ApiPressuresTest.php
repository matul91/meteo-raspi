<?php

namespace Tests\Browser;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiPressuresTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testApiWorking()
    {
        $response = $this->get('/pressures');
        $response->assertStatus(200);
    }
}
