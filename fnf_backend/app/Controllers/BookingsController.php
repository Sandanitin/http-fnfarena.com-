<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BookingsModel;

class BookingsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new BookingsModel();
    }

    /* ===========================
       GET ALL BOOKINGS
    ============================ */
    public function index()
    {
        $data = $this->model->getAll();

        return $this->respond([
            'status' => 200,
            'message' => 'Bookings fetched successfully',
            'data' => $data
        ]);
    }

    /* ===========================
       GET BOOKING BY ID
    ============================ */
    public function show($id = null)
    {
        $booking = $this->model->getById($id);

        if (!$booking) {
            return $this->failNotFound('Booking not found');
        }

        return $this->respond([
            'status' => 200,
            'data' => $booking
        ]);
    }

    /* ===========================
       CREATE BOOKING
    ============================ */
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (
            empty($data['user_name']) ||
            empty($data['activity_id']) ||
            empty($data['email']) || 
            empty($data['phone']) || 
            empty($data['group_size'])
        ) {
            return $this->failValidationErrors(
                'user_name, activity_id, create_audit_id are required'
            );
        }

        $insertData = [
            'user_name'       => $data['user_name'],
            'activity_id'     => $data['activity_id'],
            'email'           => $data['email'],
            'phone'           => $data['phone'],
            'group_size'      => $data['group_size'],
            'message'         => $data['message'],
            'status'          => $data['status'] ?? 'Active',
            'event_date'      => $data['event_date'],
            'event_time'      => $data['event_time'],
            'duration_hours'  => $data['duration_hours'],
            'create_audit_id' => $data['create_audit_id'] ?? 0,
        ];

        $id = $this->model->createData($insertData);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Booking created successfully',
            'data' => ['id' => $id]
        ]);
    }

    /* ===========================
       UPDATE BOOKING
    ============================ */
    public function update($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) {
            return $this->failNotFound('Booking not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }
        
        $updateData = [
            'user_name'       => $data['user_name'],
            'activity_id'     => $data['activity_id'],
            'email'           => $data['email'],
            'phone'           => $data['phone'],
            'group_size'      => $data['group_size'],
            'message'         => $data['message'],
            'status'          => $data['status'] ?? 'Active',
            'event_date'      => $data['event_date'],
            'event_time'      => $data['event_time'],
            'duration_hours'  => $data['duration_hours'],
            'update_audit_id' => $data['update_audit_id'],
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status' => 200,
            'message' => 'Booking updated successfully'
        ]);
    }

    /* ===========================
       UPDATE STATUS ONLY
    ============================ */
    public function updateStatus($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) {
            return $this->failNotFound('Booking not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['status']) || empty($data['update_audit_id'])) {
            return $this->failValidationErrors(
                'status and update_audit_id are required'
            );
        }

        $this->model->updateStatus(
            $id,
            $data['status'],
            $data['update_audit_id']
        );

        return $this->respond([
            'status' => 200,
            'message' => 'Booking status updated successfully'
        ]);
    }

    /* ===========================
       SOFT DELETE
    ============================ */
    public function delete($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) {
            return $this->failNotFound('Booking not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status' => 200,
            'message' => 'Booking deleted successfully'
        ]);
    }
}
