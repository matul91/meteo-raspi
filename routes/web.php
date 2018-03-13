<?php
use Illuminate\Http\Request;
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
Route::get('/photoController', 'PhotoController@index');
Route::get('/photoController/all', 'PhotoController@all');

Route::get('/pressures', 'PressureController@index');
Route::get('/pressures/latest', 'PressureController@latest');

Route::get('/settings', 'SettingController@index');

Route::get('/temperatures', 'TemperatureController@index');
Route::get('/temperatures/latest', 'TemperatureController@latest');

Route::get('/winds', 'WindController@index');
Route::get('/winds/latest', 'WindController@latest');

Route::any('{all}', function () {
    return view('index');
})
->where(['all' => '.*']);