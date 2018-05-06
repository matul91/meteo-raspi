<?php
namespace Deployer;

require 'recipe/laravel.php';
require 'vendor/deployer/recipes/local.php';
require 'vendor/deployer/recipes/rsync.php';
require 'vendor/deployer/recipes/npm.php';

// Project name
set('application', 'my_project');

// Configuration
set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('writable_mode', 'chmod');
set('default_stage', 'dev');
set('repository', 'https://github.com/matul91/meteo-raspi.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);
add('rsync', [
    'exclude' => [
        '.git',
        'deploy.php',
        'node_modules',
    ],
]);

// RSYNC files from /tmp/deployer instead of vendor/deployer/recipes/
set('rsync_src', function () {
    $local_src = get('local_release_path');
    if (is_callable($local_src)) {
        $local_src = $local_src();
    }
    return $local_src;
});

// Hosts

host('195.181.212.105')
    ->stage('production')
    ->roles('app')
    ->set('deploy_path', '~/var/www/html/raspi.jiri-matula.cz')
    ->set('branch', 'master')
    ->user('meteo-raspi')
    ->port(22)
    ->identityFile('~/deploy_rsa')
    ->forwardAgent(true)
    ->multiplexing(true)
    ->addSshOption('UserKnownHostsFile', '/dev/null')
    ->addSshOption('StrictHostKeyChecking', 'no');

// Tasks

task('build', function () {
    run('cd {{release_path}} && build');
});

task('npm:local:build', function () {
    runLocally(
        "cd {{local_release_path}} && {{local/bin/npm}} run production MIX_CLIENT_SECRET=$MIX_CLIENT_SECRET_TRAVIS"
    );
});

task('deploy', [
    'local:prepare',        // Create dirs locally
    'local:release',        // Release number locally
    'local:update_code',    // git clone locally
    'local:vendors',        // composer install locally
    'npm:local:install',    // npm install locally
    'npm:local:build',      // Build locally
    'local:symlink',        // Symlink /current locally
    'deploy:prepare',       // Create dirs on server
    'deploy:lock',          // Lock deploys on server
    'deploy:release',       // Release number on server
    'rsync',                // Send files to server
    'deploy:writable',      // Ensure paths are writable on server
    'deploy:shared',        // Shared and .env linking on server
    'artisan:view:clear',   // Optimze on server
    'artisan:cache:clear',  // Optimze on server
    'artisan:config:cache', // Optimze on server
    'artisan:optimize',     // Optimze on server
    'artisan:migrate',      // Migrate DB on server
    'deploy:symlink',       // Symlink /current on server
    'deploy:unlock',        // Unlock deploys on server
    'cleanup',              // Cleanup old releases on server
    'local:cleanup'         // Cleanup old releases locally
])->desc('Deploy project');

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');
