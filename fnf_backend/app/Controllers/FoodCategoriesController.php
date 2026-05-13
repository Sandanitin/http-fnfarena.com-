<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\FoodCategoryModel;

class FoodCategoriesController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new FoodCategoryModel();
    }

    /* =====================
       GET ALL
    ====================== */
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

    /* =====================
       GET BY ID
    ====================== */
    public function show($id = null)
    {
        $category = $this->model->getById($id);
        if (!$category) {
            return $this->failNotFound('Food category not found');
        }

        return $this->respond([
            'status' => 200,
            'data'   => $category
        ]);
    }

    /* =====================
       CREATE (JSON)
    ====================== */
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (
            empty($data['name']) ||
            empty($data['create_audit_id']) ||
            !in_array($data['status'] ?? 'Active', ['Active', 'Inactive'])
        ) {
            return $this->failValidationErrors(
                'name, status, create_audit_id are required'
            );
        }

        $id = $this->model->createData([
            'name'            => $data['name'],
            'status'          => $data['status'] ?? 'Active',
            'create_audit_id' => $data['create_audit_id']
        ]);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Food category created successfully',
            'data'    => ['id' => $id]
        ]);
    }

    /* =====================
       UPDATE (JSON)
    ====================== */
    public function update($id = null)
    {
        $category = $this->model->getById($id);
        if (!$category) {
            return $this->failNotFound('Food category not found');
        }

        $data = $this->request->getJSON(true);

        if (
            empty($data['update_audit_id']) ||
            !in_array($data['status'] ?? $category['status'], ['Active','Inactive'])
        ) {
            return $this->failValidationErrors(
                'update_audit_id and valid status are required'
            );
        }

        $this->model->updateData($id, [
            'name'            => $data['name'] ?? $category['name'],
            'status'          => $data['status'] ?? $category['status'],
            'update_audit_id' => $data['update_audit_id']
        ]);

        return $this->respond([
            'status'  => 200,
            'message' => 'Food category updated successfully',
            'data'    => ['id' => $id]
        ]);
    }

    /* =====================
       DELETE (SOFT)
    ====================== */
    public function delete($id = null)
    {
        $category = $this->model->getById($id);
        if (!$category) {
            return $this->failNotFound('Food category not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Food category deleted successfully'
        ]);
    }

    /* =====================
       UPDATE STATUS
    ====================== */
    public function updateStatus($id = null)
    {
        $category = $this->model->getById($id);
        if (!$category) {
            return $this->failNotFound('Food category not found');
        }

        $data = $this->request->getJSON(true);

        $status = $data['status'] ?? null;
        $auditId = $data['update_audit_id'] ?? null;

        if (!in_array($status, ['Active', 'Inactive']) || !$auditId) {
            return $this->failValidationErrors('Valid status and update_audit_id are required');
        }

        $updateData = [
            'status' => $status,
            'update_audit_id' => $auditId,
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status' => 200,
            'message' => 'Status updated successfully',
            'data' => ['id' => $id]
        ]);
    }

}
