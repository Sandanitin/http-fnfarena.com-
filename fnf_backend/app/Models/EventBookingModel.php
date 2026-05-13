<?php

namespace App\Models;

use CodeIgniter\Model;

class EventBookingModel extends Model
{
    protected $table = 'event_bookings';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'event_type_id',
        'name',
        'booking_type',
        'date',
        'guests',
        'total_amount',
        'advance',
        'balance',
        'payment_status',
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
       return $this->select('
                event_bookings.*,
                event_types.name AS event_type_name
            ')
            ->join(
                'event_types',
                'event_types.id = event_bookings.event_type_id',
                'left'
            )
            ->where('event_bookings.delete_audit_id IS NULL', null, false)
            ->orderBy('event_bookings.id', 'DESC')
            ->findAll();
    }

    public function getClientAll()
    {
        return $this->select('
                event_bookings.*,
                event_types.name AS event_type_name
            ')
            ->join(
                'event_types',
                'event_types.id = event_bookings.event_type_id',
                'left'
            )
            ->where('event_bookings.delete_audit_id IS NULL', null, false)
            ->orderBy('event_bookings.id', 'DESC')
            ->where('status', 'Active')
            ->findAll();
    }

    public function getById($id)
    {
        return $this->select('
                event_bookings.*,
                event_types.name AS event_type_name
            ')
            ->join(
                'event_types',
                'event_types.id = event_bookings.event_type_id',
                'left'
            )
            ->where('event_bookings.delete_audit_id IS NULL', null, false)
            ->orderBy('event_bookings.id', 'DESC')
            ->where('event_bookings.id', $id)
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
            'delete_audit_id'   => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
