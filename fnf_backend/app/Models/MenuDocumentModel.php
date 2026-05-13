<?php
namespace App\Models;

use CodeIgniter\Model;

class MenuDocumentModel extends Model
{
    protected $table = 'menu_documents';

    // GET all
    public function getAll()
{
    return $this->db->table($this->table)
        ->select('id, gaming_menu, overall_menu, cafe_menu')
        ->get()
        ->getResultArray();
}

    // GET by ID
    public function getById($id)
    {
        return $this->db->table($this->table)
            ->select('*')
            ->where('id', $id)
            ->where('delete_audit_id IS NULL')
            ->get()
            ->getRowArray();
    }

    // UPDATE
    public function updateData($id, $data)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update($data);
    }
}