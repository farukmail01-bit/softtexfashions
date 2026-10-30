<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoKeyword extends Model
{
    use HasFactory;

    protected $fillable = [
        'keyword',
        'category',
        'search_intent',
        'priority',
        'usage_count',
    ];

    public function articles()
    {
        return $this->hasMany(Article::class, 'primary_keyword', 'keyword');
    }
}
