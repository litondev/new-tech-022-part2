<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Product extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                    'type'           => 'INT',
                    'constraint'     => 11,
                    'unsigned'       => true,
                    'auto_increment' => true,
            ],
            'title'       => [
                    'type'           => 'VARCHAR',
                    'constraint'     => 50,
            ],
            'stock' => [        
                    'type' => 'DECIMAL',
                    'constraint' => '20,2',
                    'default' => 0.00
            ],
            'price' => [        
                    'type' => 'DECIMAL',
                    'constraint' => '20,2',
                    'default' => 0.00
            ],
            'description'  => [
            		'type'			 => 'TEXT',            	
            		'default'		 => null
            ],
            'created_at datetime default current_timestamp',
            'updated_at datetime default current_timestamp on update current_timestamp',
        ]);

        $this->forge->addKey('id', true);

        $this->forge->createTable('products');
    }

    public function down()
    {
		$this->forge->dropTable('products');    
    }
}
