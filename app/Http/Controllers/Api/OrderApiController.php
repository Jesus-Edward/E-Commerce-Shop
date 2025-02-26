<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Coupon;
use App\Models\Order;
use ErrorException;
use Illuminate\Http\Request;
use Stripe\Customer;
use Stripe\PaymentIntent;
use Stripe\PaymentMethod;
use Stripe\Stripe;

class OrderApiController extends Controller
{
    /**
     * Store newly created orders
     */

    public function createOrder(Request $request)
    {
        $order = new Order();

        foreach ($request->products as $product) {
            $order->quantity = $product['qty'];
            $order->user_id = $request->user()->id;
            $order->coupon_id = $product['coupon_id'];
            $order->total = $this->calculateTotal($product['price'], $product['qty'], $product['coupon_id']);
            $order->save();
            $order->products()->attach($product['product_id']);
        }
        return response()->json([
            'user' => UserResource::make($request->user()),
        ]);
    }

    /**
     * Payment method using stripe
     */

    public function StripPaymentMethod(Request $request)
    {
        Stripe::setApiKey("sk_test_51PGcKKC6H8NbZoTzsvGv7og57EKqVROYInSRFhWISwsKlhfdAGea4qwQiOZ1210qP6KDq8NUR0LASupGAAB0LZgX00tvheKAWp");

        try {
            // $paymentMethod = PaymentMethod::create([
            //     'type' => 'card',
            //     'card' => [
            //         'number' => $request->input('card_number'),
            //         'exp_month' => $request->input('exp_month'),
            //         'exp_year' => $request->input('exp_year'),
            //         'cvc' => $request->input('cvc')
            //     ]
            // ]);
            // $customer = Customer::create([
            //     'payment_method' => $paymentMethod->id
            // ]);

            // $customer->payment_methods->attach($paymentMethod->id);
            $paymentMethod = $request->input('payment_method_id');

            $paymentIntent = PaymentIntent::create([
                'amount' => $this->calculateOrderTotal($request->cartItems),
                'currency' => 'ngn',
                'description' => 'React Clothing Store',
                'payment_method' => $paymentMethod->id,
                'confirmation_method' => 'automatic',
                'confirm' => true
            ]);

            $output = [
                'clientSecret' => $paymentIntent->client_secret
            ];

            return response()->json($output);
        } catch (ErrorException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function calculateOrderTotal($items)
    {
        $total = 0;

        foreach ($items as $item) {
            $total += $this->calculateTotal($item['price'], $item['qty'], $item['coupon_id']);
        }
        return $total * 100;
    }

    public function calculateTotal($price, $qty, $coupon_id)
    {
        $discount = 0;
        $total = $price * $qty;
        $coupon = Coupon::find($coupon_id);

        if ($coupon) {
            if ($coupon->checkCouponValidity()) {
                $discount = $total * $coupon->discount / 100;
            }
        }

        return $total - $discount;
    }
}
