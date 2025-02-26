@extends('admin.layouts.master')

@section('title')
    Update Coupons
@endsection

@section('contents')
    <div class="leading-loose">
        <form class="p-10 bg-white rounded shadow-lg" method="POST" action="{{ route('admin.coupon.update', $coupons->id) }}">
            @csrf
            @method('PUT')
            <div class="">
                <label class="block text-sm text-gray-600" for="name">Coupon Name</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" value="{{ $coupons->name }}" id="name"
                    name="name" type="text" placeholder="Name of Coupons" aria-label="Name">
            </div>
            @if ($errors->has('name'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('name') }}</strong>
                </small>
            @endif

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Discount</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" value="{{ $coupons->discount }}" id="name"
                    name="discount" type="number" placeholder="Discount" aria-label="Name">
            </div>
            @if ($errors->has('discount'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('discount') }}</strong>
                </small>
            @endif

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Expiry Date</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" value="{{ $coupons->expiry_date }}" id="name"
                    name="expiry_date" type="datetime-local" aria-label="Name">
            </div>
            @if ($errors->has('expiry_date'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('expiry_date') }}</strong>
                </small>
            @endif

            <div class="mt-6">
                <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit">Update coupon</button>
            </div>

        </form>
    </div>
@endsection
