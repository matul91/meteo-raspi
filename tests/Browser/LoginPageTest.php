<?php

namespace Tests\Browser;

use Laravel\Passport\Bridge\User;
use Tests\DuskTestCase;

class LoginPageTest extends DuskTestCase
{

    public function testShowLoginPage()
    {
        $this->browse(function ($browser){
            $browser->visit('/login')
                ->assertSee('Letiště Baška');
        });
    }

    public function testLoginUnsuccessful()
    {


        $this->browse(function ($browser) {
            $browser->visit('/login')
                ->type('email', 'emailkterytamneni')
                ->type('password', 'secret')
                ->press('Submit')
                ->waitForLocation('/login')
                ->assertSee('Neplatné přilašovací údaje');
        });
    }

    public function testLoginSuccessfully()
    {


        $this->browse(function ($browser) {
            $browser->visit('/login')
                ->type('email', 'carroll.curt@example.net')
                ->type('password', 'secret')
                ->press('Submit')
                ->waitForLocation('/')
                ->assertSee('Přihlášen jako');
        });
    }
}