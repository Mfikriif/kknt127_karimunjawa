<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UmkmContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'umkm_id',
        'name',
        'email', 
        'phone',
        'message',
        'visit_date',
        'visit_time',
        'status'
    ];

    protected $casts = [
        'visit_date' => 'date',
        'visit_time' => 'datetime:H:i'
    ];

    /**
     * Get the UMKM that owns this contact
     */
    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }
}