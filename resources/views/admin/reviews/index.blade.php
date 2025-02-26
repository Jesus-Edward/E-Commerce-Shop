@extends('admin.layouts.master')

@section('title')
    Reviews({{ $reviews->count() }})
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
                        Sender
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Title
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Body
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Rating
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Product Image
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Approved
                    </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-slate-50">
                    <p class="text-sm font-normal leading-none text-slate-500">
                        Posted
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
            @foreach ($reviews as $key => $review)
                <tr class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $key + 1 }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $review->user->name }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $review->title }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $review->body }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $review->rating }}</p>
                    </td>
                    <td class="p-4 py-5">
                        <img src="{{ asset($review->product->thumbnail) }}" class="w-16 h-16" alt="{{ $review->product->name }}">
                    </td>
                    <td class="p-4 py-5">
                        @if ($review->approved)
                            <span class="bg-blue-500 py-1 px-2 text-white font-semibold">
                                Yes
                            </span>
                        @else
                             <span class="bg-red-500 px-2 py-1 text-white font-semibold">
                                No
                            </span>
                        @endif
                    </td>
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500">{{ $review->created_at}}</p>
                    </td>
                    <td class=" py-5 flex mt-20">
                        @if ($review->approved)
                             <a href="{{ route('admin.reviews.status.update', ['review' => $review->id, 'status' => 0]) }}"
                                class=" bg-red-500 py-1 px-2 rounded-sm ml-2">
                                <i class="fas fa-eye-slash text-white"></i>
                            </a>
                        @else
                             <a href="{{ route('admin.reviews.status.update', ['review' => $review->id, 'status' => 1]) }}"
                                class=" bg-red-500 py-1 px-2 rounded-sm ml-2">
                                <i class="fas fa-eye-slash text-white"></i>
                            </a>
                        @endif
                        <a href="{{ route('admin.reviews.delete', $review->id) }}"
                            class="delete-item bg-red-500 py-1 px-2 rounded-sm ml-2">
                            <i class="fas fa-times text-white"></i>
                        </a>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
