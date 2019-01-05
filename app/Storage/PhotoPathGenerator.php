<?php

namespace App\Storage;

class PhotoPathGenerator
{
    public const DATE_FORMAT_FOR_IMAGE_NAME = "Y-m-d-G-i-s";
    public const PHOTO_FOLDER_NAME = 'photos';
    
    public function generateDestinationPath(): string
    {
        return self::PHOTO_FOLDER_NAME . DIRECTORY_SEPARATOR . date('Y') . DIRECTORY_SEPARATOR . date('m');
    }
    public function generateFilename(string $originalFileExtension): string
    {
        return date(self::DATE_FORMAT_FOR_IMAGE_NAME) . '.' . $originalFileExtension;
    }
}
