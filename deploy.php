<?php
namespace Deployer;

require 'recipe/laravel.php';
require 'recipe/rsync.php';
require 'recipe/npm.php';

// Project name
set('application', 'meteo-raspi');

// Configuration
set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('writable_mode', 'chmod');
set('writable_chmod_mode', '0775');
set('repository', 'https://github.com/matul91/meteo-raspi.git');
set('branch', 'master');
set('keep_releases', 5);
set('shared_files', [
    '.env'
]);
set('shared_dirs', [
    'storage'
]);
set('writable_dirs', [
    'bootstrap/cache',
    'vendor'
]);
set('rsync', [
    'exclude' => [
        '.git',
        'deploy.php',
        'node_modules',
    ],
]);

set('rsync_src', function () {
    $local_src = get('local_release_path');
    if (is_callable($local_src)) {
        $local_src = $local_src();
    }
    return $local_src;
});

// Hosts

host('raspi.jiri-matula.cz')
    ->stage('production')
    ->roles('app')
    ->set('deploy_path', '/var/www/html/raspi.jiri-matula.cz')
    ->set('branch', 'master')
    ->user('deploy')
    ->port(22)
    ->identityFile('/tmp/deploy_rsa')
    ->forwardAgent(true)
    ->multiplexing(true)
    ->addSshOption('UserKnownHostsFile', '/dev/null')
    ->addSshOption('StrictHostKeyChecking', 'no');

// Tasks

task('upload:env', function () {
    upload('.env.production', '{{deploy_path}}/shared/.env');
})->desc('Environment setup');

task('npm:build', function () {
    cd('{{release_path}}');
    run('{{bin/npm}} run production');
})->desc('Assets generation');

task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'npm:install',
    'npm:build',
    'deploy:shared',
    'deploy:vendors',
    'deploy:writable',
    'artisan:storage:link',
    'artisan:view:clear',
    'artisan:cache:clear',
    'artisan:config:cache',
    'artisan:optimize',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
])->desc('Deploy project');

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');
