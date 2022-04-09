<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class ConvertCamelCase
{
    /**
     * レスポンスのkeyをスネークケースからキャメルケースに変換する
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // レスポンス返却前に変換
        $response = $next($request);

        $array = json_decode($response->content(), true);
        // エラー時
        if ($response->status() !== 200) {
            return response()->json($array, $response->status());
        }
        $converted = $this->camelizeArrayRecursive($array);
        return response()->json($converted);
    }

    /**
     * 配列のキーを再帰的にキャメルケースに変換する
     * @param array
     * @param array
     * @return array
     */
    public function camelizeArrayRecursive(array $array) :array
    {
        $result = [];
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $result[Str::camel($key)] = $this->camelizeArrayRecursive($value);
            } else {
                $result[Str::camel($key)] = $value;
            }
        }
        return $result;
    }
}
