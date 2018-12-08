<?php

namespace App\Factories;

use App\Models\Photo;
use Symfony\Component\HttpFoundation\File\File;

class PhotoFactory
{
    public function createFromFile(File $file): Photo
    {
        $photo = new Photo();
        $photo->setName($file->getPathname());
        $photo->setMetaInfo("none");

        return $photo;
    }
}
