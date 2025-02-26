<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'email' => 'required|email|lowercase|max:255|unique:users',
            'password' => ['required', Password::min(8)->mixedCase()->symbols()]
        ];
    }

    // public function messages()
    // {
    //     return [
    //         'password.required' => 'The password field is required',
    //         'password.min' => 'The password must be at least ' + min(8) + 'characters long',
    //         'password.mixCase' => 'The password must contain a lower or upper cased letter',
    //         'password.symbol' => 'The password must contain at least 1 special characters'
    //     ];
    // }
}
