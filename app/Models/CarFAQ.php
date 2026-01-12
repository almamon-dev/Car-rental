<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarFAQ extends Model
{
    protected $fillable = ['car_id', 'question', 'answer'];

    protected $table = 'car_f_a_q_s';

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
