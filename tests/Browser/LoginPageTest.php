<?php

namespace Tests\Browser;

use Tests\DuskTestCase;

class LoginPageTest extends DuskTestCase
{

    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testShowLoginPageTest()
    {
        $this->browse(function ($browser){
            $browser->visit('/login')
                ->assertSee('Letiště Baška');
        });
    }
}