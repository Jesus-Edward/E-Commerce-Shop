@extends('admin.layouts.master')

@section('title')
    Manage Coupons({{ $coupons->count() }})
@endsection

@section('button')
    <a href="{{ route('admin.coupon.create') }}"
        class="bg-blue-600 font-semibold
    text-white p-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600">
        Create Coupon</a>
@endsection

@section('contents')
    <table id="search-table">
        <thead>
            <tr>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        S/N
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Coupon Names
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Discount
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Expiry Date
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Action
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach ($coupons as $key => $coupon)
                <tr class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $key + 1 }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $coupon->name }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $coupon->discount }}%</p>
                    </td>
                    <td class="p-4 py-5">
                        @if ($coupon->checkCouponValidity())
                            <span class="text-sm text-white bg-indigo-700 p-2">
                                Expires {{ \Carbon\Carbon::parse($coupon->expiry_date)->diffForHumans() }}
                                </spab>
                            @else
                                <span class="bg-red-500 text-white text-sm p-2">
                                    Expired
                                </span>
                        @endif
                    </td>
                    <td class="p-4 py-5">
                        <a href="{{ route('admin.coupon.edit', $coupon->id) }}" class="bg-indigo-500 p-1 rounded-sm">
                            <i class="fas fa-pen text-white"></i>
                        </a>
                        <a href="{{ route('admin.coupon.destroy', $coupon->id) }}"
                            class="delete-item bg-red-500 py-1 px-2 rounded-sm ml-2">
                            <i class="fas fa-times text-white"></i>
                        </a>
                    </td>
                </tr>
            @endforeach

        </tbody>
    </table>
@endsection
