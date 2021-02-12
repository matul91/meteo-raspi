FROM php:7.2-apache

USER root:www-data

# Install dependencies and extensions
RUN apt-get update \
    && apt-get install -y \
        libicu-dev \
        libpq-dev \
        libzip-dev \
        zlib1g-dev \
        libxml2-dev \
        libldap2-dev \
        libpng-dev \
        git \
        curl \
        libmemcached-dev \
        graphicsmagick \
        libgraphicsmagick1-dev \
        gnupg \
        libssl-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install opcache \
    && docker-php-ext-install zip \
    && docker-php-ext-install gd \
    && docker-php-ext-install sockets

RUN pecl install apcu && docker-php-ext-enable apcu

# Install composer and prestissimo package for parallel download
RUN curl -sS https://getcomposer.org/installer | php -- --version=1.10.19 --install-dir=/usr/local/bin --filename=composer \
    && composer global require hirak/prestissimo

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs=8.17.0-1nodesource1

# SSL stuff
COPY docker/certs /etc/apache2
RUN a2enmod ssl && a2enmod rewrite && service apache2 restart

# Apache Vhost
COPY docker/vhosts/000-default.conf /etc/apache2/sites-available/000-default.conf

