[![Maintainability](https://api.codeclimate.com/v1/badges/0c3b4196d6e79e834614/maintainability)](https://codeclimate.com/github/matul91/meteo-raspi/maintainability)
[![Build Status](https://travis-ci.org/matul91/meteo-raspi.svg?branch=develop)](https://travis-ci.org/matul91/meteo-raspi)

Prerequiresities:
1.  Installed PHP&MySQL server on your machine (for Windows I recommend https://laragon.org/, for OSX https://laravel.com/docs/5.5/valet)
2.  Installed composer (https://getcomposer.org/)
3.  For frontend devs - installed Node.js (https://nodejs.org/en/) and optionally Yarn (better package manager - https://yarnpkg.com/en/)
4.  Installed code editor/IDE

Steps to make project working:
1.  Clone repo (via bash - `git clone http://195.113.102.183/atym/meteostanice.git`)
2.  Open CMD in project directory
3.  Run `composer install`
4.  Create DB on your localhost
5.  Create new file .env in root directory and copy content of .env.example file into this file
6.  Change data to your settings
7.  Run `php artisan migrate:fresh --seed`
8.  Run `php artisan passport:install`
9.  Open your DB and open table oauth_clients, then look for row with id 2 and change column secret to 'zLVQUdDRTPwmaXEouLlbTbX5knSFcPKrUNHTSDt7'
10.  In terminal, run command `php artisan key:generate`

Part for frontend devs:
8.  Run `yarn` command to install Node.js  dependencies (or npm install on server)
9.  To work with JS and SASS files, run `yarn watch` command (it will watch your files and transpile them into final code)

How to run TSLint on your machine:
10.  To run TSLint in WebStorm, go to File > Settings > Languages & Frameworks > TypeScript > TSLint > Check Enable (in VSCode you don't have to do anything, VSCode enables TSLint for you)
11.  To run TSLint via CMD, you have to install Node.js dependencies, then run command `./node_modules/.bin/tslint --project tsconfig.json` (with backward slash in Windows), more about running via CMD is here https://palantir.github.io/tslint/usage/cli/

WARNING: There is bug in TSLint, it doesn't report some errors when you're using \r\n line break. So be sure your IDE is set to use LF separator:

![separator](http://195.113.102.183/atym/meteostanice//uploads/fa5f98b8576af49bcf52c34b596dd36d/separator.png)

Now, the project is ready to work! If your server is running, just enter the address of the project into your browser (for me with Laragon - http://meteostanice.dev/).

<p align="center"><img src="https://festik.cz/tmp/truestorybro.jpg"></p>