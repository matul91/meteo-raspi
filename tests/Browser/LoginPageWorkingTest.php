<?php

namespace Tests\Browser;

use Tests\DuskTestCase;

class LoginPageWorkingTest extends DuskTestCase
{

    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->browse(function ($browser){
            $browser->visit('/login')
                ->assertSee('Letiště Baška');
        });
    }
}