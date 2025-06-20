<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcessingMethodStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'processing_method_id',
        'tahap_ke',
        'deskripsi_tahapan',
        'gambar_tahapan',
    ];

    public function processingMethod()
    {
        return $this->belongsTo(ProcessingMethod::class);
    }
}
