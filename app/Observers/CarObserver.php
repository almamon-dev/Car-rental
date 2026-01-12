<?php

namespace App\Observers;

use App\Models\Car;
use Illuminate\Support\Facades\Cache;

class CarObserver
{
    /**
     * Clear car-related caches whenever data changes
     */
    private function clearCarCache()
    {

        Cache::flush();
    }

    public function created(Car $car)
    {
        $this->clearCarCache();
    }

    public function updated(Car $car)
    {
        $this->clearCarCache();
    }

    public function deleted(Car $car)
    {
        $this->clearCarCache();
    }
}
