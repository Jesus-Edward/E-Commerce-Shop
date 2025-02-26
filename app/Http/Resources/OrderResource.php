<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'products' => $this->products,
            'coupon' => $this->coupon,
            'total' => $this->total,
            'quantity' => $this->quantity,
            'created_at' => $this->getCreatedAttribute($this->created_at),
            'delivered_at' => $this->delivered_at ? Carbon::parse($this->delivered_at)->diffForHumans() : null,
        ];
    }
}
