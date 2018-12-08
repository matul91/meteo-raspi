<?php

namespace App\Repositories;

use App\Models\Photo;

class PhotoRepository
{
    /** @var Photo */
    private $photo;

    public function __construct(Photo $photo)
    {
        $this->photo = $photo;
    }

    /**
     * @return Photo[]
     */
    public function latest(int $limit): array
    {
        return $this->photo->limit($limit)
            ->orderBy('created_at', 'desc')
            ->get()
            ->toArray();
    }

    public function countAllPhotos(): int
    {
        return $this->photo->all()
            ->count();
    }
}
