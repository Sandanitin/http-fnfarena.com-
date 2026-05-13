<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\CategoryModel;

class CategoryController extends ResourceController
{
    protected $categoryModel;

    public function __construct()
    {
        $this->categoryModel = new CategoryModel();
    }

    // CREATE
    public function create()
    {
        // Get JSON body as associative array
        $data = $this->request->getJSON(true);

        $name            = $data['name'] ?? null;
        $status          = $data['status'] ?? null;
        $create_audit_id = $data['create_audit_id'] ?? null;

        if (!$name || !$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Name and valid Status are required');
        }

        $categoryData = [
            'name'            => $name,
            'status'          => $status,
            'create_audit_id' => $create_audit_id
        ];

        $id = $this->categoryModel->createCategory($categoryData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Category created successfully',
            'data'    => [
                'id' => $id
            ]
        ]);
    }

    // READ ALL (optional status filter)
    public function index()
    {
        $categories = $this->categoryModel->getCategories();

        return $this->respond([
            'status' => 200,
            'data' => $categories
        ]);
    }

    public function get()
    {
        $categories = $this->categoryModel->getclientCategories();

        return $this->respond([
            'status' => 200,
            'data' => $categories
        ]);
    }

    // READ ONE
    public function show($id = null)
    {
        $category = $this->categoryModel->getCategory($id);

        if (!$category) {
            return $this->failNotFound('Category not found');
        }

        return $this->respond([
            'status' => 200,
            'data' => $category
        ]);
    }

    // UPDATE
    public function update($id = null)
    {
        $category = $this->categoryModel->getCategory($id);
        if (!$category) {
            return $this->failNotFound('Category not found');
        }

        // Get JSON body
        $data = $this->request->getJSON(true);

        $name            = $data['name'] ?? $category['name'];
        $status          = $data['status'] ?? $category['status'];
        $update_audit_id = $data['update_audit_id'] ?? null;

        if (!in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Invalid status value');
        }

        $updateData = [
            'name'              => $name,
            'status'            => $status,
            'update_audit_id'   => $update_audit_id,
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->categoryModel->updateCategory($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Category updated successfully'
        ]);
    }

    public function updateStatus($id = null)
    {
        $category = $this->categoryModel->getCategory($id);
        if (!$category) {
            return $this->failNotFound('Category not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data) {
            return $this->failValidationErrors('Invalid JSON input');
        }

        $status = $data['status'] ?? null;
        $userId = $data['user_id'] ?? 1;

        if (!$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Invalid or missing status value');
        }

        $this->categoryModel->updateStatus($id, $status, $userId);

        return $this->respond([
            'status' => 200,
            'message' => 'Category status updated successfully',
            'data' => [
                'id' => $id,
                'status' => $status
            ]
        ]);
    }


    // DELETE (soft delete)
    public function delete($id = null)
    {
        $category = $this->categoryModel->getCategory($id);

        if (!$category) {
            return $this->failNotFound('Category not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data || !isset($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required in JSON payload');
        }
        $delete_audit_id = $data['delete_audit_id'];

        $this->categoryModel->deleteCategory($id, $delete_audit_id);

        return $this->respondDeleted([
            'status' => 200,
            'message' => 'Category deleted successfully'
        ]);
    }

}
