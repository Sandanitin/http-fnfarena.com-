<?php

namespace App\Models;

use CodeIgniter\Model;

class PackageModel extends Model
{
    protected $table = 'packages';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'name', 'description', 'price', 'discounted_price', 
        'features', 'is_most_popular', 'status', 'guidelines',
        'create_audit_id', 'create_audit_time', 'update_audit_id', 'update_audit_time', 'delete_audit_id', 'delete_audit_time'
    ];

    // Get all packages
    public function getAllPackages()
    {
        return $this->db->table($this->table)
                        ->orderBy('id', 'DESC')
                        ->where('delete_audit_id', null)
                        ->get()
                        ->getResultArray();
    }
    
    public function getClientAllPackages()
    {
        return $this->db->table($this->table)
                        ->where('status', 'Active')
                        ->orderBy('id', 'DESC')
                        ->where('delete_audit_id', null)
                        ->get()
                        ->getResultArray();
    }

    // Get single package by ID
    public function getPackageById($id)
    {
        return $this->db->table($this->table)
                        ->where('id', $id)
                        ->get()
                        ->getRowArray();
    }

    // Create a new package
    public function createPackage($data)
    {
        $builder = $this->db->table($this->table);
        $builder->insert($data);
        return $this->db->insertID();
    }

    // Update existing package
    public function updatePackage($id, $data)
    {
        $builder = $this->db->table($this->table);
        return $builder->where('id', $id)->update($data);
    }

    // Update only status
    public function updateStatus($id, $status, $userId)
    {
        $builder = $this->db->table($this->table);
        return $builder->where('id', $id)
                       ->update([
                           'status' => $status,
                           'update_audit_id' => $userId,
                           'update_audit_time' => date('Y-m-d H:i:s')
                       ]);
    }

    // Delete package (soft delete)
    public function deletePackage($id, $delete_audit_id)
    {
        $builder = $this->db->table('packages'); // your table name

        return $builder->where('id', $id)
                       ->update([
                           'delete_audit_id' => $delete_audit_id,
                           'delete_audit_time' => date('Y-m-d H:i:s')
                       ]);
    }

}
