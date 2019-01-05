<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Weather\Records\Humidity;
use Illuminate\Database\Eloquent\Collection;

class LatestHumidity
{
    /** @return Humidity[]|Collection */
    public function resolve(): Collection
    {
        return Humidity::latest();
    }
}
