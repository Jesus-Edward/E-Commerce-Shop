<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminUpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255',
            'qty' => 'required|numeric',
            'price' => 'required|numeric',
            'color_id' => 'nullable|integer',
            'size_id' => 'nullable|integer',
            'description' => 'required|max:5000',
            'thumbnail' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'first_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'second_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'third_image' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'color_id.required' => 'The color field is required',
            'size_id.required' => 'The size field is required',
            'description.max' => 'The description field must not be greater than :max characters'
        ];
    }
}
