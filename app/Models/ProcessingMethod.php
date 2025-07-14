<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcessingMethod extends Model
{
    use HasFactory;

    protected $fillable = ['judul'];

    public function steps()
    {
        return $this->hasMany(ProcessingMethodStep::class);
    }
}
