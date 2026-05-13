<?php

namespace App\Models;

use CodeIgniter\Model;

class FoodCategoryModel extends Model
{
    protected $table = 'food_categories';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'name',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* =====================
       GET ALL (ADMIN)
    ====================== */
    public function getAll()
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }

    public function getClientAll()
    {
        return $this->where('status', 'Active')
                    ->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }

    public function getById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_id IS NULL', null, false)
                    ->first();
    }

    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $this->insert($data);
        return $this->insertID();
    }

    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }

    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id'   => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
