<?php

namespace App\Models;

use CodeIgniter\Model;

class PlanBookingModel extends Model
{
    protected $table = 'plan_bookings';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'package_id', 'full_name', 'email', 'phone', 'event_date', 'event_time',
        'participants', 'special_requests', 'terms_accepted', 'status',
        'create_audit_id', 'create_audit_time',
        'update_audit_id', 'update_audit_time',
        'delete_audit_id', 'delete_audit_time'
    ];

    protected $useTimestamps = false;

    protected $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \Config\Database::connect();
    }

    // CREATE
    public function createBooking(array $data)
    {
        $builder = $this->db->table($this->table);
        $builder->insert($data);
        return $this->db->insertID();
    }

    // READ ALL
    public function getAllBookings()
    {
        $builder = $this->db->table('plan_bookings as pb');
        $builder->select('pb.*, p.name, p.price');
        $builder->join('packages as p', 'p.id = pb.package_id', 'left');
        $builder->where('pb.delete_audit_time IS NULL', null, false); // exclude soft deleted
    
        return $builder->get()->getResultArray();
    }


    // READ SINGLE
   public function getBookingById($id)
    {
        $builder = $this->db->table('plan_bookings as pb');
        $builder->select('pb.*, p.name, p.price');
        $builder->join('packages as p', 'p.id = pb.package_id', 'left');
        $builder->where('pb.id', $id);
        $builder->where('pb.delete_audit_time IS NULL', null, false); // exclude soft deleted
    
        return $builder->get()->getRowArray();
    }


    // UPDATE
    public function updateBooking($id, array $data)
    {
        $builder = $this->db->table($this->table);
        $builder->where('id', $id);
        return $builder->update($data);
    }

    // SOFT DELETE
    public function deleteBooking($id, $delete_audit_id = null)
    {
        $builder = $this->db->table($this->table);
        return $builder->where('id', $id)
                       ->update([
                           'delete_audit_id'   => $delete_audit_id,
                           'delete_audit_time' => date('Y-m-d H:i:s')
                       ]);
    }
    
    public function updateStatus($id, $status, $auditId)
    {
        return $this->update($id, [
            'status' => $status,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    }
}
