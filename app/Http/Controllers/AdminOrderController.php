<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    /**
     * Display all users orders
     */

     public function index() {
        $orders = Order::with(['product', 'user', 'coupon'])->latest()->orderBy('created_at', 'DESC')->get();
        return view('admin.orders.index')->with(['orders' => $orders]);
    }

    /**
     * Update the orders delivered at date
     */

    public function updateDeliveredAtDate(Order $order){
        $order->update([
            'delivered_at' => Carbon::now(),
        ]);

        return to_route('admin.orders.index')->with([
            'success' => 'Order updated successfully'
        ]);
    }

    /**
     * Delete the orders made by users
     */

    public function deleteOrder(string $id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->delete();

            return to_route('admin.orders.index')->with([
                'success' => 'Order deleted successfully'
            ]);
        } catch (\Exception $e) {
            logger($e);
        }
    }
}

