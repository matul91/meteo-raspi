<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Weather\Records\Wind;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class LatestWinds
{
    /** @return Wind[] */
    public function resolve(?string $root, array $args, GraphQLContext $context, ResolveInfo $info): array
    {
        return Wind::latest($args['limit'])->toArray();
    }
}
