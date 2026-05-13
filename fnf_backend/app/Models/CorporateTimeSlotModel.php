<?php

namespace App\Models;

use CodeIgniter\Model;

class CorporateTimeSlotModel extends Model
{
    protected $table = 'corporate_time_slots';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'slot_label',
        'start_time',
        'end_time',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* ===== GET ALL ===== */
    public function getAll()
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('start_time', 'ASC')
                    ->findAll();
    }

    public function getClientAll()
    {
        return $this->where('status', 'Active')
                    ->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('start_time', 'ASC')
                    ->findAll();
    }

    /* ===== GET ACTIVE ===== */
    public function getActive()
    {
        return $this->where('status', 'Active')
                    ->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('start_time', 'ASC')
                    ->findAll();
    }

    /* ===== GET BY ID ===== */
    public function getById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_id IS NULL', null, false)
                    ->first();
    }

    /* ===== CREATE ===== */
    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $this->insert($data);
        return $this->insertID();
    }

    /* ===== UPDATE ===== */
    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }

    /* ===== UPDATE STATUS ===== */
    public function updateStatus($id, $status, $auditId)
    {
        return $this->update($id, [
            'status' => $status,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    /* ===== SOFT DELETE ===== */
    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id' => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
