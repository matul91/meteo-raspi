<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Station\NetworkStatus;
use Illuminate\Database\Eloquent\Collection;

class LatestNetworkStatus
{
    /** @return NetworkStatus[]|Collection */
    public function resolve(): Collection
    {
        return NetworkStatus::latest(1);
    }
}
