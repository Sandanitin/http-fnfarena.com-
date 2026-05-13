<?php

namespace App\Models;

use CodeIgniter\Model;

class FoodProductModel extends Model
{
    protected $table = 'food_products';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'category_id',
        'image',
        'name',
        'description',
        'price',
        'offer_price',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* =========================
        COMMON QUERIES
    ========================== */

    public function getAll()
    {
        return $this->select('food_products.*, food_categories.name as category_name')
                    ->join('food_categories', 'food_categories.id = food_products.category_id', 'left')
                    ->where('food_products.delete_audit_time', null)
                    ->where('food_products.delete_audit_id IS NULL', null, false)
                    ->orderBy('food_products.id', 'DESC')
                    ->findAll();
                    
    }

    public function getClientAll()
    {
        // return $this->where('status', 'Active')
        //             ->where('delete_audit_id IS NULL', null, false)
        //             ->orderBy('id', 'DESC')
        //             ->findAll();
        return $this->select('food_products.*, food_categories.name as category_name')
                    ->join('food_categories', 'food_categories.id = food_products.category_id', 'left')
                    ->where('food_products.delete_audit_time', null)
                    ->where('food_products.status', 'Active')
                    ->where('food_products.delete_audit_id IS NULL', null, false)
                    ->orderBy('food_products.id', 'DESC')
                    ->findAll();
    }

    public function getById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_id IS NULL', null, false)
                    ->first();
    }

    public function createData($data)
    {
        $this->insert($data);
        return $this->getInsertID();
    }

    public function updateData($id, $data)
    {
        return $this->update($id, $data);
    }

    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id' => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
