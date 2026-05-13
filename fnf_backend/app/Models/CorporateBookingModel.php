<?php

namespace App\Models;

use CodeIgniter\Model;

class CorporateBookingModel extends Model
{
    protected $table = 'corporate_bookings';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'company_name',
        'contact_person',
        'email',
        'phone',
        'event_type_id',
        'participants',      // updated from participants_id
        'preferred_date',
        'time',              // updated from time_slot_id
        'total',
        'advance',
        'balance',
        'booking_status',    // updated from status
        'requirements',
        'booking_date',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time',
        'confirm_audit_id',
        'confirmed_audit_time',
        'cancelled_audit_id',
        'cancelled_audit_time'
    ];

    // =========================
    // GET ALL BOOKINGS (ADMIN)
    // =========================
    public function getAll()
    {
        return $this->select('
                corporate_bookings.*,
                corporate_event_types.name AS event_type_name
            ')
            ->join(
                'corporate_event_types',
                'corporate_event_types.id = corporate_bookings.event_type_id',
                'left'
            )
            ->where('corporate_bookings.delete_audit_id IS NULL', null, false)
            ->orderBy('corporate_bookings.id', 'DESC')
            ->findAll();
    }

    // =========================
    // GET ALL BOOKINGS (CLIENT / ACTIVE)
    // =========================
    public function getClientAll()
    {
        return $this->select('
                corporate_bookings.*,
                corporate_event_types.name AS event_type_name
            ')
            ->join(
                'corporate_event_types',
                'corporate_event_types.id = corporate_bookings.event_type_id',
                'left'
            )
            ->where('corporate_bookings.booking_status', 'Pending') // example: only pending bookings
            ->where('corporate_bookings.delete_audit_id IS NULL', null, false)
            ->orderBy('corporate_bookings.id', 'DESC')
            ->findAll();
    }

    // =========================
    // GET ONE BOOKING
    // =========================
    public function getById($id)
    {
        return $this->select('
                corporate_bookings.*,
                corporate_event_types.name AS event_type_name
            ')
            ->join(
                'corporate_event_types',
                'corporate_event_types.id = corporate_bookings.event_type_id',
                'left'
            )
            ->where('corporate_bookings.id', $id)
            ->where('corporate_bookings.delete_audit_id IS NULL', null, false)
            ->first();
    }

    // =========================
    // CREATE BOOKING
    // =========================
    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $data['booking_date'] = $data['booking_date'] ?? date('Y-m-d');
        $data['balance'] = $data['balance'] ?? ($data['total'] - ($data['advance'] ?? 0));
        return $this->insert($data);
    }

    // =========================
    // UPDATE BOOKING
    // =========================
    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        if (isset($data['total']) || isset($data['advance'])) {
            $data['balance'] = ($data['total'] ?? 0) - ($data['advance'] ?? 0);
        }
        return $this->update($id, $data);
    }

    // =========================
    // SOFT DELETE
    // =========================
    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id'   => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
