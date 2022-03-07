<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use App\Models\{
	UserModel,
    ProductModel
};

class AllSeeder extends Seeder
{
    public function run()
    {
        $userModel = new UserModel();

		$userModel->insert([
			"name" => "admin",
			"email"	=> "admin@admin.com",
			"password" => password_hash("12345678",PASSWORD_DEFAULT),
		]);

        $productModel = new ProductModel();
        
        for($i=0;$i<10;$i++){
            $productModel->insert([
                "title" => "product-".$i,
            ]);
        }
    }
}
