@extends('admin.layouts.master')

@section('title')
    Create Products
@endsection

@section('contents')
    <div class="leading-loose">
        <form class="p-10 bg-white rounded shadow-lg" method="POST" action="{{ route('admin.save.products') }}" enctype="multipart/form-data">
            @csrf
            <div class="">
                <label class="block text-sm text-gray-600" for="name">Products Name</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" value="{{ old('name') }}" id="name"
                    name="name" type="text" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('name'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('name') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Quantity</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" value="{{ old('qty') }}" id="name"
                    name="qty" type="number" placeholder="Quantity" aria-label="Name">
            </div>
            @if ($errors->has('qty'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('qty') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Price</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" value="{{ old('price') }}" id="name"
                    name="price" type="Number" placeholder="Price" aria-label="Name">
            </div>
            @if ($errors->has('price'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('price') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Description</label>
                <textarea rows="10" class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" id="name"
                    name="description" type="text" placeholder="Description" aria-label="Name">{{ old('description') }}
                </textarea>
            </div>
            @if ($errors->has('description'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('description') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Colors</label>
                <select name="color[]" id="color" class="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded" multiple>
                    @foreach ($colors as $color)
                        <option @if (collect(old('color'))->contains($color->id)) selected @endif
                        value="{{ $color->id }}">{{ $color->name }}</option>
                    @endforeach
                </select>
            </div>
            @if ($errors->has('color'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('color') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Sizes</label>
                <select name="size[]" id="" class="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded" multiple>
                    @foreach ($sizes as $size)
                        <option @if (collect(old('size'))->contains($size->id)) selected @endif
                        value="{{ $size->id }}">{{ $size->name }}</option>
                    @endforeach
                </select>
            </div>
            @if ($errors->has('size'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('size') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Thumbnail</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" id="thumbnail"
                    name="thumbnail" type="file" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('thumbnail'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('thumbnail') }}</strong>
                </small>
            @endif
            <div class="mt-2">
                <img src="#" id="thumbnail_preview" class="w-20 h-20 rounded hidden mb-2">
            </div>

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">First Image</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" value="{{ old('name') }}" id="first_image"
                    name="first_image" type="file" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('first_image'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('first_image') }}</strong>
                </small>
            @endif
            <div class="mt-2">
                <img src="#" id="first_image_preview" class="w-20 h-20 rounded hidden mb-2">
            </div>

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Second Image</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" id="second_image"
                    name="second_image" type="file" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('second_image'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('second_image') }}</strong>
                </small>
            @endif
            <div class="mt-2">
                <img src="#" id="second_image_preview" class="w-20 h-20 rounded hidden mb-2">
            </div>

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Third Image</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" value="{{ old('name') }}" id="third_image"
                    name="third_image" type="file" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('third_image'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('third_image') }}</strong>
                </small>
            @endif
            <div class="mt-2">
                <img src="#" id="third_image_preview" class="w-20 h-20 rounded hidden mb-2">
            </div>

            <div class="mt-6">
                <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit">Create</button>
            </div>

        </form>
    </div>
@endsection
