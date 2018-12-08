<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setMetaInfo(string $metaInfo): void
    {
        $this->metaInfo = $metaInfo;
    }
}
