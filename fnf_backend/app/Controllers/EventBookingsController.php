<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\EventBookingModel;

class EventBookingsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new EventBookingModel();
    }

    /* =========================
        LIST ALL
    ========================== */
    public function index()
    {
        return $this->respond([
            'status' => 200,
            'data'   => $this->model->getAll()
        ]);
    }

    public function get()
    {
        return $this->respond([
            'status' => 200,
            'data'   => $this->model->getClientAll()
        ]);
    }

    /* =========================
        VIEW SINGLE
    ========================== */
    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) return $this->failNotFound('Event booking not found');

        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    /* =========================
        CREATE (JSON)
    ========================== */
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (
            empty($data['event_type_id']) ||
            empty($data['name']) ||
            empty($data['booking_type']) ||
            empty($data['date']) ||
            empty($data['total_amount']) ||
            empty($data['create_audit_id'])
        ) {
            return $this->failValidationErrors('Required fields missing');
        }

        $id = $this->model->createData([
            'event_type_id'     => $data['event_type_id'],
            'name'              => $data['name'],
            'booking_type'      => $data['booking_type'],
            'date'              => $data['date'],
            'guests'            => $data['guests'] ?? null,
            'total_amount'      => $data['total_amount'],
            'advance'           => $data['advance'] ?? 0,
            'balance'           => $data['balance'] ?? ($data['total_amount'] - ($data['advance'] ?? 0)),
            'payment_status'    => $data['payment_status'] ?? 'Pending',
            'status'            => $data['status'] ?? 'Active',
            'create_audit_id'   => $data['create_audit_id'],
            'create_audit_time' => date('Y-m-d H:i:s')
        ]);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Event booking created successfully',
            'data'    => ['id' => $id]
        ]);
    }

    /* =========================
        UPDATE (JSON)
    ========================== */
    public function update($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) return $this->failNotFound('Event booking not found');

        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $updateData = [
            'event_type_id'   => $data['event_type_id'] ?? $booking['event_type_id'],
            'name'            => $data['name'] ?? $booking['name'],
            'booking_type'    => $data['booking_type'] ?? $booking['booking_type'],
            'date'            => $data['date'] ?? $booking['date'],
            'guests'          => $data['guests'] ?? $booking['guests'],
            'total_amount'    => $data['total_amount'] ?? $booking['total_amount'],
            'advance'         => $data['advance'] ?? $booking['advance'],
            'balance'         => $data['balance'] ??
                                 (($data['total_amount'] ?? $booking['total_amount']) -
                                  ($data['advance'] ?? $booking['advance'])),
            'payment_status'  => $data['payment_status'] ?? $booking['payment_status'],
            'status'          => $data['status'] ?? $booking['status'],
            'update_audit_id' => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Event booking updated successfully'
        ]);
    }

    /* =========================
        UPDATE STATUS / PAYMENT
    ========================== */
    public function updateStatus($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) return $this->failNotFound('Event booking not found');

        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id required');
        }

        $this->model->updateData($id, [
            'status'           => $data['status'] ?? $booking['status'],
            'payment_status'   => $data['payment_status'] ?? $booking['payment_status'],
            'update_audit_id'  => $data['update_audit_id'],
            'update_audit_time'=> date('Y-m-d H:i:s')
        ]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Status updated successfully'
        ]);
    }

    /* =========================
        DELETE (SOFT)
    ========================== */
    public function delete($id = null)
    {
        $booking = $this->model->getById($id);
        if (!$booking) return $this->failNotFound('Event booking not found');

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respond([
            'status'  => 200,
            'message' => 'Event booking deleted successfully'
        ]);
    }
}
