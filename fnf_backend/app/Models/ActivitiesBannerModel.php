<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivitiesBannerModel extends Model
{
    protected $table      = 'activities_banner';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'image', 'title', 'description', 'status',
        'create_audit_id', 'create_audit_time',
        'update_audit_id', 'update_audit_time',
        'delete_audit_id', 'delete_audit_time'
    ];

    // Get all banners
    public function getAll()
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }

    public function getClientAll()
    {
        return $this->where('status', 'Active')->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }

    // Get one banner
    public function getById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_id IS NULL', null, false)
                    ->first();
    }

    // Create
    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $this->insert($data);
        return $this->insertID();
    }

    // Update
    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }

    // Update status
    public function updateStatus($id, $status, $auditId)
    {
        return $this->update($id, [
            'status' => $status,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    // Soft delete
    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id' => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
