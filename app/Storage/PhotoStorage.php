<?php

namespace App\Storage;

use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

class PhotoStorage
{
    /** @var PhotoPathGenerator */
    private $photoPathGenerator;

    public function __construct(PhotoPathGenerator $photoPathGenerator)
    {
        $this->photoPathGenerator = $photoPathGenerator;
    }

    public function store(UploadedFile $file): File
    {
        return $file->move(
            $this->photoPathGenerator->generateDestinationPath(),
            $this->photoPathGenerator->generateFilename($file->getClientOriginalExtension())
        );
    }
}
