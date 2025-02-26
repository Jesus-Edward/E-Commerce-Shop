<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Get all reviews by users
     */

    public function index()
    {
        $reviews = Review::latest()->get();
        return view('admin.reviews.index', compact('reviews'));
    }

    /**
     * Approves user's reviews
     */

    public function approveReviews(Review $review, $status)
    {
        $review->update(['approved' => $status]);
        return to_route('admin.reviews.index')->with([
            'success' => 'Review has been updated successfully'
        ]);
    }

    /**
     * Delete user's reviews
     */

    public function deleteReviews($id)
    {
        try {
            $review = Review::findOrFail($id);
            $review->delete();
            return to_route('admin.reviews.index')->with(['message' => 'Review deleted successfully']);
        } catch (\Exception $e) {
            logger($e);
        }
    }
}
