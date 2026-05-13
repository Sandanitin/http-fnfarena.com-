<?php

namespace App\Models;

use CodeIgniter\Model;

class BirthdayBookingModel extends Model
{
    protected $table = 'birthday_bookings';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'customer_name',
        'child',
        'age',
        'email',
        'phone',
        'theme',
        'date',
        'time',
        'guests',
        'booking_type',
        'total',
        'advance',
        'balance',
        'payment_status',
        'status', 
        'message',
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
    // GET ALL BOOKINGS
    // =========================
    public function getAll()
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->findAll();
    }

    // =========================
    // GET ONE BOOKING
    // =========================
    public function getById($id)
    {
        return $this->where('id', $id)
                    ->where('delete_audit_id IS NULL', null, false)
                    ->first();
    }

    // =========================
    // CREATE BOOKING
    // =========================
    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $data['booking_date'] = $data['booking_date'] ?? date('Y-m-d');
        $data['balance'] = $data['balance'] ?? (($data['total'] ?? 0) - ($data['advance'] ?? 0));
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
