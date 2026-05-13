<?php

namespace App\Models;

use CodeIgniter\Model;

class EventsMediaModel extends Model
{
    protected $table      = 'event_media';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'event_id',
        'main_image',
        'landing_image',
        'gallery_images',
        'videos',
        'video_label',
        'status',
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

    // =========================
    // CREATE
    // =========================
    public function createData(array $data)
    {
        $this->db->table($this->table)->insert($data);
        return $this->db->insertID();
    }

    // =========================
    // GET ALL EVENTS WITH MEDIA + EVENT + EVENT TYPE
    // =========================
    public function getAll()
    {
        return $this->db->table('event_media em')
            ->select('
                em.*,
                et.name       AS event_type_name
            ')
            ->join('event_types et', 'et.id = em.event_id AND et.delete_audit_time IS NULL', 'left')
            ->where('em.delete_audit_time', null)
            ->orderBy('em.id', 'DESC')
            ->get()
            ->getResultArray();
    }
    
    public function getClientAll()
    {
        return $this->db->table('event_media em')
            ->select('
                em.*,
                et.name       AS event_type_name
            ')
            ->join('event_types et', 'et.id = em.event_id AND et.delete_audit_time IS NULL', 'left')
            ->where('em.status', 'Active')
            ->where('em.delete_audit_time', null)
            ->orderBy('em.id', 'DESC')
            ->get()
            ->getResultArray();
    }

    // =========================
    // GET BY ID
    // =========================
    public function getById($id)
    {
        return $this->db->table('event_media em')
            ->select('
                em.*,
                et.name       AS event_type_name
            ')
            ->join('event_types et', 'et.id = em.event_id AND et.delete_audit_time IS NULL', 'left')
            ->where('em.id', $id)
            ->where('em.delete_audit_time', null)
            ->get()
            ->getRowArray();
    }

    // =========================
    // UPDATE
    // =========================
    public function updateData($id, array $data)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update($data);
    }

    // =========================
    // UPDATE STATUS
    // =========================
    public function updateStatus($id, $status, $auditId)
    {
        return $this->updateData($id, [
            'status'             => $status,
            'update_audit_id'    => $auditId,
            'update_audit_time'  => date('Y-m-d H:i:s')
        ]);
    }
}
