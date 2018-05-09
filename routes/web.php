<?php

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

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/token', 'FCMTokenController@addToken')->middleware('permissions:admin');
});

Route::get('/pressures', 'PressureController@index');
Route::post('/pressures', 'PressureController@store')->middleware('permissions:admin');
Route::get('/pressures/latest', 'PressureController@latest');
Route::get('/settings', 'SettingController@index')->middleware('permissions:admin');

Route::get('/temperatures', 'TemperatureController@index');
Route::post('/temperatures', 'TemperatureController@store')->middleware('permissions:admin');
Route::get('/temperatures/latest', 'TemperatureController@latest');

Route::get('/winds', 'WindController@index');
Route::post('/winds', 'WindController@store')->middleware('permissions:admin');
Route::get('/winds/latest', 'WindController@latest');

Route::get('/photo', 'PhotoController@index');
Route::get('/photo/all', 'PhotoController@all');
Route::post('/photo/save', 'PhotoController@savePhoto')->middleware('chekweatherstation');




Route::any('{all}', function () {
    return view('index');
})
->where(['all' => '.*']);
