<?php

namespace App\Models;

use Config\Database;

class OurVisionValuesModel
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    // CREATE
    public function createData(array $data)
    {
        $this->db->table('our_vision_values')->insert($data);
        return $this->db->insertID();
    }

    // READ ALL (optional status)
    public function getAll()
    {
        $builder = $this->db->table('our_vision_values')
            ->where('delete_audit_id IS NULL');

        return $builder
            ->orderBy('id', 'DESC')
            ->get()
            ->getResultArray();
    }

    public function getClientAll()
    {
        $builder = $this->db->table('our_vision_values')
            ->where('status', 'Active')
            ->where('delete_audit_id IS NULL');

        return $builder
            ->orderBy('id', 'DESC')
            ->get()
            ->getResultArray();
    }

    // READ ONE
    public function getById($id)
    {
        return $this->db->table('our_vision_values')
            ->where('id', $id)
            ->where('delete_audit_id IS NULL')
            ->get()
            ->getRowArray();
    }

    // UPDATE
    public function updateData($id, array $data)
    {
        return $this->db->table('our_vision_values')
            ->where('id', $id)
            ->update($data);
    }

    // UPDATE STATUS ONLY
    public function updateStatus($id, $status, $userId)
    {
        return $this->db->table('our_vision_values')
            ->where('id', $id)
            ->update([
                'status'            => $status,
                'update_audit_id'   => $userId,
                'update_audit_time' => date('Y-m-d H:i:s')
            ]);
    }

    // SOFT DELETE
    public function softDelete($id, $deleteAuditId)
    {
        return $this->db->table('our_vision_values')
            ->where('id', $id)
            ->update([
                'delete_audit_id'   => $deleteAuditId,
                'delete_audit_time' => date('Y-m-d H:i:s')
            ]);
    }
}
