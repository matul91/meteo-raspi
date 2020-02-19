<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Station\BatteryStatus;
use Illuminate\Database\Eloquent\Collection;

class LatestBatteryStatus
{
    /** @return BatteryStatus[]|Collection */
    public function resolve(): Collection
    {
        return BatteryStatus::latest(1);
    }
}
