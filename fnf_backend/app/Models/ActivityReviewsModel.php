<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityReviewsModel extends Model
{
    protected $table = 'activity_reviews';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'activity_id',
        'reviewer_name',
        'rating',
        'review_description',
        'reviewer_image',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* ===========================
       GET ALL (JOIN ACTIVITIES)
    ============================ */
    public function getAll()
    {
        return $this->select('
                    activity_reviews.*,
                    activity_types.name AS activity_name
                ')
                ->join('activity_types', 'activity_types.id = activity_reviews.activity_id', 'left')
                ->where('activity_reviews.delete_audit_id IS NULL', null, false)
                ->orderBy('activity_reviews.id', 'DESC')
                ->findAll();
    }
    
    public function getClientAll()
    {
        return $this->select('
                    activity_reviews.*,
                    activity_types.name AS activity_name
                ')
                ->join('activity_types', 'activity_types.id = activity_reviews.activity_id', 'left')
                ->where('activity_reviews.status', 'Active')
                ->where('activity_reviews.delete_audit_id IS NULL', null, false)
                ->orderBy('activity_reviews.id', 'DESC')
                ->findAll();
    }

    /* ===========================
       GET BY ID
    ============================ */
    public function getById($id)
    {
        return $this->select('
                    activity_reviews.*,
                    activities.name AS activity_name
                ')
                ->join('activities', 'activities.id = activity_reviews.activity_id', 'left')
                ->where('activity_reviews.delete_audit_id IS NULL', null, false)
                ->where('activity_reviews.id', $id)
                ->first();
    }

    /* ===========================
       CREATE
    ============================ */
    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $this->insert($data);
        return $this->insertID();
    }

    /* ===========================
       UPDATE
    ============================ */
    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }

    /* ===========================
       UPDATE STATUS
    ============================ */
    public function updateStatus($id, $status, $auditId)
    {
        return $this->update($id, [
            'status' => $status,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    /* ===========================
       SOFT DELETE
    ============================ */
    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id' => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
