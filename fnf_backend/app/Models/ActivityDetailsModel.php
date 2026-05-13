<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityDetailsModel extends Model
{
    protected $table = 'activity_details';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'activity_id',
        'title',
        'description',
        'feature_1',
        'feature_2',
        'feature_3',
        'feature_4',
        'status',

        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* ===========================
       GET ALL (JOIN ACTIVITIES)
    ============================ */
    public function getAll()
    {
        return $this->select('
                    activity_details.*,
                    activity_types.name AS activity_name
                ')
                ->join('activity_types', 'activity_types.id = activity_details.activity_id', 'left')
                ->where('activity_details.delete_audit_id IS NULL', null, false)
                ->orderBy('activity_details.id', 'DESC')
                ->findAll();
    }
    
    public function getClientAll()
    {
        return $this->select('
                    activity_details.*,
                    activity_types.name AS activity_name
                ')
                ->join('activity_types', 'activity_types.id = activity_details.activity_id', 'left')
                ->where('activity_details.status', 'Active')
                ->where('activity_details.delete_audit_id IS NULL', null, false)
                ->orderBy('activity_details.id', 'DESC')
                ->findAll();
    }

    /* ===========================
       GET BY ID
    ============================ */
    public function getById($id)
    {
        return $this->select('
                    activity_details.*,
                    activity_types.name AS activity_name
                ')
                ->join('activity_types', 'activity_types.id = activity_details.activity_id', 'left')
                ->where('activity_details.delete_audit_id IS NULL', null, false)
                ->where('activity_details.id', $id)
                ->first();
    }

    /* ===========================
       CREATE
    ============================ */
    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $this->insert($data);
        return $this->insertID();
    }

    /* ===========================
       UPDATE
    ============================ */
    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
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
}
