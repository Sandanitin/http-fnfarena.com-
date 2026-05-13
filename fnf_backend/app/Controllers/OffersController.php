<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\OffersModel;
use App\Libraries\R2Upload;

class OffersController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new OffersModel();
    }

    // GET all offers (Admin)
    public function index()
    {
        $data = $this->model->getAll();

        return $this->respond([
            'status'  => 200,
            'message' => 'Offers fetched successfully',
            'data'    => $data
        ]);
    }

    // GET active offers (Client)
    public function get()
    {
        $data = $this->model->getClientAll();

        return $this->respond([
            'status'  => 200,
            'message' => 'Offers fetched successfully',
            'data'    => $data
        ]);
    }

    // GET single offer
    public function show($id = null)
    {
        $offer = $this->model->getById($id);
        if (!$offer) return $this->failNotFound('Offer not found');

        return $this->respond([
            'status' => 200,
            'data'   => $offer
        ]);
    }

    // CREATE offer (form-data)
    public function create()
    {
        $name      = $this->request->getPost('name');
        $type      = $this->request->getPost('type');
        $discount  = $this->request->getPost('discount');
        $startDate = $this->request->getPost('start_date');
        $endDate   = $this->request->getPost('end_date');
        $status    = $this->request->getPost('status') ?? 'Active';
        $auditId  = $this->request->getPost('create_audit_id');

        if (!$name || !$type || !$discount || !$startDate || !$endDate || !$auditId) {
            return $this->failValidationErrors(
                'name, type, discount, start_date, end_date, create_audit_id are required'
            );
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
            'name'            => $name,
            'type'            => $type,
            'discount'        => $discount,
            'start_date'      => $startDate,
            'end_date'        => $endDate,
            'status'          => $status,
            'image'           => $imageName,
            'create_audit_id' => $auditId
        ];

        $id = $this->model->createData($data);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Offer created successfully',
            'data'    => ['id' => $id, 'image' => $imageName]
        ]);
    }

    // UPDATE offer (form-data)
    public function update($id = null)
    {
        $record = $this->model->getById($id);
        if (!$record) return $this->failNotFound('Offer not found');

        $auditId = $this->request->getPost('update_audit_id');
        if (!$auditId) {
            return $this->failValidationErrors('update_audit_id is required');
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
            'name'            => $this->request->getPost('name') ?? $record['name'],
            'type'            => $this->request->getPost('type') ?? $record['type'],
            'discount'        => $this->request->getPost('discount') ?? $record['discount'],
            'start_date'      => $this->request->getPost('start_date') ?? $record['start_date'],
            'end_date'        => $this->request->getPost('end_date') ?? $record['end_date'],
            'status'          => $this->request->getPost('status') ?? $record['status'],
            'image'           => $imageName,
            'update_audit_id' => $auditId
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Offer updated successfully'
        ]);
    }

    // UPDATE status (JSON)
    public function updateStatus($id = null)
    {
        $offer = $this->model->getById($id);
        if (!$offer) return $this->failNotFound('Offer not found');

        $data = $this->request->getJSON(true);
        $status  = $data['status'] ?? null;
        $auditId = $data['update_audit_id'] ?? null;

        if (!$status || !$auditId) {
            return $this->failValidationErrors('status and update_audit_id are required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status'  => 200,
            'message' => 'Offer status updated successfully'
        ]);
    }

    // SOFT DELETE (JSON)
    public function delete($id = null)
    {
        $offer = $this->model->getById($id);
        if (!$offer) return $this->failNotFound('Offer not found');

        $data = $this->request->getJSON(true);
        $auditId = $data['delete_audit_id'] ?? null;
        if (!$auditId) return $this->failValidationErrors('delete_audit_id is required');

        $this->model->softDelete($id, $auditId);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Offer deleted successfully'
        ]);
    }
}
