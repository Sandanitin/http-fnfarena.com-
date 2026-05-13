<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityMetricsModel extends Model
{
    protected $table = 'activity_metrics';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'activity_id','status',

        'participation_rate','participation_rate_suffix',
        'average_score','average_score_suffix',
        'completion_time','completion_time_suffix',
        'satisfaction_rate','satisfaction_rate_suffix',
        'repeat_customers','repeat_customers_suffix',
        'revenue_growth','revenue_growth_suffix',
        'safety_score','safety_score_suffix',

        'create_audit_id','create_audit_time',
        'update_audit_id','update_audit_time',
        'delete_audit_id','delete_audit_time'
    ];

    /* ===========================
       GET ALL
    ============================ */
    public function getAll()
    {
        return $this->select('
                activity_metrics.*,
                activity_types.name as activity_name
            ')
            ->join('activity_types', 'activity_types.id = activity_metrics.activity_id', 'left')
            ->where('activity_metrics.delete_audit_id IS NULL', null, false)
            ->orderBy('activity_metrics.id', 'DESC')
            ->findAll();
    }
    
    public function getClinetAll()
    {
        return $this->select('
                activity_metrics.*,
                activity_types.name as activity_name
            ')
            ->join('activity_types', 'activity_types.id = activity_metrics.activity_id', 'left')
            ->where('activity_metrics.status', 'Active')
            ->where('activity_metrics.delete_audit_id IS NULL', null, false)
            ->orderBy('activity_metrics.id', 'DESC')
            ->findAll();
    }

    /* ===========================
       GET BY ID
    ============================ */
    public function getById($id)
    {
        return $this->select('
                activity_metrics.*,
                activities.name as activity_name
            ')
            ->join('activities', 'activities.id = activity_metrics.activity_id', 'left')
            ->where('activity_metrics.delete_audit_id IS NULL', null, false)
            ->where('activity_metrics.id', $id)
            ->first();
    }

    /* ===========================
       CREATE
    ============================ */
    public function createData($data)
    {
        $this->insert([
            'activity_id' => $data['activity_id'],
            'status' => $data['status'] ?? 'active',

            'participation_rate' => $data['participation_rate'],
            'participation_rate_suffix' => $data['participation_rate_suffix'],

            'average_score' => $data['average_score'],
            'average_score_suffix' => $data['average_score_suffix'],

            'completion_time' => $data['completion_time'],
            'completion_time_suffix' => $data['completion_time_suffix'],

            'satisfaction_rate' => $data['satisfaction_rate'],
            'satisfaction_rate_suffix' => $data['satisfaction_rate_suffix'],

            'repeat_customers' => $data['repeat_customers'],
            'repeat_customers_suffix' => $data['repeat_customers_suffix'],

            'revenue_growth' => $data['revenue_growth'],
            'revenue_growth_suffix' => $data['revenue_growth_suffix'],

            'safety_score' => $data['safety_score'],
            'safety_score_suffix' => $data['safety_score_suffix'],

            'create_audit_id' => $data['create_audit_id'],
            'create_audit_time' => date('Y-m-d H:i:s')
        ]);

        return $this->insertID();
    }

    /* ===========================
       UPDATE
    ============================ */
    public function updateData($id, $data)
    {
        return $this->update($id, [
            'activity_id' => $data['activity_id'],
            'status' => $data['status'],

            'participation_rate' => $data['participation_rate'],
            'participation_rate_suffix' => $data['participation_rate_suffix'],

            'average_score' => $data['average_score'],
            'average_score_suffix' => $data['average_score_suffix'],

            'completion_time' => $data['completion_time'],
            'completion_time_suffix' => $data['completion_time_suffix'],

            'satisfaction_rate' => $data['satisfaction_rate'],
            'satisfaction_rate_suffix' => $data['satisfaction_rate_suffix'],

            'repeat_customers' => $data['repeat_customers'],
            'repeat_customers_suffix' => $data['repeat_customers_suffix'],

            'revenue_growth' => $data['revenue_growth'],
            'revenue_growth_suffix' => $data['revenue_growth_suffix'],

            'safety_score' => $data['safety_score'],
            'safety_score_suffix' => $data['safety_score_suffix'],

            'update_audit_id' => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }

    /* ===========================
       UPDATE STATUS ONLY
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
