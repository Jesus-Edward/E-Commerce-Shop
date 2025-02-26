<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminColorStoreRequest;
use App\Http\Requests\AdminColorUpdateRequest;
use App\Models\Color;
use Illuminate\Http\Request;

class AdminColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('admin.colors.index')->with([
            'colors' => Color::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.colors.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminColorStoreRequest $request)
    {
        if ($request->validated()) {
            Color::create($request->validated());
            return to_route('admin.colors.index')->with([
                'success' => 'Color has been created successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Color $color)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Color $color)
    {
        return view('admin.colors.edit')->with([
             'color' => $color
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AdminColorUpdateRequest $request, Color $color)
    {
        if ($request->validated()) {

            $color->update($request->validated());

            return to_route('admin.colors.index')->with([
                'success' => 'Color has been updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $color = Color::findOrFail($id);
            $color->delete($id);

            return response(['status' => 'success', 'message' => 'Deleted Successfully!']);
        } catch (\Exception $e) {
            return response(['status' => 'error', 'message' => 'Something went wrong in the frontend']);
        }

    }
}
