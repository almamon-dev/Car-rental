<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Car extends Model
{
    protected $fillable = [
        'make', 'model', 'year', 'rental_type', 'description', 'brand_id', 'category_id',
        'status',
    ];

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
        return $this->hasOne(CarPoliceDocument::class);
    }

    public function priceDetails(): HasOne
    {
        return $this->hasOne(CarPriceDetail::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
