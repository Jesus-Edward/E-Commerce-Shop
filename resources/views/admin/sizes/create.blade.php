@extends('admin.layouts.master')

@section('title')
    Create Sizes
@endsection

@section('contents')
    <div class="leading-loose">
        <form class="p-10 bg-white rounded shadow-lg" method="POST" action="{{ route('admin.sizes.store') }}">
            @csrf
            <div class="">
                <label class="block text-sm text-gray-600" for="name">Sizes Name</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" value="{{ old('name') }}" id="name"
                    name="name" type="text" placeholder="Name of Sizes" aria-label="Name">
            </div>
            @if ($errors->has('name'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('name') }}</strong>
                </small>
            @endif

            <div class="mt-6">
                <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit">Create</button>
            </div>

        </form>
    </div>
@endsection
