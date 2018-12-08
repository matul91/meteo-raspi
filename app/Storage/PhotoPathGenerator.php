<?php

namespace App\Storage;

class PhotoPathGenerator
{
    public const DATE_FORMAT_FOR_IMAGE_NAME = "Y-m-d-G-i-s";

    public function generateDestinationPath(): string
    {
        return env('PHOTO_FOLDER') . DIRECTORY_SEPARATOR . date('Y') . DIRECTORY_SEPARATOR . date('m');
    }
    public function generateFilename(string $originalFileExtension): string
    {
        return date(self::DATE_FORMAT_FOR_IMAGE_NAME) . '.' . $originalFileExtension;
    }
}
