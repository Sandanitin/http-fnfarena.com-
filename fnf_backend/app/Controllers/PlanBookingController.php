<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class PlanBookingController extends ResourceController
{
    protected $modelName = 'App\Models\PlanBookingModel';
    protected $format = 'json';

    // CREATE
    public function create()
    {
        $data = $this->request->getJSON(true);

        $required = ['package_id','full_name','email','phone','event_date','event_time','participants','terms_accepted'];

        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                return $this->failValidationErrors("$field is required");
            }
        }

        $bookingData = [
            'package_id'       => $data['package_id'],
            'full_name'        => $data['full_name'],
            'email'            => $data['email'],
            'phone'            => $data['phone'],
            'event_date'       => $data['event_date'],
            'event_time'       => $data['event_time'],
            'participants'     => $data['participants'],
            'special_requests' => $data['special_requests'] ?? null,
            'terms_accepted'   => $data['terms_accepted'],
            'create_audit_id'  => $data['create_audit_id'] ?? null,
            'create_audit_time' => date('Y-m-d H:i:s')
        ];

        $id = $this->model->createBooking($bookingData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Booking created successfully',
            'data'    => ['id' => $id]
        ]);
    }

    // READ ALL
    public function index()
    {
        $bookings = $this->model->getAllBookings();
        return $this->respond(['status'=>200,'data'=>$bookings]);
    }

    // READ SINGLE
    public function show($id = null)
    {
        if (!$id) return $this->failNotFound('Booking ID required');

        $booking = $this->model->getBookingById($id);
        if (!$booking) return $this->failNotFound('Booking not found');

        return $this->respond(['status'=>200,'data'=>$booking]);
    }

    // UPDATE
    public function update($id = null)
    {
        if (!$id) return $this->failNotFound('Booking ID required');

        $data = $this->request->getJSON(true);

        $updateData = [];
        $fields = ['full_name','email','phone','event_date','event_time','participants','special_requests','terms_accepted','package_id','update_audit_id'];

        foreach ($fields as $field) {
            if (isset($data[$field])) $updateData[$field] = $data[$field];
        }

        if (!empty($updateData)) {
            $updateData['update_audit_time'] = date('Y-m-d H:i:s');
            $this->model->updateBooking($id, $updateData);
        }

        return $this->respond(['status'=>200,'message'=>'Booking updated successfully','data'=>['id'=>$id]]);
    }
    
    // PATCH update status (JSON)
    public function updateStatus($id = null)
    {
        $plan = $this->model->getBookingById($id);
        if (!$plan) return $this->failNotFound('Booking not found');

        $data = $this->request->getJSON(true);
        $status  = $data['status'] ?? null;
        $auditId = $data['update_audit_id'] ?? null;

        if (!$status || !$auditId || !in_array($status, ['Pending', 'Approve', 'Reject'])) {
            return $this->failValidationErrors('status and update_audit_id are required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status'  => 200,
            'message' => 'Booking status updated successfully',
            'data'    => ['id' => $id, 'status' => $status]
        ]);
    }

    // DELETE (soft delete)
    public function delete($id = null)
    {
        if (!$id) return $this->failNotFound('Booking ID required');

        $booking = $this->model->getBookingById($id);
        if (!$booking) return $this->failNotFound('Booking not found');

        $delete_audit_id = $this->request->getJSON(true)['delete_audit_id'] ?? null;
        $this->model->deleteBooking($id, $delete_audit_id);

        return $this->respond(['status'=>200,'message'=>'Booking deleted successfully']);
    }
}
