<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ActivitiesBannerModel;
use App\Libraries\R2Upload;

class ActivitiesBannerController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ActivitiesBannerModel();
    }

    // GET all banners
    public function index()
    {
        $data = $this->model->getAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Banners fetched successfully',
            'data'    => $data
        ]);
    }

    public function get()
    {
        $data = $this->model->getClientAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Banners fetched successfully',
            'data'    => $data
        ]);
    }

    // GET one banner
    public function show($id = null)
    {
        $banner = $this->model->getById($id);
        if (!$banner) return $this->failNotFound('Banner not found');

        return $this->respond([
            'status' => 200,
            'data'   => $banner
        ]);
    }

    // POST create (form-data)
    public function create()
    {
        $title       = $this->request->getPost('title');
        $description = $this->request->getPost('description');
        $status      = $this->request->getPost('status') ?? 'Active';
        $auditId     = $this->request->getPost('create_audit_id');

        if (!$title || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('title, status, create_audit_id are required');
        }

        // Image upload
        $imageName = null;
        $image = $this->request->getFile('image');
        if ($image && $image->isValid() && !$image->hasMoved()) {
            $objectKey = uniqid() . '.' . $image->getExtension();
            $r2 = new R2Upload();
            $r2->upload($image->getTempName(), 'FNF/' . $objectKey);
            $imageName = $objectKey;
        }

        $data = [
            'title'           => $title,
            'description'     => $description,
            'status'          => $status,
            'image'           => $imageName,
            'create_audit_id' => $auditId
        ];

        $id = $this->model->createData($data);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Banner created successfully',
            'data'    => ['id' => $id, 'image' => $imageName]
        ]);
    }

    // POST update (form-data)
    public function update($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) return $this->failNotFound('Banner not found');

        $title       = $this->request->getPost('title') ?? $record['title'];
        $description = $this->request->getPost('description') ?? $record['description'];
        $status      = $this->request->getPost('status') ?? $record['status'];
        $auditId     = $this->request->getPost('update_audit_id');

        if (!$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('update_audit_id and valid status are required');
        }

        // Image upload
        $imageName = $record['image'];
        $image = $this->request->getFile('image');
        if ($image && $image->isValid() && !$image->hasMoved()) {
            $objectKey = uniqid() . '.' . $image->getExtension();
            $r2 = new R2Upload();
            $r2->upload($image->getTempName(), 'FNF/' . $objectKey);
            $imageName = $objectKey;
        }

        $updateData = [
            'title'           => $title,
            'description'     => $description,
            'status'          => $status,
            'image'           => $imageName,
            'update_audit_id' => $auditId
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Banner updated successfully',
            'data'    => ['image' => $imageName]
        ]);
    }

    // PATCH update status (JSON)
    public function updateStatus($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) return $this->failNotFound('Banner not found');

        $data = $this->request->getJSON(true);
        $status  = $data['status'] ?? null;
        $auditId = $data['update_audit_id'] ?? null;

        if (!$status || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('status and update_audit_id are required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status'  => 200,
            'message' => 'Banner status updated successfully',
            'data'    => ['id' => $id, 'status' => $status]
        ]);
    }

    // DELETE (soft delete, JSON)
    public function delete($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) return $this->failNotFound('Banner not found');

        $data = $this->request->getJSON(true);
        $auditId = $data['delete_audit_id'] ?? null;
        if (!$auditId) return $this->failValidationErrors('delete_audit_id is required');

        $this->model->softDelete($id, $auditId);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Banner deleted successfully'
        ]);
    }
}
