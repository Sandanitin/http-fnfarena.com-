<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ActivityMetricsModel;

class ActivityMetricsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ActivityMetricsModel();
    }

    /* ===========================
       GET ALL
    ============================ */
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
            'data' => $this->model->getClinetAll()
        ]);
    }

    /* ===========================
       GET BY ID
    ============================ */
    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) {
            return $this->failNotFound('Metrics not found');
        }

        return $this->respond([
            'status' => 200,
            'data' => $data
        ]);
    }

    /* ===========================
       CREATE
    ============================ */
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (
            empty($data['activity_id']) ||
            empty($data['create_audit_id'])
        ) {
            return $this->failValidationErrors(
                'activity_id and create_audit_id are required'
            );
        }

        $id = $this->model->createData($data);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Activity metrics created successfully',
            'data' => ['id' => $id]
        ]);
    }

    /* ===========================
       UPDATE FULL DATA
    ============================ */
    public function update($id = null)
    {
        if (!$this->model->getById($id)) {
            return $this->failNotFound('Metrics not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $this->model->updateData($id, $data);

        return $this->respond([
            'status' => 200,
            'message' => 'Activity metrics updated successfully'
        ]);
    }

    /* ===========================
       UPDATE STATUS ONLY
    ============================ */
    public function updateStatus($id = null)
    {
        if (!$this->model->getById($id)) {
            return $this->failNotFound('Metrics not found');
        }

        $data = $this->request->getJSON(true);

        if (
            empty($data['status']) ||
            empty($data['update_audit_id'])
        ) {
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
            'message' => 'Status updated successfully'
        ]);
    }

    /* ===========================
       SOFT DELETE
    ============================ */
    public function delete($id = null)
    {
        if (!$this->model->getById($id)) {
            return $this->failNotFound('Metrics not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status' => 200,
            'message' => 'Metrics deleted successfully'
        ]);
    }
}
