<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;


class AdminActivity extends Model
{
    use HasFactory;

    protected $fillable = ['description', 'admin_id'];

}

