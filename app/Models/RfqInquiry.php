<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RfqInquiry extends Model
{
    protected $fillable = [
        'rfq_code',
        'buyer_name',
        'company_name',
        'email',
        'phone',
        'country',
        'product_category',
        'order_quantity',
        'target_price',
        'delivery_deadline',
        'specifications',
        'techpack_path',
        'techpack_name',
        'status',
        'status_stage',
    ];
}
