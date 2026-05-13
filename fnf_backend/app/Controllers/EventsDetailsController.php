<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\EventDetailsModel;

class EventsDetailsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new EventDetailsModel();
    }

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
            'data' => $this->model->getClientAll()
        ]);
    }

    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) {
            return $this->failNotFound('Event not found');
        }

        return $this->respond(['status' => 200, 'data' => $data]);
    }

    public function create()
    {
        $data = $this->request->getPost();

        if (empty($data['event_id']) || empty($data['create_audit_id'])) {
            return $this->failValidationErrors('event_id and create_audit_id required');
        }

        $r2 = new \App\Libraries\R2Upload();

        for ($i = 1; $i <= 3; $i++) {

            $file = $this->request->getFile('image' . $i);

            if ($file && $file->isValid() && !$file->hasMoved()) {

                // 🔑 Generate filename only
                $fileName = uniqid() . '.' . $file->getExtension();

                // 🔑 R2 full path
                $objectKey = 'FNF/' . $fileName;

                // Upload to R2
                $r2->upload($file->getTempName(), $objectKey);

                // ✅ Save ONLY filename in DB
                $data['image' . $i] = $fileName;
            }
        }

        $data['create_audit_time'] = date('Y-m-d H:i:s');

        $this->model->insert($data);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Event created successfully',
            'id'      => $this->model->getInsertID()
        ]);
    }

    public function update($id = null)
    {
        // Check if record exists
        $existing = $this->model->getById($id);
        if (!$existing) {
            return $this->failNotFound('Event not found');
        }

        // Get form-data (POST)
        $data = $this->request->getPost();

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id required');
        }

        $r2 = new \App\Libraries\R2Upload();

        // Handle image uploads (1–3)
        for ($i = 1; $i <= 3; $i++) {
            $file = $this->request->getFile('image' . $i);

            if ($file && $file->isValid() && !$file->hasMoved()) {

                // Generate filename
                $fileName = uniqid() . '.' . $file->getExtension();

                // Upload to R2
                $objectKey = 'FNF/' . $fileName;
                $r2->upload($file->getTempName(), $objectKey);

                // Save only filename in DB
                $data['image' . $i] = $fileName;

            }
        }

        // Audit time
        $data['update_audit_time'] = date('Y-m-d H:i:s');

        // Update DB
        $this->model->update($id, $data);

        return $this->respond([
            'status' => 200,
            'message' => 'Event updated successfully'
        ]);
    }

    public function updateStatus($id = null)
    {
        $data = $this->request->getJSON(true);

        if (empty($data['status']) || empty($data['update_audit_id'])) {
            return $this->failValidationErrors('status and update_audit_id required');
        }

        $this->model->updateStatus($id, $data['status'], $data['update_audit_id']);

        return $this->respond(['status' => 200, 'message' => 'Status updated']);
    }

    public function delete($id = null)
    {
        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted(['status' => 200, 'message' => 'Event deleted']);
    }
}


?>