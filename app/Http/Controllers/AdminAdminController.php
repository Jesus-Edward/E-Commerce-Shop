<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminAdminAuthRequest;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todayOrders = Order::whereDay('created_at', Carbon::today())->get();
        $yesterdayOrders = Order::whereDay('created_at', Carbon::yesterday())->get();
        $monthlyOrders = Order::whereMonth('created_at', Carbon::now()->month)->get();
        $yearlyOrders = Order::whereYear('created_at', Carbon::now()->year)->get();

        return view('admin.index')->with([
            'todayOrders' => $todayOrders,
            'yesterdayOrders' => $yesterdayOrders,
            'monthlyOrders' => $monthlyOrders,
            'yearlyOrders' => $yearlyOrders
        ]);
    }


    /**
     *  Displays the admin login form
     */

    public function login()
    {
        if (!auth()->guard('admin')->check()) {
            return view('admin/login');
        }
        return redirect()->route('admin.index');
    }

    /**
     * Auth the admin user
     */
    public function adminAuth(AdminAdminAuthRequest $request)
    {
        if ($request->validated()) {

            if (auth()->guard('admin')->attempt([
                'email' => $request->email,
                'password' => $request->password
            ])) {

                $request->session()->regenerate();

                return redirect()->route('admin.index');
            } else {
                return redirect()->route('admin.login')->with([
                    'error' => 'These credentials do not match our records, try again!'
                ]);
            }
        }
    }

    /**
     * Logout the admin user
     */
    public function logout()
    {
        auth()->guard('admin')->logout();
        return redirect()->route('admin.index');
    }
}
