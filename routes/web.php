<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;


Route::get('/{page}', [PageController::class, 'index'])
    ->where('page', '^(?!broadcasting/auth).*');

