@extends('admin.layouts.master')

@section('title')
    Orders({{ $orders->count() }})
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
                        Product Name
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Product Price
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Order Quantity
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Total
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Coupon
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        By
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Done
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Delivered at
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
            @foreach ($orders as $key => $order)
                <tr class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $key + 1 }}</p>
                    </td>
                    @foreach ($order->products as $product)
                        <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">{{ $product->name }}</p>
                        </td>
                    @endforeach
                    @foreach ($order->products as $product)
                        <td class="p-4 py-5">
                            <p class="text-sm text-slate-500">{{ $product->price }}</p>
                        </td>
                    @endforeach
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $order->quantity }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $order->total }}</p>
                    </td>
                    <td class="p-4 py-5">
                        @if (@$order->coupons>name)
                            <p class="text-sm text-slate-500">{{ $order->coupons>name }}</p>
                        @else
                            <span>N/A</span>
                        @endif
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $order->users->name }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $order->created_at }}</p>
                    </td>
                    <td class="p-4 py-5">
                        @if ($order->delivered_at)
                            <p class="text-sm text-slate-500">{{ \Carbon\Carbon::parse($order->delivered_at)->diffForHumans() }}</p>
                        @else
                            <a href="{{ route('admin.update.delivered', $order->id) }}">
                                 <i class="fas fa-pen text-white"></i>
                            </a>
                        @endif
                    </td>
                    <td class="p-4 py-5">
                        <a href="{{ route('admin.delete.orders', $order->id) }}"
                            class="delete-item bg-red-500 py-1 px-2 rounded-sm ml-2">
                            <i class="fas fa-times text-white"></i>
                        </a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
