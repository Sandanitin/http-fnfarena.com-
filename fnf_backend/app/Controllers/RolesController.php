<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\RolesModel;

class RolesController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new RolesModel();
    }

    // GET /api/roles
    public function index()
    {
        $roles = $this->model->getAll();
        return $this->respond([
            'status' => 200,
            'message' => 'Roles fetched successfully',
            'data' => $roles
        ]);
    }

    // GET /api/roles/{id}
    public function show($id = null)
    {
        $role = $this->model->getById($id);
        if (!$role) return $this->failNotFound('Role not found');

        return $this->respond([
            'status' => 200,
            'data' => $role
        ]);
    }

    // POST /api/roles
    public function create()
{
    // Get JSON payload as associative array
    $input = $this->request->getJSON(true);

    $roleName = $input['role_name'] ?? null;
    $status   = $input['status'] ?? 'Active';
    $auditId  = $input['create_audit_id'] ?? null;

    // Validate required fields
    if (!$roleName || !$auditId || !in_array($status, ['Active','Inactive'])) {
        return $this->failValidationErrors('role_name, status, create_audit_id are required and status must be Active or Inactive');
    }

    $data = [
        'role_name' => $roleName,
        'status' => $status,
        'create_audit_id' => $auditId,
        'create_audit_time' => date('Y-m-d H:i:s')
    ];

    $id = $this->model->createData($data);

    return $this->respondCreated([
        'status' => 201,
        'message' => 'Role created successfully',
        'data' => ['id' => $id]
    ]);
}


    // PUT /api/roles/{id}
   public function update($id = null)
{
    $role = $this->model->getById($id);
    if (!$role) return $this->failNotFound('Role not found');

    // Get JSON payload as associative array
    $input = $this->request->getJSON(true);

    $roleName = $input['role_name'] ?? $role['role_name'];
    $status   = $input['status'] ?? $role['status'];
    $auditId  = $input['update_audit_id'] ?? null;

    // Validate required fields
    if (!$auditId || !in_array($status, ['Active','Inactive'])) {
        return $this->failValidationErrors('update_audit_id and valid status are required');
    }

    $updateData = [
        'role_name' => $roleName,
        'status' => $status,
        'update_audit_id' => $auditId,
        'update_audit_time' => date('Y-m-d H:i:s')
    ];

    $this->model->updateData($id, $updateData);

    return $this->respond([
        'status' => 200,
        'message' => 'Role updated successfully',
        'data' => ['id' => $id]
    ]);
}


    // PATCH /api/roles/status/{id}
    public function updateStatus($id = null)
    {
        $role = $this->model->getById($id);
        if (!$role) return $this->failNotFound('Role not found');

        $data = $this->request->getJSON(true);
        $status  = $data['status'] ?? null;
        $auditId = $data['update_audit_id'] ?? null;

        if (!$status || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('status and update_audit_id are required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status' => 200,
            'message' => 'Role status updated successfully',
            'data' => ['id' => $id, 'status' => $status]
        ]);
    }

    // DELETE /api/roles/{id} (soft delete)
    public function delete($id = null)
    {
        $role = $this->model->getById($id);
        if (!$role) return $this->failNotFound('Role not found');

        $data = $this->request->getJSON(true);
        $auditId = $data['delete_audit_id'] ?? null;
        if (!$auditId) return $this->failValidationErrors('delete_audit_id is required');

        $this->model->softDelete($id, $auditId);

        return $this->respondDeleted([
            'status' => 200,
            'message' => 'Role deleted successfully'
        ]);
    }
}
