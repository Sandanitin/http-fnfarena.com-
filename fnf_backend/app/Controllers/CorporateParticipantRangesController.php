<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CorporateParticipantRangeModel;

class CorporateParticipantRangesController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new CorporateParticipantRangeModel();
    }

    /* ===== GET ALL (ADMIN) ===== */
    public function index()
    {
        return $this->respond([
            'status' => 200,
            'data' => $this->model->getAll()
        ]);
    }

    /* ===== GET ALL (Client) ===== */
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
        if (!$data) return $this->failNotFound('Participant range not found');

        return $this->respond([
            'status' => 200,
            'data' => $data
        ]);
    }

    /* ===== CREATE (JSON) ===== */
    public function create()
    {
        $input = $this->request->getJSON(true);

        $min = $input['min_participants'] ?? null;
        $max = $input['max_participants'] ?? null;
        $status = $input['status'] ?? 'Active';
        $auditId = $input['create_audit_id'] ?? null;

        if (!$min || !$max || !$auditId) {
            return $this->failValidationErrors(
                'min_participants, max_participants, create_audit_id are required'
            );
        }

        if ($min > $max) {
            return $this->failValidationErrors('min_participants must be less than max_participants');
        }

        $id = $this->model->createData([
            'min_participants' => $min,
            'max_participants' => $max,
            'status' => $status,
            'create_audit_id' => $auditId
        ]);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Participant range created successfully',
            'data' => ['id' => $id]
        ]);
    }

    /* ===== UPDATE (JSON) ===== */
    public function update($id = null)
    {
        $existing = $this->model->getById($id);
        if (!$existing) return $this->failNotFound('Participant range not found');

        $input = $this->request->getJSON(true);

        $min = $input['min_participants'] ?? $existing['min_participants'];
        $max = $input['max_participants'] ?? $existing['max_participants'];
        $status = $input['status'] ?? $existing['status'];
        $auditId = $input['update_audit_id'] ?? null;

        if (!$auditId) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        if ($min > $max) {
            return $this->failValidationErrors('min_participants must be less than max_participants');
        }

        $this->model->updateData($id, [
            'min_participants' => $min,
            'max_participants' => $max,
            'status' => $status,
            'update_audit_id' => $auditId
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Participant range updated successfully'
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
            'message' => 'Participant range deleted successfully'
        ]);
    }
}
