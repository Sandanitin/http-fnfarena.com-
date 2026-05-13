<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\SubCategoryModel;

class SubCategoryController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new SubCategoryModel();
    }

    /**
     * GET /api/sub-categories
     */
    public function index()
    {
        $data = $this->model->getAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Subcategories fetched successfully',
            'data'    => $data
        ]);
    }

    public function get()
    {
        $data = $this->model->getClientAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Subcategories fetched successfully',
            'data'    => $data
        ]);
    }

    /**
     * GET /api/sub-categories/{id}
     */
    public function show($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) {
            return $this->failNotFound('Subcategory not found');
        }

        return $this->respond([
            'status' => 200,
            'data'   => $record
        ]);
    }

    /**
     * POST /api/sub-categories
     */
    public function create()
    {
        // Get JSON input as associative array
        $data = $this->request->getJSON(true);

        $categoryId = $data['category_id'] ?? null;
        $name       = $data['name'] ?? null;
        $status     = $data['status'] ?? 'Active';
        $auditId    = $data['create_audit_id'] ?? null;

        // Validate required fields
        if (!$categoryId || !$name || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('category_id, name, status, create_audit_id are required');
        }

        $insertData = [
            'category_id'      => $categoryId,
            'name'             => $name,
            'status'           => $status,
            'create_audit_id'  => $auditId
        ];

        $id = $this->model->createData($insertData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Subcategory created successfully',
            'data'    => ['id' => $id]
        ]);
    }

    /**
     * PUT /api/sub-categories/{id}
     */
    public function update($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) {
            return $this->failNotFound('Subcategory not found');
        }

        // Get JSON input as associative array
        $data = $this->request->getJSON(true);

        $categoryId = $data['category_id'] ?? $record['category_id'];
        $name       = $data['name'] ?? $record['name'];
        $status     = $data['status'] ?? $record['status'];
        $auditId    = $data['update_audit_id'] ?? null;

        // Validate required fields
        if (!$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('update_audit_id and valid status are required');
        }

        $updateData = [
            'category_id'     => $categoryId,
            'name'            => $name,
            'status'          => $status,
            'update_audit_id' => $auditId
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Subcategory updated successfully'
        ]);
    }

    /**
     * PATCH /api/sub-categories/{id}/status
     */
    public function updateStatus($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) {
            return $this->failNotFound('Subcategory not found');
        }

        $data = $this->request->getJSON(true);
        $status = $data['status'] ?? null;
        $auditId = $data['update_audit_id'] ?? null;

        if (!$status || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('status and update_audit_id are required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status'  => 200,
            'message' => 'Subcategory status updated successfully',
            'data'    => ['id' => $id, 'status' => $status]
        ]);
    }

    /**
     * DELETE /api/sub-categories/{id}
     */
    public function delete($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) {
            return $this->failNotFound('Subcategory not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data || !isset($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Subcategory deleted successfully'
        ]);
    }
}
