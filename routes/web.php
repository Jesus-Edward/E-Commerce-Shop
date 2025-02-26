<?php

use App\Http\Controllers\AdminAdminController;
use App\Http\Controllers\AdminColorController;
use App\Http\Controllers\AdminCouponController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\AdminSizesController;
use App\Http\Controllers\AllProductsController;
use App\Http\Controllers\AllProductUpdateController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [AdminAdminController::class, 'login'])->name('admin.login');
Route::post('admin/auth', [AdminAdminController::class, 'adminAuth'])->name('admin.auth');

Route::middleware('admin')->group(function () {
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::get('dashboard', [AdminAdminController::class, 'index'])->name('index');
        Route::post('logout', [AdminAdminController::class, 'logout'])->name('logout');
        Route::resource('colors', AdminColorController::class);
        Route::resource('sizes', AdminSizesController::class);
        Route::resource('coupon', AdminCouponController::class);
        Route::resource('product', AdminProductController::class);
        Route::get('admin/orders/index', [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('update/{order}/orders', [AdminOrderController::class, 'updateDeliveredAtDate'])->name('update.delivered');
        Route::delete('/delete/{id}/orders', [AdminOrderController::class, 'deleteOrder'])->name('delete.orders');
        Route::get('reviews/index', [ReviewController::class, 'index'])->name('reviews.index');
        Route::get('reviews/status/{review}/{status}/update', [ReviewController::class, 'approveReviews'])->name('reviews.status.update');
        Route::delete('reviews/{id}/delete', [ReviewController::class, 'deleteReviews'])->name('reviews.delete');
        Route::get('users/index', [UserController::class, 'index'])->name('users.index');
        Route::delete('users/{id}/delete', [UserController::class, 'deleteUser'])->name('users.delete');
    });
});
Route::put('admin/change/products/{id}', [AllProductsController::class, 'editProducts'])->name('admin.change.product');
Route::post('admin/save/products', [AllProductsController::class, 'saveProducts'])->name('admin.save.products');
