<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityProtocolsModel extends Model
{
    protected $table = 'activity_protocols';
    protected $primaryKey = 'id';

    // =========================
    // GET ALL WITH JOIN
    // =========================
    public function getAll()
    {
        $rows = $this->db->table($this->table . ' ap')
            ->select('
                ap.*,
                a.name AS activity_name
            ')
            ->join('activity_types a', 'a.id = ap.activity_id', 'left')
            ->where('ap.delete_audit_id IS NULL', null, false)
            ->orderBy('ap.id', 'DESC')
            ->get()
            ->getResultArray(); // ✅ returns ARRAY of rows
    
        foreach ($rows as &$row) {
            $row['requirements'] = $row['requirements']
                ? json_decode($row['requirements'], true)
                : [];
    
            $row['equipment'] = $row['equipment']
                ? json_decode($row['equipment'], true)
                : [];
    
            $row['etiquette'] = $row['etiquette']
                ? json_decode($row['etiquette'], true)
                : [];
    
            $row['rules'] = $row['rules']
                ? json_decode($row['rules'], true)
                : [];
        }
    
        return $rows;
    }
    
    public function getClinetAll()
    {
        $rows = $this->db->table($this->table . ' ap')
            ->select('
                ap.*,
                a.name AS activity_name
            ')
            ->join('activity_types a', 'a.id = ap.activity_id', 'left')
            ->where('ap.status', 'Active')
            ->where('ap.delete_audit_id IS NULL', null, false)
            ->get()
            ->getResultArray(); // ✅ returns ARRAY of rows
    
        foreach ($rows as &$row) {
            $row['requirements'] = $row['requirements']
                ? json_decode($row['requirements'], true)
                : [];
    
            $row['equipment'] = $row['equipment']
                ? json_decode($row['equipment'], true)
                : [];
    
            $row['etiquette'] = $row['etiquette']
                ? json_decode($row['etiquette'], true)
                : [];
    
            $row['rules'] = $row['rules']
                ? json_decode($row['rules'], true)
                : [];
        }
    
        return $rows;
    }

    // =========================
    // GET SINGLE
    // =========================
    public function getById($id)
    {
        $row = $this->db->table($this->table . ' ap')
            ->select('
                ap.*,
                a.name AS activity_name
            ')
            ->join('activities a', 'a.id = ap.activity_id', 'left')
            ->where('ap.status', 'Active')
            ->where('ap.id', $id)
            ->where('ap.delete_audit_id IS NULL', null, false)
            ->get()
            ->getRowArray();

        if ($row) {
            $row['requirements'] = json_decode($row['requirements'], true);
            $row['equipment']    = json_decode($row['equipment'], true);
            $row['etiquette']    = json_decode($row['etiquette'], true);
            $row['rules']        = json_decode($row['rules'], true);
        }

        return $row;
    }


    // =========================
    // CREATE
    // =========================
    public function createData($data)
    {
        $this->db->table($this->table)->insert($data);
        return $this->db->insertID();
    }

    // =========================
    // UPDATE
    // =========================
    public function updateData($id, $data)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update($data);
    }

    // =========================
    // SOFT DELETE
    // =========================
    public function softDelete($id, $auditId)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update([
                'delete_audit_id'   => $auditId,
                'delete_audit_time' => date('Y-m-d H:i:s')
            ]);
    }

    // =========================
    // STATUS TOGGLE
    // =========================
    public function toggleStatus($id, $auditId)
    {
        $row = $this->db->table($this->table)
            ->select('status')
            ->where('id', $id)
            ->get()
            ->getRowArray();

        $newStatus = ($row['status'] === 'active') ? 'inactive' : 'active';

        $this->db->table($this->table)
            ->where('id', $id)
            ->update([
                'status' => $newStatus,
                'update_audit_id' => $auditId,
                'update_audit_time' => date('Y-m-d H:i:s')
            ]);

        return $newStatus;
    }

    // =========================
    // EXISTS CHECK
    // =========================
    public function exists($id)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->where('delete_audit_id IS NULL', null, false)
            ->countAllResults();
    }
}
