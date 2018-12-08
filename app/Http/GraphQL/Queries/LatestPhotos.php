<?php

namespace App\Http\GraphQL\Queries;

use App\Models\Photo;
use App\Repositories\PhotoRepository;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class LatestPhotos
{
    /** @var PhotoRepository */
    private $photoRepository;

    public function __construct(PhotoRepository $photoRepository)
    {
        $this->photoRepository = $photoRepository;
    }

    /** @return Photo[] */
    public function resolve(?string $root, array $args, GraphQLContext $context, ResolveInfo $info): array
    {
        return $this->photoRepository->latest($args['limit']);
    }
}
