<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\OurVisionValuesModel;
use App\Libraries\R2Upload;

class OurVisionValuesController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new OurVisionValuesModel();
    }

    // CREATE (name + image + status)
    public function create()
    {
        $name            = $this->request->getPost('name');
        $status          = $this->request->getPost('status');
        $create_audit_id = $this->request->getPost('create_audit_id');

        if (!$name || !$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Name and valid status are required');
        }

        // Upload image to Cloudflare R2
        $image = $this->request->getFile('image');
        $imageName = null;

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $objectKey = uniqid() . '.' . $image->getExtension();

            $r2 = new R2Upload();
            $r2->upload($image->getTempName(), 'FNF/' . $objectKey);

            $imageName = $objectKey;
        }

        $data = [
            'name'            => $name,
            'image'           => $imageName,
            'status'          => $status,
            'create_audit_id' => $create_audit_id
        ];

        $id = $this->model->createData($data);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Vision & Values created successfully',
            'data'    => [
                'id'    => $id,
                'image' => $imageName
            ]
        ]);
    }

    // READ ALL
    public function index()
    {
        $data   = $this->model->getAll();

        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    public function get()
    {
        $data   = $this->model->getClientAll();

        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    // READ ONE
    public function show($id = null)
    {
        $data = $this->model->getById($id);

        if (!$data) {
            return $this->failNotFound('Record not found');
        }

        return $this->respond([
            'status' => 200,
            'data'   => $data
        ]);
    }

    // UPDATE (name + status + optional image)
    public function update($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) {
            return $this->failNotFound('Record not found');
        }

        $name            = $this->request->getPost('name') ?? $record['name'];
        $status          = $this->request->getPost('status') ?? $record['status'];
        $update_audit_id = $this->request->getPost('update_audit_id');

        if (!$name || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Invalid name or status');
        }

        $image = $this->request->getFile('image');
        $imageName = $record['image'];

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $objectKey = uniqid() . '.' . $image->getExtension();

            $r2 = new R2Upload();
            $r2->upload($image->getTempName(), 'FNF/' . $objectKey);

            $imageName = $objectKey;
        }

        $updateData = [
            'name'              => $name,
            'image'             => $imageName,
            'status'            => $status,
            'update_audit_id'   => $update_audit_id,
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Vision & Values updated successfully',
            'data'    => [
                'image' => $imageName
            ]
        ]);
    }

    // UPDATE STATUS ONLY
    public function updateStatus($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) {
            return $this->failNotFound('Record not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data) {
            return $this->failValidationErrors('Invalid JSON input');
        }

        $status = $data['status'] ?? null;
        $userId = $data['update_audit_id'] ?? null;

        if (!$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Invalid or missing status value');
        }

        if (!$userId) {
            return $this->failValidationErrors('user_id (update_audit_id) is required');
        }

        // Call model to update status
        $this->model->updateStatus($id, $status, $userId);

        return $this->respond([
            'status'  => 200,
            'message' => 'Vision & Values status updated successfully',
            'data'    => [
                'id'     => $id,
                'status' => $status
            ]
        ]);
    }

    // DELETE (Soft delete)
    public function delete($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) {
            return $this->failNotFound('Record not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data || !isset($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Vision & Values deleted successfully'
        ]);
    }
}
