<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class easySetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'easySetup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command for automatic easy setup';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Command in progress...");
        $this->info(" ");
        $this->info("Start migrate databse...");
            exec('php artisan migrate:fresh --seed', $output);
        $this->info("[100%] migrate database complete");
        $this->info(" ");
        $this->info("Start passport install...");
            exec('php artisan passport:install --force', $output);
        $this->info("[100%] passport install complete");
        $this->info(" ");
        $this->info("Start changing client secret...");
            exec('php artisan set:client_secret .env', $output);
        $this->info("[100%] changing client secret complete");
        $this->info(" ");
        $this->info("Start key generating...");
            exec('php artisan key:generate', $output);
        $this->info("[100%] key:generate complete");
        $this->info(" ");
        $this->info("Start npm install...");
            exec('npm install', $output);
        $this->info("[100%] npm install complete");
        $this->info(" ");
        $this->info("Start building frontend...");
            exec('npm run dev', $output);
        $this->info("[100%] frontend building complete");
        $this->info("Generated succesfull");
    }
}
