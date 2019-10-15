[![Maintainability](https://api.codeclimate.com/v1/badges/0c3b4196d6e79e834614/maintainability)](https://codeclimate.com/github/matul91/meteo-raspi/maintainability)
[![Build Status](https://travis-ci.org/matul91/meteo-raspi.svg?branch=develop)](https://travis-ci.org/matul91/meteo-raspi)

Prerequisites: 
* Linux / Unix based operating system
* Installed Docker, docker-compose, docker-sync


How to start:
1. Clone the repository `https://github.com/matul91/meteo-raspi.git`.
2. Append `127.0.0.1 raspi.local` to `/etc/hosts`
3. Set permissions `sudo chown -R :www-data ./meteo-raspi`, you might need add group `www-data` to your user account.
4. Run `make`

Now, the project is ready to work! Just enter the address of the project into your browser https://raspi.local/.

![MeteoRaspi demo](https://raw.githubusercontent.com/matul91/meteo-raspi/master/resources/assets/images/demo.png)

