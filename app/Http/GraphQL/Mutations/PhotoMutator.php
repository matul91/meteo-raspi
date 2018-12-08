<?php

namespace App\Http\GraphQL\Mutations;

use App\Facades\PhotoFacade;
use App\Models\Photo;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Http\Request;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PhotoMutator
{
    /** @var Request */
    private $request;

    /** @var PhotoFacade */
    private $photoFacade;

    public function __construct(Request $request, PhotoFacade $photoFacade)
    {
        $this->request = $request;
        $this->photoFacade = $photoFacade;
    }

    public function recordPhoto(?string $root, array $args, GraphQLContext $context, ResolveInfo $info): Photo
    {
        return $this->photoFacade->storePhoto($this->request);
    }
}
