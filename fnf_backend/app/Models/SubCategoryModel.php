<?php

namespace App\Models;

use CodeIgniter\Model;

class SubCategoryModel extends Model
{
    protected $table      = 'sub_category';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'category_id',
        'name',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /**
     * Get all active subcategories
     */
    public function getAll()
    {
        return $this->select('sub_category.*, categories.name as category_name')
                    ->join('categories', 'categories.id = sub_category.category_id', 'left')
                    ->where('sub_category.delete_audit_id IS NULL', null, false)
                    ->orderBy('sub_category.id', 'DESC')
                    ->findAll();
    }

    public function getClientAll()
    {
        return $this->select('sub_category.*, categories.name as category_name')
                    ->join('categories', 'categories.id = sub_category.category_id', 'left')
                    ->where('sub_category.status', 'Active')
                    ->where('sub_category.delete_audit_id IS NULL', null, false)
                    ->orderBy('sub_category.id', 'DESC')
                    ->findAll();
    }

    /**
     * Get single subcategory by ID
     */
    public function getById($id)
    {
        return $this->select('sub_category.*, categories.name as category_name')
                    ->join('categories', 'categories.id = sub_category.category_id', 'left')
                    ->where('id', $id)
                    ->where('sub_category.delete_audit_id IS NULL', null, false)
                    ->orderBy('sub_category.id', 'DESC')
                    ->findAll();
    }

    /**
     * Create a new subcategory
     */
    public function createData($data)
    {
        $data['status'] = $data['status'] ?? 'Active';
        $data['create_audit_time'] = date('Y-m-d H:i:s');

        $this->insert($data);
        return $this->insertID();
    }

    /**
     * Update subcategory
     */
    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }

    /**
     * Update only status
     */
    public function updateStatus($id, $status, $userId)
    {
        return $this->update($id, [
            'status' => $status,
            'update_audit_id' => $userId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    /**
     * Soft delete subcategory
     */
    public function softDelete($id, $userId)
    {
        return $this->update($id, [
            'delete_audit_id' => $userId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
