<?php
namespace Deployer;

require 'recipe/laravel.php';
require 'vendor/deployer/recipes/recipe/rsync.php';
require 'vendor/deployer/recipes/recipe/npm.php';

// Project name
set('application', 'my_project');

// Configuration
set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('writable_mode', 'chmod');
set('repository', 'https://github.com/matul91/meteo-raspi.git');
set('git_tty', true);
set('branch', 'master');
set('keep_releases', 5);

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

host('raspi.jiri-matula.cz')
    ->stage('production')
    ->roles('app')
    ->set('deploy_path', '~/var/www/html/raspi.jiri-matula.cz')
    ->set('branch', 'master')
    ->user('deploy')
    ->port(22)
    ->identityFile('deploy_rsa')
    ->forwardAgent(true)
    ->multiplexing(true)
    ->addSshOption('UserKnownHostsFile', '/dev/null')
    ->addSshOption('StrictHostKeyChecking', 'no');

// Tasks

task('environment', function () {
    upload('.env', '{{release_path}}/.env');
    // dodělat že načte proměnné z travisu
})->desc('Environment setup');

task('npm:install', function () {
    run('cd {{deploy_path}}/current; {{bin/npm}} install');
    run('mv {{deploy_path}}/current/node_modules {{deploy_path}}/shared');
    run('ln -s {{deploy_path}}/shared/node_modules {{deploy_path}}/current');
})->desc('Execute npm install');

task('npm:build', function () {
    runLocally(
        "cd {{local_release_path}} && {{local/bin/npm}} run production MIX_CLIENT_SECRET=$MIX_CLIENT_SECRET_TRAVIS"
    );
});

task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
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
