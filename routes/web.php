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
Route::get('/pressures', 'PressureController@index');
Route::get('/pressures/latest', 'PressureController@latest');
Route::post('/pressures/add', 'PressureController@addData')->middleware('permissions:admin');

Route::get('/settings', 'SettingController@index')->middleware('permissions:admin');

Route::get('/temperatures', 'TemperatureController@index');
Route::get('/temperatures/latest', 'TemperatureController@latest');
Route::post('/temperatures/add', 'TemperatureController@addData')->middleware('permissions:admin');

Route::get('/winds', 'WindController@index');
Route::get('/winds/latest', 'WindController@latest');
Route::post('/winds/add', 'WindController@addData')->middleware('permissions:admin');

Route::get('/photo', 'PhotoController@index');
Route::get('/photo/all', 'PhotoController@all');
Route::post('/photo/save', 'PhotoController@savePhoto')->middleware('chekweatherstation');

Route::any('{all}', function () {
    return view('index');
})
->where(['all' => '.*']);
