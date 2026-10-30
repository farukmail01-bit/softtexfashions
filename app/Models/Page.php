<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'subtitle',
        'hero_title',
        'hero_image',
        'content',
        'sections_data',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'status',
    ];

    protected $casts = [
        'sections_data' => 'array',
    ];
}
