<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminCreateProductRequest;
use App\Http\Requests\AdminUpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class AllProductsController extends Controller
{
    function saveProducts(AdminCreateProductRequest $request)
    {

        $thumbnailPath = $this->saveImage($request, 'thumbnail');
        $first_imagePath = $this->saveImage($request, 'first_image');
        $second_imagePath = $this->saveImage($request, 'second_image');
        $third_imagePath = $this->saveImage($request, 'third_image');

        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::slug($request->name);
        $product->price = $request->price;
        $product->qty = $request->qty;
        $product->description = $request->description;
        // $product->status = $request->status;
        $product->thumbnail = $thumbnailPath;
        $product->first_image = $first_imagePath;
        $product->second_image = $second_imagePath;
        $product->third_image = $third_imagePath;

        $product->save();
        $product->colors()->sync($request->color);
        $product->sizes()->sync($request->size);
        return to_route('admin.product.index')
            ->with([
                'success' => 'Product has been updated successfully'
            ]);
        // if ($request->validated()) {

        //     $data = $request->all();
        //     $data['thumbnail'] = $this->saveImage($request->file('thumbnail'));

        //     // Checks if optional images are uploaded

        //     if ($request->has('first_image')) {
        //         $data['first_image'] = $this->saveImage($request->file('first_image'));
        //     }
        //     if ($request->has('second_image')) {
        //         $data['second_image'] = $this->saveImage($request->file('second_image'));
        //     }
        //     if ($request->has('third_image')) {
        //         $data['third_image'] = $this->saveImage($request->file('third_image'));
        //     }

        //     $data['slug'] = Str::slug($request->name);

        //     $product = Product::create($data);
        //     $product->colors()->sync($request->color);
        //     $product->sizes()->sync($request->size);

        //     return to_route('admin.product.index')
        //     ->with([
        //         'success' => 'Product has been updated successfully'
        //     ]);
        // }
    }

    /**
     * Update the specified resource in storage.
     */
    public function editProducts(AdminUpdateProductRequest $request, string $id)
    {
        $product = Product::findOrFail($id);

        $thumbnailPath = $this->saveImage($request, 'thumbnail', $product->thumbnail);
        $first_imagePath = $this->saveImage($request, 'first_image', $product->first_image);
        $second_imagePath = $this->saveImage($request, 'second_image', $product->second_image);
        $third_imagePath = $this->saveImage($request, 'third_image', $product->third_image);

        $product->name = $request->name;
        $product->slug = Str::slug($request->name);
        $product->price = $request->price;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->thumbnail = !empty($thumbnailPath) ? $thumbnailPath : $product->thumbnail;
        $product->first_image = !empty($first_imagePath) ? $first_imagePath : $product->first_image;
        $product->second_image = !empty($second_imagePath) ? $second_imagePath : $product->second_image;
        $product->third_image = !empty($third_imagePath) ? $third_imagePath : $product->third_image;;

        $product->update();
        $product->colors()->sync($request->color);
        $product->sizes()->sync($request->size);
        return
            response([
                'message' => 'Product has been updated successfully'
            ]);
        // if ($request->validated()) {

        //     $data = $request->all();

        //     if ($request->has('thumbnail')) {
        //         $this->removeImage($request->file('thumbnail'));
        //         $data['thumbnail'] = $this->saveImage($request->file('thumbnail'));
        //     }
        //     // Checks if optional images are uploaded
        //     if ($request->has('first_image')) {
        //         $this->removeImage($request->file('first_image'));
        //         $data['first_image'] = $this->saveImage($request->file('first_image'));
        //     }
        //     if ($request->has('second_image')) {
        //         $this->removeImage($request->file('second_image'));
        //         $data['second_image'] = $this->saveImage($request->file('second_image'));
        //     }
        //     if ($request->has('third_image')) {
        //         $this->removeImage($request->file('third_image'));
        //         $data['third_image'] = $this->saveImage($request->file('third_image'));
        //     }

        //     $data['slug'] = Str::slug($request->name);

        //     $product->colors()->sync($request->color);
        //     $product->sizes()->sync($request->size);
        //     $product->update($data);

        //     if ($request->ajax()) {
        //         return response(['message' => 'Product updated successfully!']);
        //     } else {
        //         return redirect()->back();
        //     }
        // }
    }

    /**
     * Save an image to the storage
     */

    public function saveImage($request, $inputName, $oldPath = NULL, $path = "images/products")
    {

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
}
