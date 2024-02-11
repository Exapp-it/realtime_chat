<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::prefix('auth')->group(function () {
  Route::post('login', [AuthController::class, 'login']);
  Route::post('refresh', [AuthController::class, 'refresh']);

  Route::middleware('jwt.auth')->group(function () {
    Route::delete('logout', [AuthController::class, 'logout']);
    Route::post('me', [AuthController::class, 'me']);
  });

  Route::post('/register', [RegisterController::class, 'store']);
});

Route::middleware('jwt.auth')->group(function () {
  Route::prefix('chat')->group(function () {
    Route::get('', [ChatController::class, 'index']);
    Route::post('send', [ChatController::class, 'send']);
  });
});
