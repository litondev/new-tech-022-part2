<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class User extends Migration
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
            'name'       => [
                    'type'           => 'VARCHAR',
                    'constraint'     => 50,
            ],
            'email' => [
                    'type'           => 'VARCHAR',                        
                    'constraint'     => 50,
                    'unique'		 => true
            ],
            'password' => [
            		'type'			 => 'TEXT',  
            ],
            'photo'  => [
            		'type'			 => 'VARCHAR',
            		'constraint' 	 => 50,
            		'default'		 => 'default.png'
            ],
            'remember_token' => [
                'type' => 'TEXT',
                'default' => null
            ],
            'created_at datetime default current_timestamp',
            'updated_at datetime default current_timestamp on update current_timestamp',
        ]);

        $this->forge->addKey('id', true);

        $this->forge->createTable('users');
    }

    public function down()
    {
		$this->forge->dropTable('users');    
    }
}
