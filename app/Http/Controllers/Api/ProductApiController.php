<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Color;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    /**
     * Get all the products into the product resource
     */
    public function index() {
        return ProductResource::collection(
            Product::with(['colors', 'sizes', 'reviews'])
            ->latest()->get())->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }

    /**
     * Get all the products by their slug
     */
    public function show(string $slug)
    {
        $product = Product::findOrFail($slug);

        if (!$product) {
            abort(404);
        }
        return ProductResource::make($product->load(['colors', 'sizes', 'reviews']));
    }

    /**
     * Filter products by color
     */
    public function filterProductsByColor(Color $color)
    {
        return ProductResource::collection(
            $color->products()->with(['colors', 'sizes', 'reviews'])
            ->latest()->get())
            ->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }

    /**
     * Filter products by size
     */
    public function filterProductsBySize(Size $size)
    {
        return ProductResource::collection(
            $size->products()->with(['colors', 'sizes', 'reviews'])
            ->latest()->get()
        )
            ->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }

    /**
     * Search products by term
     */
    public function searchProductsByTerm($searchTerm)
    {
        return ProductResource::collection(
            Product::where('name', 'LIKE', '%'.$searchTerm.'%')->with(['colors', 'sizes', 'reviews'])
            ->latest()->get()
        )
            ->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }
}
