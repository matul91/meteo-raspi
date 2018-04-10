<?php

namespace Tests\Browser;

use Tests\DuskTestCase;

class PhotoApiPointTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */

    public function testUnauthorized()
    {
        $response = $this->post('/photo/save', ['body' => ['metaInfo' => 'people']], ['Authorization' => '']);
        $response->assertStatus(401);
    }

    public function testSendEmptyImage()
    {
        $response = $this->post(
            '/photo/save',
            ['body' => ['metaInfo' => 'people']],
            ['Authorization' => env('PASSWORD_WEATHER_STATION')]
        );
        $response->assertStatus(500);
    }

    public function testShowPageLastPhoto()
    {
        $response = $this->get('/photo');
        $response->assertStatus(200);
    }

    public function testShowPageAllPhotos()
    {
        $response = $this->get('/photo/all');
        $response->assertStatus(200);
    }
}
