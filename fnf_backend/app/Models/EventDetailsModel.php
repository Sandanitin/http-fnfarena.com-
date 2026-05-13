<?php

namespace App\Models;

use CodeIgniter\Model;

class EventDetailsModel extends Model
{
    protected $table = 'event_details';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'event_id',

        'title1','image1','description1','feature1_1','feature1_2','feature1_3','feature1_4',
        'size1','guests_count1','age_group1','duration1',

        'title2','image2','description2','feature2_1','feature2_2','feature2_3','feature2_4',
        'size2','guests_count2','age_group2','duration2',

        'title3','image3','description3','feature3_1','feature3_2','feature3_3','feature3_4',
        'size3','guests_count3','age_group3','duration3',

        'status',
        'create_audit_id','create_audit_time',
        'update_audit_id','update_audit_time',
        'delete_audit_id','delete_audit_time'
    ];

    public function getAll()
    {
        return $this->db->table($this->table . ' ed')
            ->select('
                ed.*,
                et.name as event_name
            ')
            ->join('event_types et', 'et.id = ed.event_id', 'left')
            ->where('ed.delete_audit_id IS NULL', null, false)
            ->orderBy('ed.id', 'DESC')
            ->get()
            ->getResultArray();
    }
    
    public function getClientAll()
    {
        return $this->db->table($this->table . ' ed')
            ->select('
                ed.*,
                et.name as event_name
            ')
            ->join('event_types et', 'et.id = ed.event_id', 'left')
            ->where('ed.status', 'Active')
            ->where('ed.delete_audit_id IS NULL', null, false)
            ->orderBy('ed.id', 'DESC')
            ->get()
            ->getResultArray();
    }


    public function getById($id)
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->where('id', $id)
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

    public function updateStatus($id, $status, $auditId)
    {
        return $this->update($id, [
            'status' => $status,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id' => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}


?>