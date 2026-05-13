<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BirthdayBookingModel;

class BirthdayBookingsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new BirthdayBookingModel();
    }

    // GET /api/birthday-bookings
    public function index()
    {
        $data = $this->model->getAll();
        return $this->respond([
            'status' => 200,
            'message' => 'Bookings fetched successfully',
            'data' => $data
        ]);
    }

    // GET /api/birthday-bookings/{id}
    public function show($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) return $this->failNotFound('Booking not found');

        return $this->respond([
            'status' => 200,
            'message' => 'Booking fetched successfully',
            'data' => $booking
        ]);
    }

    // POST /api/birthday-bookings
    public function create()
    {
        $data = $this->request->getJSON(true);

        $required = ['customer_name', 'child', 'age', 'date', 'time', 'guests'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return $this->failValidationErrors("$field is required");
            }
        }

        $id = $this->model->createData($data);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Booking created successfully',
            'data' => ['id' => $id]
        ]);
    }

    // PUT /api/birthday-bookings/{id}
    public function update($id = null)
{
    // Fetch existing booking
    $booking = $this->model->getById($id);
    if (!$booking) {
        return $this->failNotFound('Booking not found');
    }

    // Get JSON input
    $data = $this->request->getJSON(true);
    $updateAuditId = $data['update_audit_id'] ?? null;

    if (!$updateAuditId) {
        return $this->failValidationErrors('update_audit_id is required');
    }

    // Start building update data
    $updateData = $data;
    $updateData['update_audit_id'] = $updateAuditId;
    $updateData['update_audit_time'] = date('Y-m-d H:i:s');

    // Recalculate balance if total or advance is updated
    if (isset($data['total']) || isset($data['advance'])) {
        $total = $data['total'] ?? $booking['total'];
        $advance = $data['advance'] ?? $booking['advance'];
        $updateData['balance'] = $total - $advance;
    }

    // Handle booking status and related audit fields
    if (isset($data['status'])) {
        $status = $data['status'];
        if (!in_array($status, ['Pending', 'Approved', 'Cancelled'])) {
            return $this->failValidationErrors('Invalid status value');
        }

        $updateData['status'] = $status;

        // Set audit times based on status
        if ($status === 'Approved') {
            $updateData['confirm_audit_id'] = $data['confirm_audit_id'] ?? $updateAuditId;
            $updateData['confirmed_audit_time'] = date('Y-m-d H:i:s');
        }

        if ($status === 'Cancelled') {
            $updateData['cancelled_audit_id'] = $data['cancelled_audit_id'] ?? $updateAuditId;
            $updateData['cancelled_audit_time'] = date('Y-m-d H:i:s');
        }
    }

    // Update booking in database
    $this->model->updateData($id, $updateData);

    return $this->respond([
        'status' => 200,
        'message' => 'Booking updated successfully',
        'data' => ['id' => $id]
    ]);
}


    // DELETE /api/birthday-bookings/{id}
    public function delete($id = null)
    {
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
