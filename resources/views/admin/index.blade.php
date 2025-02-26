@extends('admin.layouts.master')

@section('title')
    Dashboard
@endsection

@section('contents')
    <div class="flex items-center">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div class="rounded-lg shadow-lg w-70 h-40 bg-white">
                <div class="p-5 flex flex-col ">
                    <div class="rounded-lg overflow-hidden">
                        <h2 class="text-2xl">
                            Today's Orders
                        </h2>
                        <hr class="mt-5">
                        <p class="mt-5">
                            {{ $todayOrders->count() }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg shadow-lg w-70 h-40 bg-white">
                <div class="p-5 flex flex-col">
                    <div class="rounded-lg overflow-hidden">
                        <h2 class="text-2xl">
                            Yesterday's Orders
                        </h2>
                        <hr class="mt-5">
                        <p class="mt-5">
                            {{ $yesterdayOrders->count() }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg shadow-lg w-70 h-40 bg-white">
                <div class="p-5 flex flex-col ">
                    <div class="rounded-lg overflow-hidden">
                        <h2 class="text-2xl">
                            Monthly Orders
                        </h2>
                        <hr class="mt-5">
                        <p class="mt-5">
                            {{ $monthlyOrders->count() }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg shadow-lg w-70 h-40 bg-white">
                <div class="p-5 flex flex-col ">
                    <div class="rounded-lg overflow-hidden">
                        <h2 class="text-2xl">
                            Yearly Orders
                        </h2>
                        <hr class="mt-5">
                        <p class="mt-5">
                            {{ $yearlyOrders->count() }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
