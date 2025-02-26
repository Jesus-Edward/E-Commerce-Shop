<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'total',
        'delivered_at',
        'user_id',
        'coupon_id'
    ];

    public function products(): BelongsToMany
    {
        return $this->BelongsToMany(Product::class);
    }

    public function users(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function coupons()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
}

