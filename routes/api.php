<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ログインなし
Route::group(['middleware' => ['convert_camel']], function() {
    // 認証系
    Route::prefix('auth')->group(function() {
        // POST /api/auth/login
        Route::post('/login', 'AuthController@login');
        // POST /api/auth/logout
        Route::post('/logout', 'AuthController@logout');
    });
    // 登録系
    Route::prefix('register')->group(function() {
        // PUT /api/register/{id}
        Route::post('{id}', 'UserController@registUpdate');
    });
});

// ログイン中
Route::group(['middleware' => ['auth:sanctum', 'convert_camel']], function() {
    Route::prefix('user')->group(function() {
        // GET /api/user
        Route::get('', 'UserController@index');
        // GET api/user/me
        Route::get('me', 'UserController@me');
        // POST /api/user
        Route::post('', 'UserController@create');
        // GET /api/user/{id}
        Route::get('/{id}', 'UserController@show');
        // PUT /api/user/{id}
        Route::put('/{id}', 'UserController@update');
        // DELETE /api/user/bulk-delete
        Route::delete('/bulk-delete', 'UserController@bulkDestroy');
        // DELETE /api/user/{id}
        Route::delete('/{id}', 'UserController@destroy');
    });
});

