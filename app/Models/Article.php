<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'primary_keyword',
        'category',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'excerpt',
        'content',
        'featured_image',
        'read_time_minutes',
        'author',
        'status',
        'views_count',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    public function keyword()
    {
        return $this->belongsTo(SeoKeyword::class, 'primary_keyword', 'keyword');
    }
}
