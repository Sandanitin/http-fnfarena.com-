<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CorporateBookingModel;

class CorporateBookingsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new CorporateBookingModel();
    }

    // GET /api/corporate-bookings (all bookings)
    public function index()
    {
        $data = $this->model->getAll();
        return $this->respond([
            'status' => 200,
            'message' => 'Bookings fetched successfully',
            'data' => $data
        ]);
    }

    // GET /api/corporate-bookings/{id} (single booking)
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

    // POST /api/corporate-bookings (create)
    public function create()
{
    $data = $this->request->getJSON(true);

    $required = [
        'company_name',
        'contact_person',
        'event_type_id',
        'participants_id',
        'preferred_date',
        'time_slot_id'
    ];

    // Validate required fields
    foreach ($required as $field) {
        if (empty($data[$field])) {
            return $this->failValidationErrors("$field is required");
        }
    }

    // Set default values if not provided
    $data['total']   = $data['total'] ?? 0;
    $data['advance'] = $data['advance'] ?? 0;
    $data['balance'] = $data['balance'] ?? ($data['total'] - $data['advance']);

    $id = $this->model->createData($data);

    return $this->respondCreated([
        'status' => 201,
        'message' => 'Booking created successfully',
        'data' => ['id' => $id]
    ]);
}


    // PUT /api/corporate-bookings/{id} (update)
    public function update($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) return $this->failNotFound('Booking not found');

        $data = $this->request->getJSON(true);

        $updateAuditId = $data['update_audit_id'] ?? null;
        if (!$updateAuditId) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $updateData = $data;
        $updateData['update_audit_id'] = $updateAuditId;
        $updateData['update_audit_time'] = date('Y-m-d H:i:s');

        // Recalculate balance if total or advance is updated
        if (isset($data['total']) || isset($data['advance'])) {
            $updateData['balance'] = ($data['total'] ?? $booking['total'] ?? 0) - ($data['advance'] ?? $booking['advance'] ?? 0);
        }

        // Handle booking_status changes
        if (isset($data['booking_status'])) {
            $status = $data['booking_status'];
            if (!in_array($status, ['Pending','Confirmed','Cancelled'])) {
                return $this->failValidationErrors('Invalid booking_status value');
            }

            if ($status === 'Confirmed') {
                $updateData['confirm_audit_id'] = $data['confirm_audit_id'] ?? $updateAuditId;
                $updateData['confirmed_audit_time'] = date('Y-m-d H:i:s');
            }

            if ($status === 'Cancelled') {
                $updateData['cancelled_audit_id'] = $data['cancelled_audit_id'] ?? $updateAuditId;
                $updateData['cancelled_audit_time'] = date('Y-m-d H:i:s');
            }
        }

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status' => 200,
            'message' => 'Booking updated successfully',
            'data' => ['id' => $id]
        ]);
    }

    // DELETE /api/corporate-bookings/{id} (soft delete)
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
