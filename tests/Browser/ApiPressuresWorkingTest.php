<?php

namespace Tests\Browser;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiPressuresWorkingTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/pressures');
        $response->assertStatus(200);
    }
}
