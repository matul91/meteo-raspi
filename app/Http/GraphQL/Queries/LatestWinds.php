<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Weather\Records\Wind;
use Illuminate\Database\Eloquent\Collection;

class LatestWinds
{
    /** @return Wind[]|Collection */
    public function resolve(): Collection
    {
        return Wind::latest();
    }
}