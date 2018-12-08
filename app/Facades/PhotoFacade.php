<?php

namespace App\Facades;

use App\Factories\PhotoFactory;
use App\Models\Photo;
use App\Storage\PhotoStorage;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class PhotoFacade
{
    public const QUERY_STRING_PHOTO_KEY = 'photo';

    /** @var PhotoStorage */
    private $fileStorage;

    /** @var PhotoFactory */
    private $photoFactory;

    public function __construct(PhotoStorage $fileStorage, PhotoFactory $photoFactory)
    {
        $this->fileStorage = $fileStorage;
        $this->photoFactory = $photoFactory;
    }

    /**
     * @throws \InvalidArgumentException|FileException
     */
    public function storePhoto(\Illuminate\Http\Request $request): Photo
    {
        if ($request->hasFile(self::QUERY_STRING_PHOTO_KEY)) {
            $uploadedFile = $request->file(self::QUERY_STRING_PHOTO_KEY);
            $photoFile = $this->fileStorage->store($uploadedFile);

            $photo = $this->photoFactory->createFromFile($photoFile);
            $photo->saveOrFail();

            return $photo;
        }

        throw new \InvalidArgumentException("Photo has not been enclosed in the request. File key is 'photo'.");
    }
}
