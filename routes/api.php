<?php

use App\Http\Controllers\AllProductsController;
use App\Http\Controllers\Api\CouponApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\ReviewApiController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('user', function(Request $request) {

        return [

            'user' => UserResource::make($request->user()),

            'accessToken' => $request->bearerToken()

        ];

    });

    Route::put('update/profile/user', [UserController::class, 'updateUserInfo']);
    Route::post('user/logout', [UserController::class, 'loggedOut']);
    // Coupon
    Route::post('apply/coupon', [CouponApiController::class, 'applyCoupon']);
    // Order Route
    Route::post('store/order', [OrderApiController::class, 'createOrder']);
    Route::post('pay/order', [OrderApiController::class, 'StripPaymentMethod']);
    // Review Route
    Route::post('review/store', [ReviewApiController::class, 'store']);
    Route::put('review/update', [ReviewApiController::class, 'editReview']);
    Route::post('review/delete', [ReviewApiController::class, 'deleteReview']);

});

// Product Routes
Route::get('products', [ProductApiController::class, 'index']);
Route::get('product/{product}/show', [ProductApiController::class, 'show']);
Route::get('products/{color}/color', [ProductApiController::class, 'filterProductsByColor']);
Route::get('products/{size}/size', [ProductApiController::class, 'filterProductsBySize']);
Route::get('products/{searchTerm}/search', [ProductApiController::class, 'searchProductsByTerm']);

// User info route
Route::post('register/user', [UserController::class, 'storeUser']);
Route::post('user/login', [UserController::class, 'authUser']);
