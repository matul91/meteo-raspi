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
    public function testApiWorkingTest()
    {
        $response = $this->get('/pressures');
        $response->assertStatus(200);
    }
}
