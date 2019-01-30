<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comparison extends Model
{
    protected $table = 'comparisons';

    public function before() {
        return $this->belongsTo(Media::class, 'left_id');
    }

    public function after() {
        return $this->belongsTo(Media::class, 'right_id');
    }
}
