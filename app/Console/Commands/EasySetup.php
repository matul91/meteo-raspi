<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class EasySetup extends Command
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
        $this->info("Start migrate databse...");
            exec('php artisan migrate:fresh --seed', $output);
        $this->info("[100%] migrate database complete");
        $this->info("Start passport install...");
            exec('php artisan passport:install --force', $output);
        $this->info("[100%] passport install complete");
        $this->info("Start changing client secret...");
            exec('php artisan set:client_secret .env', $output);
        $this->info("[100%] changing client secret complete");
        $this->info("Start key generating...");
            exec('php artisan key:generate', $output);
        $this->info("[100%] key:generate complete");
        $this->info("Start building frontend by yarn...");
            exec('yarn', $output);
        $this->info("[100%] yarn building complete");
        $this->info("Generated succesfull");
    }
}
