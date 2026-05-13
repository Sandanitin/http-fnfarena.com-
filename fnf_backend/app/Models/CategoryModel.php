<?php

namespace App\Models;

use CodeIgniter\Model;

class CategoryModel extends Model
{
    protected $table            = 'categories';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = true;
    protected $protectFields    = true;
    protected $allowedFields    = ['name', 'status',
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

    // -------------------------
    // CREATE CATEGORY
    // -------------------------
    public function createCategory(array $data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        return $this->insert($data);
    }

    // -------------------------
    // GET ALL CATEGORIES (with optional status filter)
    // -------------------------
    public function getCategories()
    {
        $builder = $this->where('delete_audit_time', null)->orderBy('id', 'DESC');

        return $builder->findAll();
    }

    public function getclientCategories()
    {
        $builder = $this->where('status', 'Active')->where('delete_audit_time', null)->orderBy('id', 'DESC');

        return $builder->findAll();
    }

    // -------------------------
    // GET SINGLE CATEGORY
    // -------------------------
    public function getCategory(int $id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_time', null)
                    ->first();
    }

    // -------------------------
    // UPDATE CATEGORY
    // -------------------------
    public function updateCategory(int $id, array $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }

    public function updateStatus(int $id, string $status, int $userId = 1)
    {
        $data = [
            'status' => $status,
            'update_audit_id' => $userId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        return $this->update($id, $data);
    }

    // -------------------------
    // SOFT DELETE CATEGORY
    // -------------------------
    public function deleteCategory(int $id, int $delete_audit_id)
    {
        $data = [
            'delete_audit_id' => $delete_audit_id,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ];

        return $this->update($id, $data);
    }

}
