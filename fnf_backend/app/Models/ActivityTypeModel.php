<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityTypeModel extends Model
{
    protected $table = 'activity_types';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'category_id',
        'name',
        'description',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    public function getAll()
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }
    
    public function getClientAll()
{
    return $this->select('activity_types.*, categories.name as category_name')
                ->join('categories', 'categories.id = activity_types.category_id', 'left')
                ->where('activity_types.delete_audit_id IS NULL', null, false)
                ->orderBy('activity_types.id', 'DESC')
                ->findAll();
}


    public function getById($id)
    {
        return $this->where([
            'id' => $id,
            'delete_audit_id' => null
        ])->first();
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
}
