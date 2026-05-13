<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\EventTypeModel;

class EventsTypesController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new EventTypeModel();
    }

    // ===========================
    // GET ALL
    // ===========================
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

    // ===========================
    // GET SINGLE
    // ===========================
    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) return $this->failNotFound('Activity type not found');

        return $this->respond([
            'status' => 200,
            'data' => $data
        ]);
    }

    // ===========================
    // CREATE
    // ===========================
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (empty($data['name']) || empty($data['create_audit_id'])) {
            return $this->failValidationErrors('name and create_audit_id are required');
        }

        $insertData = [
            'name' => $data['name'],
            'status' => $data['status'] ?? 'Active',
            'create_audit_id' => $data['create_audit_id'],
            'create_audit_time' => date('Y-m-d H:i:s')
        ];

        $id = $this->model->createData($insertData);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Activity type created successfully',
            'data' => ['id' => $id]
        ]);
    }

    // ===========================
    // UPDATE
    // ===========================
    public function update($id = null)
    {
        $activity = $this->model->getById($id);
        if (!$activity) return $this->failNotFound('Activity type not found');

        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $updateData = [
            'name' => $data['name'] ?? $activity['name'],
            'status' => $data['status'] ?? $activity['status'],
            'update_audit_id' => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status' => 200,
            'message' => 'Activity type updated successfully',
            'data' => ['id' => $id]
        ]);
    }

    // ===========================
    // UPDATE STATUS ONLY
    // ===========================
    public function updateStatus($id = null)
    {
        $activity = $this->model->getById($id);
        if (!$activity) return $this->failNotFound('Activity type not found');

        $data = $this->request->getJSON(true);

        if (empty($data['status']) || empty($data['update_audit_id'])) {
            return $this->failValidationErrors('status and update_audit_id required');
        }

        if (!in_array($data['status'], ['Active','Inactive'])) {
            return $this->failValidationErrors('Invalid status');
        }

        $this->model->updateData($id, [
            'status' => $data['status'],
            'update_audit_id' => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Status updated successfully'
        ]);
    }

    // ===========================
    // DELETE (SOFT)
    // ===========================
    public function delete($id = null)
    {
        $activity = $this->model->getById($id);
        if (!$activity) return $this->failNotFound('Activity type not found');

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->updateData($id, [
            'delete_audit_id' => $data['delete_audit_id'],
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Activity type deleted successfully'
        ]);
    }
}
