<?php

namespace App\Models;

use CodeIgniter\Model;

class BookingsModel extends Model
{
    protected $table = 'bookings';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'user_name',
        'activity_id',
        'email',
        'phone',
        'group_size',
        'message',
        'event_date',
        'event_time',
        'duration_hours',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* ===========================
       GET ALL BOOKINGS (ADMIN)
    ============================ */
    public function getAll()
    {
        $builder = $this->where('delete_audit_time', null)->orderBy('id', 'DESC');

        return $builder->findAll();
    }

    /* ===========================
       GET ONE BOOKING
    ============================ */
    public function getById($id)
    {
        $builder = $this->where('id', $id)->where('delete_audit_time', null)->orderBy('id', 'DESC');

        return $builder->findAll();
        
        // return $this->select('bookings.*')
        //         ->join('activities', 'activities.id = bookings.activity_id', 'left')
        //         ->where('bookings.delete_audit_id IS NULL', null, false)
        //         ->orderBy('bookings.id', 'DESC')
        //         ->where('bookings.id', $id)
        //         ->findAll();
    }

    /* ===========================
       CREATE BOOKING
    ============================ */
    public function createData($data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $this->insert($data);
        return $this->insertID();
    }

    /* ===========================
       UPDATE BOOKING
    ============================ */
    public function updateData($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
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
