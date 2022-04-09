<?php
namespace App\Consts;

class Consts
{
    const HOGE = 0;
    const FUGA = 1;
    const HOGE_LIST = [
        self::HOGE => 'hoge',
        self::FUGA => 'fuga',
    ];
    const NAVI_MENUS = [
      ['title' => 'ホーム', 'icon' => 'mdi-home', 'url' => '/' ],
      ['title' => 'ユーザ一覧', 'icon' => 'mdi-account', 'url' => '/user'],
    ];

    /**
     * jsに定義一覧を渡す用メソッド
     * @see frontend/public/admin.html
     * @see frontend/public/index.html
     */
    public static function getJsConsts()
    {
        $reflect = new \ReflectionClass('App\Consts\Consts');
        $items = $reflect->getConstants();
        return $reflect->getConstants();
    }
}