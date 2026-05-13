<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivitiesModel extends Model
{
   protected $table = 'cms_activities';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'category_id',
        'name',
        'description',
        'duration',
        'participants',
        'status',
        'visibility',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* =========================
        COMMON QUERIES
    ========================== */

    public function getAll()
    {
        return $this->select('
                cms_activities.*,
                categories.name AS category_name
            ')
            ->join(
                'categories',
                'categories.id = cms_activities.category_id',
                'left'
            )
            ->where('cms_activities.delete_audit_id IS NULL', null, false)
            ->orderBy('cms_activities.id', 'DESC')
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
        return $this->select('
                cms_activities.*,
                categories.name AS category_name
            ')
            ->join(
                'categories',
                'categories.id = cms_activities.category_id',
                'left'
            )
            ->where('cms_activities.delete_audit_id IS NULL', null, false)
            ->orderBy('cms_activities.id', 'DESC')
            ->where('cms_activities.id', $id)
            ->first();
    }

    public function createData($data)
    {
        $this->insert($data);
        return $this->getInsertID();
    }

    public function updateData($id, $data)
    {
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
