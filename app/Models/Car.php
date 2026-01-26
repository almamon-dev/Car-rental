<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Car extends Model
{
    protected $fillable = [
        'make', 'model', 'slug', 'year', 'rental_type', 'description', 'brand_id', 'category_id', 'location_id',
        'status', 'transmission', 'seats', 'fuel_type', 'mileage', 'steering', 'engine_capacity', 'color',
        'daily_rate', 'weekly_rate', 'monthly_rate', 'currency'
    ];

    protected $appends = ['image_url', 'name', 'average_rating'];

    public function getImageUrlAttribute()
    {
        return $this->images->first() ? asset($this->images->first()->file_path) : null;
    }

    public function getNameAttribute()
    {
        return "{$this->make} {$this->model}";
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($car) {
            if (empty($car->slug)) {
                $car->slug = \Illuminate\Support\Str::slug($car->make.' '.$car->model.' '.\Illuminate\Support\Str::random(5));
            }
        });
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(CarImage::class);
    }

    public function specifications(): HasOne
    {
        return $this->hasOne(CarSpecification::class);
    }

    public function features(): HasMany
    {
        return $this->hasMany(CarFeature::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(CarFAQ::class);
    }

    public function policeDocuments(): HasOne
    {
        return $this->hasOne(CarPoliceDocument::class, 'car_id');
    }

    public function priceDetails(): HasOne
    {

        return $this->hasOne(CarPriceDetail::class, 'car_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(CarReview::class)->latest();
    }

    public function getAverageRatingAttribute()
    {
        return round($this->reviews()->where('status', 'approved')->avg('rating') ?: 5, 1);
    }
}
