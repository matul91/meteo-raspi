<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Weather\Records\Temperature;
use Illuminate\Database\Eloquent\Collection;

class LatestTemperatures
{
    /** @return Temperature[]|Collection */
    public function resolve(): Collection
    {
        return Temperature::latest();
    }
}
