<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeesModel extends Model
{
    protected $table = 'employees';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'name',
        'email',
        'mobile',
        'password',
        'gender',
        'status',

        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* ===========================
       GET ALL
    ============================ */
    public function getAll()
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }

    /* ===========================
       GET BY ID
    ============================ */
    public function getById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_id IS NULL', null, false)
                    ->first();
    }

    /* ===========================
       CREATE
    ============================ */
    public function createData($data)
    {
        $this->insert([
            'name' => $data['name'],
            'email' => $data['email'],
            'mobile' => $data['mobile'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
            'gender' => $data['gender'] ?? null,
            'status' => $data['status'] ?? 'Active',

            'create_audit_id' => $data['create_audit_id'],
            'create_audit_time' => date('Y-m-d H:i:s')
        ]);

        return $this->insertID();
    }

    /* ===========================
       UPDATE
    ============================ */
    public function updateData($id, $data)
    {
        $update = [
            'name' => $data['name'],
            'email' => $data['email'],
            'mobile' => $data['mobile'],
            'gender' => $data['gender'],
            'status' => $data['status'],

            'update_audit_id' => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        if (!empty($data['password'])) {
            $update['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }

        return $this->update($id, $update);
    }

    /* ===========================
       UPDATE STATUS ONLY
    ============================ */
    public function updateStatus($id, $status, $auditId)
    {
        return $this->update($id, [
            'status' => $status,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    /* ===========================
       SOFT DELETE
    ============================ */
    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id' => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    public function getByEmailOrMobile($username)
    {
        return $this->db->table($this->table)
            ->where('delete_audit_id IS NULL', null, false)
            ->groupStart()
                ->where('email', $username)
                ->orWhere('mobile', $username)
            ->groupEnd()
            ->get()
            ->getRowArray();
    }
}
