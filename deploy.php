<?php
namespace Deployer;

require 'recipe/laravel.php';
require 'vendor/deployer/recipes/recipe/rsync.php';
require 'vendor/deployer/recipes/recipe/npm.php';

// Project name
set('application', 'meteo-raspi');

// Configuration
set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('writable_mode', 'chmod');
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
    'storage',
    'storage/app',
    'storage/app/public',
    'storage/framework',
    'storage/framework/cache',
    'storage/framework/sessions',
    'storage/framework/views',
    'storage/logs',
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

task('npm:install', function () {
    $npm_folder_exists = run(
        'if [ ! -L {{deploy_path}}/shared/node_modules ] && [ -d {{deploy_path}}/shared/node_modules ]; then echo true; fi'
    )->toBool();

    if (!$npm_folder_exists) {
        run('cd {{deploy_path}}/current; {{bin/npm}} install');
        run('mv {{deploy_path}}/current/node_modules {{deploy_path}}/shared');
    }

    run('ln -s {{deploy_path}}/shared/node_modules {{deploy_path}}/current');
})->desc('Execute npm install');

task('npm:build', function() {
    cd('{{release_path}}');
    run('{{bin/npm}} run production MIX_CLIENT_SECRET=$MIX_CLIENT_SECRET_TRAVIS');
})->desc('Assets generation');

task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'npm:install',
    'npm:build',
    'deploy:shared',
    'upload:env',
    'deploy:vendors',
    'deploy:writable',
    'artisan:storage:link',
    'artisan:view:clear',
    'artisan:cache:clear',
    'artisan:config:cache',
    'artisan:route:cache',
    'artisan:optimize',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
])->desc('Deploy project');

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.

before('deploy:symlink', 'artisan:migrate');
