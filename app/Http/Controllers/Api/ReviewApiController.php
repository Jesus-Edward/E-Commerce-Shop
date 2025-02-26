<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewApiController extends Controller
{
    /**
     * Store reviews
     */

    public function store(Request $request)
    {
        $exist = $this->alreadyReviewed($request->product_id, $request->user()->id);
        if ($exist) {
            return response()->json([
                'error' => "You've already reviewed this product"
            ]);
        } else {
            Review::create([
                'product_id' => $request->product_id,
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'body' => $request->body,
                'rating' => $request->rating,
            ]);
            return response()->json([
                'message' => 'Review added, pending approval'
            ]);
        }
    }

    public function alreadyReviewed($productId, $userId)
    {
        // Check if the review already exist
        $exist = Review::where(['product_id' => $productId, 'user_id' => $userId])->first();
        // Return result
        return $exist;
    }

    /**
     * Edit a review by its reviewer
     */

    public function editReview(Request $request)
    {
        $review = $this->alreadyReviewed($request->product_id, $request->user()->id);
        if ($review) {
            $review->update([
                'product_id' => $request->product_id,
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'body' => $request->body,
                'rating' => $request->rating,
                'approved' => 0
            ]);
            return response()->json([
                'message' => 'Review updated, pending approval'
            ]);
        } else {
            return response()->json([
                'error' => 'Something went wrong, try again!'
            ]);
        }
    }

    /**
     * Delete a review by its reviewer
     */

    public function deleteReview(Request $request)
    {
        try {

            $review = $this->alreadyReviewed($request->product_id, $request->user()->id);
            if ($review) {
                $review->delete();
                return response()->json([
                    'message' => 'Review deleted successfully'
                ]);
            } else {
                return response()->json([
                    'error' => 'Something went wrong, try again!'
                ]);
            }
        } catch (\Exception $e) {
            logger($e);
        }
    }
}
