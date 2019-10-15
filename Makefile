.PHONY: build up stop down test cs cs-fix phpstan cache-clear seed-database set-secret

start: build up init test

build:
	docker-compose build --no-cache

up:
	docker-sync start \
	&& docker-compose up -d --force-recreate

stop:
	docker-compose stop \
	&& docker-sync stop

down:
	docker-compose down \
	&& docker-sync clean

composer-install:
	docker exec meteoraspi-apache sh -c "composer install"

cache-clear:
	docker exec meteoraspi-apache sh -c "php artisan config:cache"

test: cs phpstan

cs:
	docker exec meteoraspi-apache sh -c " vendor/bin/phpcs -p --standard=PSR2 --ignore="vendor,resources,storage,public,node_modules,database,bootstrap" ./"

cs-fix:
	docker exec meteoraspi-apache sh -c "vendor/bin/phpcbf -p --standard=PSR2 --ignore=vendor,resources,storage,public,node_modules,database,bootstrap ./"

phpstan:
	docker exec meteoraspi-apache sh -c "php artisan code:analyse"

init: copy-env-file composer-install set-secret npm-install seed-database

npm-install:
	docker exec meteoraspi-apache sh -c "npm install && npm run dev"

seed-database:
	docker exec meteoraspi-apache sh -c "php artisan migrate:fresh && php artisan db:seed"

copy-env-file:
	cp .env.docker .env

set-secret:
	php artisan key:generate
