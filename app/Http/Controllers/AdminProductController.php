<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminCreateProductRequest;
use App\Http\Requests\AdminUpdateProductRequest;
use App\Models\Color;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.products.index')->with([
            'products' => Product::with(['colors', 'sizes'])->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $size = Size::all();
        $color = Color::all();

        return view('admin.products.create')->with([
            'sizes' => $size,
            'colors' => $color
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $size = Size::all();
        $color = Color::all();

        return view('admin.products.edit')->with([
            'product' => $product,
            'sizes' => $size,
            'colors' => $color
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = product::findOrFail($id);
            $this->removeImage($product->thumbnail);
            $this->removeImage($product->first_image);
            $this->removeImage($product->second_image);
            $this->removeImage($product->third_image);
            $product->delete($id);

            return response(['status' => 'success', 'message' => 'Deleted Successfully!']);
        } catch (\Exception $e) {
            return response(['status' => 'error', 'message' => 'Something went wrong in the frontend']);
        }
    }

    /**
     * Save an image to the storage
     */

    public function saveImage($request, $inputName, $oldPath = NULL, $path = "images/products")
    {
        // $image_name = time() . '_' . $file->getClientOriginalName();
        // $file->storeAs('images/products/', $image_name, 'public');
        // return 'storage/images/products/' . $image_name;

        if ($request->hasFile($inputName)) {
            if ($oldPath && File::exists(public_path($oldPath))) {
                File::delete(public_path($oldPath));
            };
            $image = $request->{$inputName};
            $ext = $image->getClientOriginalExtension();
            $imageName = 'media' . uniqid() . '.' . $ext;

            $image->move(public_path($path), $imageName);

            return $path . '/' . $imageName;
        }
        return NULL;
    }

    /**
     * Removes an image from the storage
     */

    public function removeImage($file)
    {
        $path = public_path('storage/images/products/' . $file);

        if (File::exists($path)) {
            File::delete($path);
        }
    }
}
