<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminCreateCouponRequest;
use App\Http\Requests\AdminUpdateCouponRequest;
use App\Models\Coupon;
use Illuminate\Http\Request;

class AdminCouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.coupon.index')->with([
            'coupons' => Coupon::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.coupon.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminCreateCouponRequest $request)
    {
        $validatedData = $request->validated();
        if ($validatedData) {
            Coupon::create($validatedData);
            return to_route('admin.coupon.index')->with([
                'success' => 'Coupon has been created successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Coupon $coupon)
    {
        return view('admin.coupon.edit')->with([
            'coupons' => $coupon
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AdminUpdateCouponRequest $request, Coupon $coupon)
    {
        if ($request->validated()) {

            $coupon->update($request->validated());

            return to_route('admin.coupon.index')->with([
                'success' => 'Coupon has been updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $coupon = Coupon::findOrFail($id);
            $coupon->delete($id);

            return response(['status' => 'success', 'message' => 'Deleted Successfully!']);
        } catch (\Exception $e) {
            return response(['status' => 'error', 'message' => 'Something went wrong in the frontend']);
        }
    }
}
