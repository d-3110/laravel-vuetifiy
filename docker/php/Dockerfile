FROM php:7.4-fpm

RUN apt-get update\
    && apt-get install -y --no-install-recommends zip\
    && apt-get install -y --no-install-recommends unzip\
    && apt-get install -y --no-install-recommends sudo\
    && apt-get install -y --no-install-recommends wget\
    && apt-get install -y --no-install-recommends vim\
    && apt-get install -y --no-install-recommends libpq-dev\
    && apt-get install -y --no-install-recommends libzip-dev\
    && apt-get upgrade -y\
    && apt-get clean -y\
    && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install zip
# composerの導入
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

# アプリケーションフォルダの作成
RUN mkdir -p /app
WORKDIR /app


# PHP
COPY ./php.ini /usr/local/etc/php/php.ini
RUN mkdir -p /home/www-data
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data && usermod -d /home/www-data www-data
RUN chown -R www-data /app
RUN chown -R www-data /home/www-data
RUN sudo -u www-data composer config -g repos.packagist composer https://packagist.jp

RUN composer global require "laravel/installer"