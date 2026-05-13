<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ActivityReviewsModel;
use App\Libraries\R2Upload;

class ActivityReviewsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ActivityReviewsModel();
    }

    /* ===========================
       GET ALL
    ============================ */
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

    /* ===========================
       GET BY ID
    ============================ */
    public function show($id = null)
    {
        $review = $this->model->getById($id);

        if (!$review) {
            return $this->failNotFound('Review not found');
        }

        return $this->respond([
            'status' => 200,
            'data' => $review
        ]);
    }

    /* ===========================
       CREATE
    ============================ */
    public function create()
    {
        $data = $this->request->getPost();

        if (
            empty($data['activity_id']) ||
            empty($data['reviewer_name']) ||
            empty($data['rating']) ||
            empty($data['review_description']) ||
            empty($data['create_audit_id'])
        ) {
            return $this->failValidationErrors('Required fields missing');
        }

        /* IMAGE UPLOAD (R2) */
        $imageName = null;
        $image = $this->request->getFile('reviewer_image');

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $objectKey = uniqid() . '.' . $image->getExtension();
            $r2 = new R2Upload();
            $r2->upload($image->getTempName(), 'FNF/' . $objectKey);
            $imageName = $objectKey;
        }

        $insertData = [
            'activity_id'        => $data['activity_id'],
            'reviewer_name'      => $data['reviewer_name'],
            'rating'             => $data['rating'],
            'review_description' => $data['review_description'],
            'reviewer_image'     => $imageName,
            'status'             => $data['status'] ?? 'active',
            'create_audit_id'    => $data['create_audit_id']
        ];

        $id = $this->model->createData($insertData);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Review added successfully',
            'data' => ['id' => $id]
        ]);
    }

    /* ===========================
       UPDATE
    ============================ */
    public function update($id = null)
    {
        $review = $this->model->getById($id);
        if (!$review) {
            return $this->failNotFound('Review not found');
        }

        $data = $this->request->getPost();

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        /* IMAGE UPLOAD (R2) */
        $imageName = $review['reviewer_image'];
        $image = $this->request->getFile('reviewer_image');

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $objectKey = uniqid() . '.' . $image->getExtension();
            $r2 = new R2Upload();
            $r2->upload($image->getTempName(), 'FNF/' . $objectKey);
            $imageName = $objectKey;
        }

        $updateData = [
            'activity_id'        => $data['activity_id'] ?? $review['activity_id'],
            'reviewer_name'      => $data['reviewer_name'] ?? $review['reviewer_name'],
            'rating'             => $data['rating'] ?? $review['rating'],
            'review_description' => $data['review_description'] ?? $review['review_description'],
            'reviewer_image'     => $imageName,
            'status'             => $data['status'] ?? $review['status'],
            'update_audit_id'    => $data['update_audit_id']
        ];

        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status' => 200,
            'message' => 'Review updated successfully'
        ]);
    }

    /* ===========================
       UPDATE STATUS ONLY
    ============================ */
    public function updateStatus($id = null)
    {
        $review = $this->model->getById($id);
        if (!$review) {
            return $this->failNotFound('Review not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['status']) || empty($data['update_audit_id'])) {
            return $this->failValidationErrors('status and update_audit_id required');
        }

        $this->model->updateStatus($id, $data['status'], $data['update_audit_id']);

        return $this->respond([
            'status' => 200,
            'message' => 'Status updated successfully'
        ]);
    }

    /* ===========================
       SOFT DELETE
    ============================ */
    public function delete($id = null)
    {
        $review = $this->model->getById($id);
        if (!$review) {
            return $this->failNotFound('Review not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status' => 200,
            'message' => 'Review deleted successfully'
        ]);
    }
}
