## 環境構築

## Docker Build

```shell
docker-compose build
```
## コンテナ立ち上げ

```shell
docker-compose up -d
```

## PHP周り

```shell
docker-compose exec php bash
#Dockerコンテナ内で
composer install
#envファイル
cp .env.dev .env
#AppKEY作成
php artisan key:generate
```

## マイグレーション

```shell
docker-compose run --rm php php artisan migrate
# Seederも一緒に
docker-compose run --rm php php artisan migrate --seed

```

## フロント

```shell
docker-compose run --rm node /bin/bash
#Dockerコンテナ内で
npm install
npm run build
# 変更監視
npm run build -- --watch
```

## アクセスURL

http://localhost:60080/

## コンテナを全削除して再度立ち上げ

```shell
#削除
docker-compose down --rmi all --volumes
#build
docker-compose build
```