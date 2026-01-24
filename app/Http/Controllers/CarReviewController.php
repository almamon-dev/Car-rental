<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CarReview;
use App\Models\ReviewLike;
use Illuminate\Support\Facades\Auth;

class CarReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        CarReview::create([
            'user_id' => Auth::id(),
            'car_id' => $request->car_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'status' => 'approved', // Auto-approve for now
        ]);

        return back()->with('success', 'Review submitted successfully.');
    }

    public function toggleLike($reviewId)
    {
        $like = ReviewLike::where('user_id', Auth::id())
            ->where('review_id', $reviewId)
            ->first();

        if ($like) {
            $like->delete();
            return back()->with('success', 'Review unliked.');
        } else {
            ReviewLike::create([
                'user_id' => Auth::id(),
                'review_id' => $reviewId,
            ]);
            return back()->with('success', 'Review liked.');
        }
    }
}
