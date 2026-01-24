<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = ['name', 'city', 'status'];

    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
