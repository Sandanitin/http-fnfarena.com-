<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ActivityProtocolsModel;

class ActivityProtocolsController extends ResourceController
{
    protected $modelName = ActivityProtocolsModel::class;
    protected $format = 'json';

    // =========================
    // GET ALL
    // =========================
    public function index()
    {
        $data = $this->model->getAll();
        return $this->respond(['status' => 200, 'data' => $data]);
    }
    
    public function get()
    {
        $data = $this->model->getClinetAll();
        return $this->respond(['status' => 200, 'data' => $data]);
    }

    // =========================
    // GET SINGLE
    // =========================
    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) {
            return $this->failNotFound('Protocol not found');
        }
        return $this->respond(['status' => 200, 'data' => $data]);
    }

    // =========================
    // CREATE
    // =========================
    public function create()
    {
        $data = $this->request->getJSON(true);

        $required = [
            'activity_id', 'requirements', 'equipment',
            'etiquette', 'rules', 'status', 'create_audit_id'
        ];

        foreach ($required as $field) {
            if (empty($data[$field])) {
                return $this->failValidationErrors("$field is required");
            }
        }

        $id = $this->model->createData([
            'activity_id'      => $data['activity_id'],
            'requirements'     => json_encode($data['requirements']),
            'equipment'        => json_encode($data['equipment']),
            'etiquette'        => json_encode($data['etiquette']),
            'rules'            => json_encode($data['rules']),
            'status'           => $data['status'],
            'create_audit_id'  => $data['create_audit_id']
        ]);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Activity protocol created successfully',
            'id' => $id
        ]);
    }

    // =========================
    // UPDATE
    // =========================
    public function update($id = null)
    {
        $protocol = $this->model->exists($id);
        if (!$protocol) {
            return $this->failNotFound('Protocol not found');
        }

        $data = $this->request->getJSON(true);
        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $this->model->updateData($id, [
            'activity_id'      => $data['activity_id'],
            'requirements'     => json_encode($data['requirements']),
            'equipment'        => json_encode($data['equipment']),
            'etiquette'        => json_encode($data['etiquette']),
            'rules'            => json_encode($data['rules']),
            'status'           => $data['status'],
            'update_audit_id'  => $data['update_audit_id'],
            'update_audit_time'=> date('Y-m-d H:i:s')
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Activity protocol updated successfully'
        ]);
    }

    // =========================
    // DELETE (SOFT)
    // =========================
    public function delete($id = null)
    {
        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respond([
            'status' => 200,
            'message' => 'Activity protocol deleted successfully'
        ]);
    }

    // =========================
    // STATUS UPDATE
    // =========================
    public function updateStatus($id = null)
    {
        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $status = $this->model->toggleStatus($id, $data['update_audit_id']);

        return $this->respond([
            'status' => 200,
            'message' => 'Status updated successfully',
            'status' => $status
        ]);
    }
}
