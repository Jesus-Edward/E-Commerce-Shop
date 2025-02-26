<?php

namespace App\Http\Requests;

use App\Models\Coupon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdminUpdateCouponRequest extends FormRequest
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
            'name' => ['required', 'max:255', 'uppercase', Rule::unique(Coupon::class)->ignore($this->coupon->id)],
            'discount' => 'required|integer|max:99',
            'expiry_date' => 'required|after:today|date'
        ];
    }

    public function messages()
    {
        return [
            'expiry_date.required' => 'The coupon validity is required'
        ];
    }
}
