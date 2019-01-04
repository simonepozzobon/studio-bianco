<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('admin')->group(function() {
    Route::prefix('services')->group(function() {
        Route::get('/get/{category}', 'Admin\ServicesController@get');
        Route::post('/create', 'Admin\ServicesController@create');
        Route::post('/update', 'Admin\ServicesController@update');
        Route::get('/destroy/{id}', 'Admin\ServicesController@destroy');
    });
});
