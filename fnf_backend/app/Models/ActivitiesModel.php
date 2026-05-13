<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivitiesModel extends Model
{
   protected $table = 'activities';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'activity_type_id',
        'name',
        'duration',
        'units',
        'original_price',
        'discount',
        'offer_price',
        'status',
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
                activities.*,
                activity_types.name AS activity_type_name
            ')
            ->join(
                'activity_types',
                'activity_types.id = activities.activity_type_id',
                'left'
            )
            ->where('activities.delete_audit_id IS NULL', null, false)
            ->orderBy('activities.id', 'DESC')
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
                activities.*,
                activity_types.name AS activity_type_name
            ')
            ->join(
                'activity_types',
                'activity_types.id = activities.activity_type_id',
                'left'
            )
            ->where('activities.delete_audit_id IS NULL', null, false)
            ->orderBy('activities.id', 'DESC')
            ->where('activities.id', $id)
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
