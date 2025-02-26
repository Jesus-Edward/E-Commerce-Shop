<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminCreateSizeRequest;
use App\Http\Requests\AdminUpdateSizeRequest;
use App\Models\Size;
use Illuminate\Http\Request;

class AdminSizesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.sizes.index')->with([
            'sizes' => Size::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.sizes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminCreateSizeRequest $request)
    {
        if ($request->validated()) {
            Size::create($request->validated());
            return to_route('admin.sizes.index')->with([
                'success' => 'Size has been created successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Size $size)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Size $size)
    {
        return view('admin.sizes.edit')->with([
            'size' => $size
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AdminUpdateSizeRequest $request, Size $size)
    {
        if ($request->validated()) {

            $size->update($request->validated());

            return to_route('admin.sizes.index')->with([
                'success' => 'Size has been updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $size = Size::findOrFail($id);
            $size->delete($id);

            return response(['status' => 'success', 'message' => 'Deleted Successfully!']);
        } catch (\Exception $e) {
            return response(['status' => 'error', 'message' => 'Something went wrong in the frontend']);
        }
    }
}
