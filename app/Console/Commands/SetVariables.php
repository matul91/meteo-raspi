<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SetVariables extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'set:client_secret {file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set variables needed by client to .env file';

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
        $clientRow = DB::table('oauth_clients')->where('id', 2)->first();
        $this->changeEnvironmentVariable('MIX_CLIENT_SECRET', $clientRow->secret);
    }

    public function changeEnvironmentVariable($key, $value)
    {
        $path = base_path($this->argument('file'));

        if (is_bool(env($key))) {
            $old = env($key)? 'true' : 'false';
        } elseif (env($key)===null) {
            $old = 'null';
        } else {
            $old = env($key);
        }

        if (file_exists($path)) {
            file_put_contents($path, str_replace(
                "$key=".$old,
                "$key=".$value,
                file_get_contents($path)
            ));
        }
    }
}
