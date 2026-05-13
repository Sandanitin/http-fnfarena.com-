<?php

namespace App\Models;

use CodeIgniter\Model;

class EventsMetricsModel extends Model
{
    protected $table = 'events_metrics';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'event_id',

        'attendance_rate',
        'attendance_rate_suffix',

        'satisfaction_score',
        'satisfaction_score_suffix',

        'occasions',
        'occasions_suffix',

        'repeat_bookings',
        'repeat_bookings_suffix',

        'status',

        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* =========================
       INSERT
    ========================= */
    public function insertMetrics(array $data)
    {
        return $this->db->table($this->table)->insert($data);
    }

    /* =========================
       LIST (NOT DELETED)
    ========================= */
    public function getAllMetrics()
    {
        return $this->db->table('events_metrics em')
                ->select('
                    em.*,
                    et.name AS event_type_name
                ')
                ->join('event_types et', 'et.id = em.event_id', 'left')
                ->where('em.delete_audit_time', null)
                ->where('et.delete_audit_time', null)
                ->orderBy('em.id', 'DESC')
                ->get()
                ->getResultArray();

    }
    
    public function getClientAllMetrics()
    {
        return $this->db->table('events_metrics em')
                ->select('
                    em.*,
                    et.name AS event_type_name
                ')
                ->join('event_types et', 'et.id = em.event_id', 'left')
                ->where('em.status', 'Active')
                ->where('em.delete_audit_time', null)
                ->where('et.delete_audit_time', null)
                ->orderBy('em.id', 'DESC')
                ->get()
                ->getResultArray();

    }

    /* =========================
       GET BY ID
    ========================= */
    public function getMetricsById($id)
{
    return $this->db->table($this->table . ' em')
        ->select('
            em.*,
            et.name AS event_type_name
        ')
        ->join('event_types et', 'et.id = em.event_id', 'left')
        ->where('em.id', $id)
        ->where('em.delete_audit_time', null)
        ->where('et.delete_audit_time', null)
        ->get()
        ->getRowArray();
}


    /* =========================
       UPDATE
    ========================= */
    public function updateMetrics($id, array $data)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update($data);
    }

    /* =========================
       SOFT DELETE
    ========================= */
    public function softDeleteMetrics($id, $deleteAuditId)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update([
                'delete_audit_id'   => $deleteAuditId,
                'delete_audit_time' => date('Y-m-d H:i:s')
            ]);
    }

    /* =========================
       STATUS TOGGLE
    ========================= */
    public function toggleStatus($id, $status, $updateAuditId)
    {
        return $this->db->table($this->table)
            ->where('id', $id)
            ->update([
                'status'            => $status,
                'update_audit_id'   => $updateAuditId,
                'update_audit_time' => date('Y-m-d H:i:s')
            ]);
    }

    /* =========================
       CHECK EVENT METRICS EXISTS
    ========================= */
    public function checkEventMetricsExists($eventId)
    {
        return $this->db->table($this->table)
            ->select('id')
            ->where('event_id', $eventId)
            ->where('delete_audit_time', null)
            ->get()
            ->getRowArray();
    }
}
