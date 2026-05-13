<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = ['name', 'email', 'password', 'phone', 'role', 'status', 'business_name', 'location', 'gst', 'last_login',
        'create_audit_id', 'create_audit_time',
        'update_audit_id', 'update_audit_time',
        'delete_audit_id', 'delete_audit_time'];

    protected bool $allowEmptyInserts = false;
    protected bool $updateOnlyChanged = true;

    protected array $casts = [];
    protected array $castHandlers = [];

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'create_audit_time';
    protected $updatedField  = 'update_audit_time';
    protected $deletedField  = 'delete_audit_time';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function getUserByEmail($email)
    {
        return $this->where('email', $email)
                    ->where('delete_audit_time', null)  // Not deleted
                    ->first();
    }
    
    /* --------------------------
       LIST ALL USERS
    --------------------------- */
    public function listUsers()
    {
        return $this->select('*')
                    ->where('delete_audit_time', null)
                    ->where('role !=', 'Admin')   // 👈 exclude Admin
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }

    /* --------------------------
       GET SINGLE USER
    --------------------------- */
    public function getUserById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_time', null)
                    ->first();
    }
    
    public function updateStatus($id, $data)
{
    return $this->where('id', $id)
                ->where('delete_audit_time', null)
                ->update($id, $data);
}

 public function softDeleteUser($id, $deleteData)
    {
        return $this->update($id, $deleteData);
    }
    
}
