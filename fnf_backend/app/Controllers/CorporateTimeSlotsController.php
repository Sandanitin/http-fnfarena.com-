<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CorporateTimeSlotModel;

class CorporateTimeSlotsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new CorporateTimeSlotModel();
    }

    /* ===== GET ALL (ADMIN) ===== */
    public function index()
    {
        return $this->respond([
            'status' => 200,
            'data' => $this->model->getAll()
        ]);
    }

    public function get()
    {
        return $this->respond([
            'status' => 200,
            'data' => $this->model->getClientAll()
        ]);
    }

    /* ===== GET ACTIVE (CLIENT) ===== */
    public function active()
    {
        return $this->respond([
            'status' => 200,
            'data' => $this->model->getActive()
        ]);
    }

    /* ===== GET BY ID ===== */
    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) return $this->failNotFound('Time slot not found');

        return $this->respond([
            'status' => 200,
            'data' => $data
        ]);
    }

    /* ===== CREATE ===== */
    public function create()
    {
        $input = $this->request->getJSON(true);

        $start = $input['start_time'] ?? null;
        $end = $input['end_time'] ?? null;
        $auditId = $input['create_audit_id'] ?? null;
        $status = $input['status'] ?? 'Active';

        if (!$start || !$end || !$auditId) {
            return $this->failValidationErrors(
                'start_time, end_time, create_audit_id are required'
            );
        }

        if ($start >= $end) {
            return $this->failValidationErrors('start_time must be less than end_time');
        }

        $id = $this->model->createData([
            'start_time' => $start,
            'end_time' => $end,
            'status' => $status,
            'create_audit_id' => $auditId
        ]);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Time slot created successfully',
            'data' => ['id' => $id]
        ]);
    }

    /* ===== UPDATE ===== */
    public function update($id = null)
    {
        $existing = $this->model->getById($id);
        if (!$existing) return $this->failNotFound('Time slot not found');

        $input = $this->request->getJSON(true);

        $start = $input['start_time'] ?? $existing['start_time'];
        $end = $input['end_time'] ?? $existing['end_time'];
        $status = $input['status'] ?? $existing['status'];
        $auditId = $input['update_audit_id'] ?? null;

        if (!$auditId) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        if ($start >= $end) {
            return $this->failValidationErrors('start_time must be less than end_time');
        }

        $this->model->updateData($id, [
            'start_time' => $start,
            'end_time' => $end,
            'status' => $status,
            'update_audit_id' => $auditId
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Time slot updated successfully'
        ]);
    }

    /* ===== UPDATE STATUS ===== */
    public function updateStatus($id = null)
    {
        $input = $this->request->getJSON(true);

        $status = $input['status'] ?? null;
        $auditId = $input['update_audit_id'] ?? null;

        if (!$status || !$auditId) {
            return $this->failValidationErrors('status and update_audit_id required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status' => 200,
            'message' => 'Status updated successfully'
        ]);
    }

    /* ===== DELETE (SOFT) ===== */
    public function delete($id = null)
    {
        $input = $this->request->getJSON(true);
        $auditId = $input['delete_audit_id'] ?? null;

        if (!$auditId) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $auditId);

        return $this->respondDeleted([
            'status' => 200,
            'message' => 'Time slot deleted successfully'
        ]);
    }
}
