<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        $data = [
            'name'              => 'Super Admin',
            'email'             => 'admin@gmail.com',
            'password'          => password_hash('123456', PASSWORD_DEFAULT),
            'role'              => 'admin',

            // Audit fields
            'create_audit_id'   => 1,
            'create_audit_time' => date('Y-m-d H:i:s'),
            'update_audit_id'   => null,
            'update_audit_time' => null,
            'delete_audit_id'   => null,
            'delete_audit_time' => null,
        ];

        $this->db->table('users')->insert($data);
    }
}
