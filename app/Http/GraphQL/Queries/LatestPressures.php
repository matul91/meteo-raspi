<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Weather\Records\Pressure;
use Illuminate\Database\Eloquent\Collection;

class LatestPressures
{
    /** @return Pressure[]|Collection */
    public function resolve(): Collection
    {
        return Pressure::latest();
    }
}