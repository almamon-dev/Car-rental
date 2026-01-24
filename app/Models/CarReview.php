<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarReview extends Model
{
    protected $fillable = ['user_id', 'car_id', 'rating', 'comment', 'is_verified', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function likes()
    {
        return $this->hasMany(ReviewLike::class, 'review_id');
    }
}
