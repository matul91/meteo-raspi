<?php

namespace App\Http\GraphQL\Queries;

use App\Photo;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Database\Eloquent\Collection;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class LatestPhotos
{
    /** @return Photo[]|Collection */
    public function resolve($root, array $args, GraphQLContext $context, ResolveInfo $info): Collection
    {
        return Photo::latest($args['limit']);
    }
}
