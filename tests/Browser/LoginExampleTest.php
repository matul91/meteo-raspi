<?php

namespace Tests\Browser;

use Tests\DuskTestCase;

class LoginExampleTest extends DuskTestCase
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
                ->assertSee('Letiště Baškaaaaa');
        });
    }
}