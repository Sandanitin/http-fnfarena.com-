<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\FoodProductModel;

class FoodProductsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new FoodProductModel();
    }

    /* =========================
        LIST ALL
    ========================== */
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

    /* =========================
        VIEW SINGLE
    ========================== */
    public function show($id = null)
    {
        $data = $this->model->getById($id);
        if (!$data) return $this->failNotFound('Food product not found');

        return $this->respond(['status' => 200, 'data' => $data]);
    }

    /* =========================
        CREATE
    ========================== */
    public function create()
    {
        $request = $this->request;

        // =========================
        // GET FORM DATA
        // =========================
        $category_id     = $request->getPost('category_id');
        $name            = $request->getPost('name');
        $description     = $request->getPost('description');
        $price           = $request->getPost('price');
        $offer_price     = $request->getPost('offer_price');
        $status          = $request->getPost('status') ?? 'Active';
        $create_audit_id = $request->getPost('create_audit_id');

        if (
            empty($category_id) ||
            empty($name) ||
            empty($price) ||
            empty($create_audit_id)
        ) {
            return $this->failValidationErrors('Required fields missing');
        }

        // =========================
        // R2 IMAGE UPLOAD
        // =========================
        $image     = $request->getFile('image');
        $imageName = null;

        if ($image && $image->isValid() && !$image->hasMoved()) {

            $objectKey = uniqid('food_', true) . '.' . $image->getExtension();

            try {
                $r2 = new \App\Libraries\R2Upload();
                $r2->upload(
                    $image->getTempName(),
                    'FNF/' . $objectKey
                );

                $imageName = $objectKey;

            } catch (\Exception $e) {
                return $this->failServerError('Image upload failed');
            }
        }

        // =========================
        // INSERT DATA
        // =========================
        $insertData = [
            'category_id'       => $category_id,
            'image'             => $imageName,
            'name'              => $name,
            'description'       => $description,
            'price'             => $price,
            'offer_price'       => $offer_price,
            'status'            => $status,
            'create_audit_id'   => $create_audit_id,
            'create_audit_time' => date('Y-m-d H:i:s')
        ];

        $id = $this->model->createData($insertData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Food product created successfully',
            'data'    => ['id' => $id]
        ]);
    }

    /* =========================
        UPDATE
    ========================== */
    public function update($id = null)
    {
        // =========================
        // CHECK PRODUCT
        // =========================
        $product = $this->model->getById($id);
        if (!$product) {
            return $this->failNotFound('Food product not found');
        }

        $request = $this->request;

        // =========================
        // GET FORM DATA
        // =========================
        $update_audit_id = $request->getPost('update_audit_id');

        if (empty($update_audit_id)) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $updateData = [
            'category_id'       => $request->getPost('category_id') ?? $product['category_id'],
            'name'              => $request->getPost('name') ?? $product['name'],
            'description'       => $request->getPost('description') ?? $product['description'],
            'price'             => $request->getPost('price') ?? $product['price'],
            'offer_price'       => $request->getPost('offer_price') ?? $product['offer_price'],
            'status'            => $request->getPost('status') ?? $product['status'],
            'update_audit_id'   => $update_audit_id,
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        // =========================
        // R2 IMAGE UPLOAD (OPTIONAL)
        // =========================
        $image = $request->getFile('image');

        if ($image && $image->isValid() && !$image->hasMoved()) {

            $objectKey = uniqid('food_', true) . '.' . $image->getExtension();

            try {
                $r2 = new \App\Libraries\R2Upload();
                $r2->upload(
                    $image->getTempName(),
                    'FNF/' . $objectKey
                );

                // overwrite old image
                $updateData['image'] = $objectKey;

            } catch (\Exception $e) {
                return $this->failServerError('Image upload failed');
            }
        }

        // =========================
        // UPDATE
        // =========================
        $this->model->updateData($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Food product updated successfully',
            'data'    => ['id' => $id]
        ]);
    }

    /* =========================
        UPDATE STATUS ONLY
    ========================== */
    public function updateStatus($id = null)
    {
        $product = $this->model->getById($id);
        if (!$product) return $this->failNotFound('Food product not found');

        $data = $this->request->getJSON(true);

        if (
            !in_array($data['status'] ?? '', ['Active','Inactive']) ||
            empty($data['update_audit_id'])
        ) {
            return $this->failValidationErrors('Valid status and update_audit_id required');
        }

        $this->model->updateData($id, [
            'status' => $data['status'],
            'update_audit_id' => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);

        return $this->respond([
            'status' => 200,
            'message' => 'Status updated successfully'
        ]);
    }

    /* =========================
        DELETE (SOFT)
    ========================== */
    public function delete($id = null)
    {
        $product = $this->model->getById($id);
        if (!$product) return $this->failNotFound('Food product not found');

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respond([
            'status' => 200,
            'message' => 'Food product deleted successfully'
        ]);
    }
}
