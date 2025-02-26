@extends('admin.layouts.master')

@section('title')
    Products({{ $products->count() }})
@endsection

@section('button')
    <a href="{{ route('admin.product.create') }}" class="bg-blue-600 font-semibold
    text-white p-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600">Create products</a>
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
            Thumbnail
          </p>
        </th>
        <th class="p-4 border-b border-slate-200 bg-slate-50">
          <p class="text-sm font-normal leading-none text-slate-500">
            Name
          </p>
        </th>
        <th class="p-4 border-b border-slate-200 bg-slate-50">
          <p class="text-sm font-normal leading-none text-slate-500">
            Color
          </p>
        </th>
        <th class="p-4 border-b border-slate-200 bg-slate-50">
          <p class="text-sm font-normal leading-none text-slate-500">
            Size
          </p>
        </th>
        <th class="p-4 border-b border-slate-200 bg-slate-50">
          <p class="text-sm font-normal leading-none text-slate-500">
            Qty
          </p>
        </th>
        <th class="p-4 border-b border-slate-200 bg-slate-50">
          <p class="text-sm font-normal leading-none text-slate-500">
            Price
          </p>
        </th>
        <th class="p-4 border-b border-slate-200 bg-slate-50">
          <p class="text-sm font-normal leading-none text-slate-500">
            Status
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
        @foreach ($products as $key => $product)

            <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="p-4 py-5">
                    <p class="text-sm text-slate-500">{{ $key + 1 }}</p>
                </td>
                <td class="p-4 py-5">
                    <img src="{{ asset($product->thumbnail) }}" alt="{{ $product->name }}" class="w-20 h-20">
                </td>
                <td class="p-4 py-5"><p class="text-sm text-slate-500">{{ $product->name }}</p></td>
                <td class="p-4 py-5">
                    @foreach ($product->colors as $color)
                        <p class="text-sm text-slate-500">{{ $color->name }}</p>
                    @endforeach
                </td>
                <td class="p-4 py-5">
                    @foreach ($product->sizes as $size)
                        <p class="text-sm text-slate-500">{{ $size->name }}</p>
                    @endforeach
                </td>
                <td class="p-4 py-5"><p class="text-sm text-slate-500">{{ $product->qty }}</p></td>
                <td class="p-4 py-5"><p class="text-sm text-slate-500">{{ $product->price }}</p></td>
                <td class="p-4 py-5">
                     @if ($product->status)
                        <span class="text-sm bg-indigo-500 text-white p-2 md:inline-block sm:inline-block">In Stock</span>
                    @else
                        <span class="text-sm text-white bg-red-500 p-4">Stock out</span>
                    @endif
                </td>
                <td class="p-4 py-5 md:flex mt-6 sm:flex lg:mt-7">
                    <a href="{{ route('admin.product.edit', $product->id) }}" class="bg-indigo-500 p-2 rounded-sm
                        text-white">
                        <i class="fas fa-pen"></i>
                    </a>
                    <a href="{{ route('admin.product.destroy', $product->id) }}" class="delete-item bg-red-500 text-white py-2 px-3 rounded-sm ml-2">
                        <i class="fas fa-times"></i>
                    </a>
                </td>
            </tr>
        @endforeach

    </tbody>

</table>


@endsection
