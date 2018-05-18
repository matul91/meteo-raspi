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
set('keep_releases', 5);
set('shared_files', [
    '.env'
]);
set('shared_dirs', [
    'storage',
    'public/images/photos'
]);
set('writable_dirs', [
    'bootstrap/cache',
    'vendor',
    'storage',
    'public/images/photos'
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
    ->set('branch', 'feature/AT54-travis-deploy')
    ->user('deploy')
    ->port(22)
    ->identityFile('/tmp/deploy_rsa')
    ->forwardAgent(true)
    ->multiplexing(true)
    ->addSshOption('UserKnownHostsFile', '/dev/null')
    ->addSshOption('StrictHostKeyChecking', 'no');

// Tasks
task('npm:build', function () {
    cd('{{release_path}}');
    run('{{bin/npm}} run production');
})->desc('Assets generation');

task('production:migrate', function () {
    run('{{bin/php}} {{release_path}}/artisan migrate:fresh --force');
})->desc('Migrate clean database');

task('production:seed', function () {
    run('{{bin/php}} {{release_path}}/artisan db:seed --class=RolesTableSeeder --force');
    run('{{bin/php}} {{release_path}}/artisan db:seed --class=ProductionUsersTableSeeder --force');
    run('{{bin/php}} {{release_path}}/artisan db:seed --class=SettingsTableSeeder --force');
})->desc('Seed database');

task('passport:install', function () {
    run('{{bin/php}} {{release_path}}/artisan passport:install --force');
})->desc('Integrate passport');

task('set:secret', function () {
    run('{{bin/php}} {{release_path}}/artisan set:client_secret .env');
})->desc('Set client secret in .env file');

task('key:generate', function () {
    run('{{bin/php}} {{release_path}}/artisan key:generate');
})->desc('Generate application key');

task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'deploy:writable',
    'artisan:migrate',
    'npm:install',
    'npm:build',
    'artisan:storage:link',
    'artisan:view:clear',
    'artisan:cache:clear',
    'artisan:config:cache',
    'artisan:optimize',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
])->desc('Deploy project');

task('initialize', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:vendors',
    'deploy:writable',
    'production:migrate', // make clean version of db
    'production:seed', // seed production data
    'passport:install', // install passport
    'set:secret', // set client secret
    'key:generate', // generate application key
    'npm:install',
    'npm:build',
    'artisan:storage:link',
    'artisan:view:clear',
    'artisan:cache:clear',
    'artisan:config:cache',
    'artisan:optimize',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
])->desc('Initialize project');

task('initialize:failed', function () {
})->setPrivate();

fail('initialize', 'initialize:failed');

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
after('initialize:failed', 'deploy:unlock');
