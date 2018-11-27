<?php

namespace App\Http\GraphQL\Mutations;

use App\Photo;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Http\Request;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PhotoMutator
{
    /** @var Request */
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function recordPhoto($root, array $args, GraphQLContext $context, ResolveInfo $info): Photo
    {
        return Photo::processImageFromApi($this->request);
    }
}
