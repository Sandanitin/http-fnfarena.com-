<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CmsActivityModel;

class CmsActivityController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new CmsActivityModel();
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
        if (!$data) return $this->failNotFound('Activity not found');

        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    /* =========================
        CREATE
    ========================== */
    public function create()
    {
        $data = $this->request->getJSON(true);
    
        $activity_type_id = $data['activity_type_id'] ?? null;
        $name             = $data['name'] ?? null;
        $duration         = $data['duration'] ?? null;
        $units            = $data['units'] ?? null;
        $original_price   = $data['original_price'] ?? null;
        $discount         = $data['discount'] ?? null;
        $offer_price      = $data['offer_price'] ?? null;
        $status           = $data['status'] ?? 'Active';
        $create_audit_id  = $data['create_audit_id'] ?? null;
    
        if (
            empty($activity_type_id) ||
            empty($name) ||
            empty($units) ||
            empty($original_price) ||
            empty($create_audit_id)
        ) {
            return $this->failValidationErrors('Required fields missing');
        }
    
        $id = $this->model->createData([
            'activity_type_id' => $activity_type_id,
            'name'             => $name,
            'duration'         => $duration,
            'units'            => $units,
            'original_price'   => $original_price,
            'discount'         => $discount,
            'offer_price'      => $offer_price,
            'status'           => $status,
            'create_audit_id'  => $create_audit_id,
            'create_audit_time'=> date('Y-m-d H:i:s')
        ]);
    
        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Activity created successfully',
            'data'    => ['id' => $id]
        ]);
    }


    /* =========================
        UPDATE
    ========================== */
    public function update($id = null)
    {
        // =========================
        // CHECK ACTIVITY
        // =========================
        $activity = $this->model->getById($id);
        if (!$activity) {
            return $this->failNotFound('Activity not found');
        }
    
        // =========================
        // GET JSON DATA
        // =========================
        $data = $this->request->getJSON(true);
    
        $update_audit_id = $data['update_audit_id'] ?? null;
    
        if (empty($update_audit_id)) {
            return $this->failValidationErrors('update_audit_id is required');
        }
    
        // =========================
        // PREPARE UPDATE DATA
        // =========================
        $updateData = [
            'activity_type_id' => $data['activity_type_id'] ?? $activity['activity_type_id'],
            'name'             => $data['name'] ?? $activity['name'],
            'duration'         => $data['duration'] ?? $activity['duration'],
            'units'            => $data['units'] ?? $activity['units'],
            'original_price'   => $data['original_price'] ?? $activity['original_price'],
            'discount'         => $data['discount'] ?? $activity['discount'],
            'offer_price'      => $data['offer_price'] ?? $activity['offer_price'],
            'status'           => $data['status'] ?? $activity['status'],
            'update_audit_id'  => $update_audit_id,
            'update_audit_time'=> date('Y-m-d H:i:s')
        ];
    
        // =========================
        // UPDATE
        // =========================
        $this->model->updateData($id, $updateData);
    
        return $this->respond([
            'status'  => 200,
            'message' => 'Activity updated successfully',
            'data'    => ['id' => $id]
        ]);
    }


    /* =========================
        UPDATE STATUS ONLY
    ========================== */
    public function updateStatus($id = null)
    {
        $activity = $this->model->getById($id);
        if (!$activity) return $this->failNotFound('Activity not found');

        $data = $this->request->getJSON(true);

        if (
            !in_array($data['status'] ?? '', ['Active', 'Inactive']) ||
            empty($data['update_audit_id'])
        ) {
            return $this->failValidationErrors('Valid status and update_audit_id required');
        }

        $this->model->updateData($id, [
            'status'           => $data['status'],
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
        $activity = $this->model->getById($id);
        if (!$activity) return $this->failNotFound('Activity not found');

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respond([
            'status'  => 200,
            'message' => 'Activity deleted successfully'
        ]);
    }
}
