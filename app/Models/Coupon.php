<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'discount', 'expiry_date'];

    /**
     * Converts a lowercase string to uppercase
     */

    public function convertToUpperCase($value)
    {
        $this->attributes['name'] = Str::upper($value);
    }


    /**
     * Check the validity of the coupon created
     */

    public function checkCouponValidity()
    {
        if ($this->attributes['expiry_date'] > Carbon::now()) {
            return true;
        }else {
            return false;
        }
    }
}
