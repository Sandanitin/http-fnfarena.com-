<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivitiesMediaModel extends Model
{
    protected $table      = 'activities_media';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'activity_type_id',
        'main_image',
        'landing_image',
        'gallery_images',
        'videos',
        'video_label',
        'status',
        'links',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    protected $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \Config\Database::connect();
    }

    public function createData(array $data)
    {
        $this->db->table($this->table)->insert($data);
        return $this->db->insertID();
    }

    public function getAll()
    {
        $activities = $this->db->table('activities_media a')
                ->select('a.*, at.name as activity_type_name')
                ->join('activity_types at', 'at.id = a.activity_type_id', 'left')
                ->where('a.delete_audit_time', null)
                ->orderBy('a.id', 'DESC')
                ->get()
                ->getResultArray();

        return $activities;
    }
    
    public function getClinetAll()
    {
        $activities = $this->db->table('activities_media a')
                ->select('a.*, at.name as activity_type_name')
                ->join('activity_types at', 'at.id = a.activity_type_id', 'left')
                ->where('a.status', 'Active')
                ->where('a.delete_audit_time', null)
                ->orderBy('a.id', 'DESC')
                ->get()
                ->getResultArray();
                
        return $activities;
    }

    public function getById($id)
    {
        return $this->db->table('activities_media a')
            ->select('
                a.*,
                at.name AS activity_type_name
            ')
            ->join('activity_types at', 'at.id = a.activity_type_id AND at.delete_audit_time IS NULL', 'left')
            ->where('a.id', $id)
            ->where('a.delete_audit_time', null)
            ->get()
            ->getRowArray();
    }

    public function updateData($id, array $data)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update($data);
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
}
