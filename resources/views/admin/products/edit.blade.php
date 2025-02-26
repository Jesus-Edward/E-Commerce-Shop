@extends('admin.layouts.master')

@section('title')
    Edit Products
@endsection

@section('contents')
    <div class="leading-loose">
        <form class="update-form p-10 bg-white rounded shadow-lg" method="POST" action="" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <input type="hidden" data-product_id="{{ $product->id }}" id="productId">
            <div class="">
                <label class="block text-sm text-gray-600" for="name">Product Name</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" value="{{ $product->name }}" id="name"
                    name="name" type="text" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('name'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('name') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Quantity</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" value="{{ $product->qty }}" id="qty"
                    name="qty" type="Number" placeholder="Qunatity" aria-label="Name">
            </div>
            @if ($errors->has('qty'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('qty') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Price</label>
                <input class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" value="{{ $product->price }}" id="price"
                    name="price" type="Number" placeholder="Price" aria-label="Name">
            </div>
            @if ($errors->has('price'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('price') }}</strong>
                </small>
            @endif
            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Description</label>
                <textarea rows="10" class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="description"
                    name="description" type="text" placeholder="Description" aria-label="Name">{{ $product->description }}
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
                        <option @if (collect(old('color'))->contains($color->id)
                        || $product->colors->contains($color->id)) selected @endif value="{{ $color->id }}" >{{ $color->name }}</option>
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
                <select name="size[]" id="size" class="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded" multiple>
                    @foreach ($sizes as $size)
                        <option @if (collect(old('size'))->contains($size->id)
                        || $product->sizes->contains($size->id)) selected @endif value="{{ $size->id }}" >{{ $size->name }}</option>
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
                <img src="{{ asset($product->thumbnail) }}" id="thumbnail_preview" class="w-20 h-20 rounded mb-2">
            </div>

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">First Image</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" id="first_image"
                    name="first_image" type="file" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('first_image'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('first_image') }}</strong>
                </small>
            @endif
            <div class="mt-2">
                <img src="{{ asset($product->first_image) }}" id="first_image_preview" class="w-20 h-20 rounded
                @if(!$product->first_image) hidden @endif mb-2">
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
                <img src="{{ asset($product->second_image) }}" id="second_image_preview" class="w-20 h-20
                @if(!$product->second_image) hidden @endif mb-2">
            </div>

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Third Image</label>
                <input class="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" id="third_image"
                    name="third_image" type="file" placeholder="Name of Products" aria-label="Name">
            </div>
            @if ($errors->has('third_image'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('third_image') }}</strong>
                </small>
            @endif
            <div class="mt-2">
                <img src="{{ asset($product->third_image) }}" id="third_image_preview" class="w-20 h-20 rounded
                @if(!$product->third_image) hidden @endif mb-2">
            </div>

            <div class="mt-3">
                <label class="block text-sm text-gray-600" for="name">Status</label>
                <select name="status" id="" class="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded">
                    <option @selected($product->status === 1) value="1">Active</option>
                    <option @selected($product->status === 0) value="0">Inactive</option>
                </select>
            </div>
            @if ($errors->has('status'))
                <small class="text-red-500">
                    <strong>{{ $errors->first('status') }}</strong>
                </small>
            @endif

            <div class="mt-6">
                <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                    type="submit">Update</button>
            </div>

        </form>
    </div>
@endsection

@push('script')

    <script>
        $(document).ready(function() {
            $('.update-form').on('submit', function(e) {
                e.preventDefault();

                let product_id = $('#productId').attr('data-product_id');
                let formData = new FormData(this);

                // console.log(product_id);

                $.ajax({
                        method: 'POST',
                        url: '{{ route("admin.change.product", ":product_id") }}'.replace(":product_id", product_id),
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function(response){

                           Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: response.message,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            window.location.href = "{{ route('admin.product.index') }}"
                        },
                        error: function(xhr, status, error){
                            console.error(xhr.responseJSON.message);
                        },
                   })
            })
        })
    </script>

@endpush
