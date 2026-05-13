<?php

namespace App\Models;

use CodeIgniter\Model;

class HomeStatsModel extends Model
{
    protected $table      = 'home_stats';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'title',
        'image',
        'metrics1',
        'metrics1_suffix',
        'metrics2',
        'metrics2_suffix',
        'metrics3',
        'metrics3_suffix',
        'feature_title1',
        'feature_title2',
        'feature_title3',
        'feature_title4',
        'feature_title5',
        'feature_description1',
        'feature_description2',
        'feature_description3',
        'feature_description4',
        'feature_description5',
        'feature_image1',
        'feature_image2',
        'feature_image3',
        'feature_image4',
        'feature_image5',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /**
     * Fetch all active (not deleted) stats for homepage
     */
    public function getStats()
    {
        return $this->where('delete_audit_id IS NULL', null, false)->orderBy('id', 'DESC')
                    ->findAll();
    }

    public function getClientStats()
    {
        return $this->where('status', 'Active')
                    ->orderBy('id', 'DESC')
                    ->where('delete_audit_id IS NULL', null, false)
                    ->findAll();
    }

    /**
     * Fetch single stat by ID
     */
    public function getById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_id IS NULL', null, false)
                    ->first();
    }

    /**
     * Create new stat
     */
    public function createStat($data)
    {
        $data['status']            = $data['status'] ?? 'Active';
        $data['create_audit_time'] = date('Y-m-d H:i:s');

        $this->insert($data);
        return $this->insertID();
    }

    /**
     * Update stat
     */
    public function updateStat($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');

        return $this->update($id, $data);
    }

    /**
     * Update status only
     */
    public function updateStatus($id, $status, $userId)
    {
        return $this->update($id, [
            'status'            => $status,
            'update_audit_id'   => $userId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    /**
     * Soft delete stat
     */
    public function softDeleteStat($id, $userId)
    {
        return $this->update($id, [
            'delete_audit_id'   => $userId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
