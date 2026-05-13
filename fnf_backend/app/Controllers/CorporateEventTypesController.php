<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CorporateEventTypeModel;

class CorporateEventTypesController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new CorporateEventTypeModel();
    }

    /* ===== GET ALL ===== */
    public function index()
    {
        return $this->respond([
            'status' => 200,
            'data' => $this->model->getAll()
        ]);
    }

    /* ===== GET ALL ===== */
    public function get()
    {
        return $this->respond([
            'status' => 200,
            'data' => $this->model->getClientAll()
        ]);
    }

    /* ===== GET BY ID ===== */
    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) return $this->failNotFound('Event type not found');

        return $this->respond([
            'status' => 200,
            'data' => $data
        ]);
    }

    /* ===== CREATE (JSON) ===== */
    public function create()
    {
        $input = $this->request->getJSON(true);

        $name = $input['name'] ?? null;
        $status = $input['status'] ?? 'Active';
        $auditId = $input['create_audit_id'] ?? null;

        if (!$name || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('name, status, create_audit_id are required');
        }

        $id = $this->model->createData([
            'name' => $name,
            'status' => $status,
            'create_audit_id' => $auditId
        ]);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Corporate event type created',
            'data' => ['id' => $id]
        ]);
    }

    /* ===== UPDATE (JSON) ===== */
    public function update($id = null)
    {
        $existing = $this->model->getById($id);
        if (!$existing) return $this->failNotFound('Event type not found');

        $input = $this->request->getJSON(true);

        $name = $input['name'] ?? $existing['name'];
        $status = $input['status'] ?? $existing['status'];
        $auditId = $input['update_audit_id'] ?? null;

        if (!$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('update_audit_id and valid status required');
        }

        $this->model->updateData($id, [
            'name' => $name,
            'status' => $status,
            'update_audit_id' => $auditId
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Corporate event type updated'
        ]);
    }

    /* ===== UPDATE STATUS ONLY ===== */
    public function updateStatus($id = null)
    {
        $input = $this->request->getJSON(true);

        $status = $input['status'] ?? null;
        $auditId = $input['update_audit_id'] ?? null;

        if (!$status || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('status and update_audit_id required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status' => 200,
            'message' => 'Status updated'
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
            'message' => 'Corporate event type deleted'
        ]);
    }
}
