<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/404', function() {
//     abort(404);
// });
Route::get('/500', function() {
    abort(500);
});

// firewallミドルウェアでIPを制限
Route::middleware(['firewall'])->group(function () {
    Route::get('{any}', function () {
        return view('app');
    })->where('any', '.*');
});



