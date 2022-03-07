<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table = "products";

	protected $primaryKey = "id";

	protected $allowedFields = [
		"title",
		"price",
		"stock",	
        "description",    
		"created_at",
		"updated_at"
	];

	protected $useTimestamps = true;

    protected $createdField  = 'created_at';

    protected $updatedField  = 'updated_at';
}
