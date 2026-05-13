<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PackageModel;

class PackageController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new PackageModel();
    }

    // =========================
    // Get all packages
    // =========================
    public function index()
    {
        $packages = $this->model->getAllPackages();
        return $this->respond([
            'status' => 200,
            'data'   => $packages
        ]);
    }
    
    public function get()
    {
        $packages = $this->model->getClientAllPackages();
        return $this->respond([
            'status' => 200,
            'data'   => $packages
        ]);
    }

    // =========================
    // Get single package
    // =========================
    public function show($id = null)
    {
        $package = $this->model->getPackageById($id);
        if (!$package) {
            return $this->failNotFound('Package not found');
        }

        return $this->respond([
            'status' => 200,
            'data'   => $package
        ]);
    }

    // =========================
    // Create package
    // =========================
    public function create()
    {
        $data = $this->request->getJSON(true);
    
        $name            = $data['name'] ?? null;
        $status          = $data['status'] ?? null;
        $create_audit_id = $data['create_audit_id'] ?? null;
        $guidelines      = $data['guidelines'] ?? null; // new field
    
        // Validate required fields
        if (!$name || !$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Name and valid Status are required');
        }
    
        // Validate guidelines
        if ($guidelines) {
            if (!is_array($guidelines)) {
                return $this->failValidationErrors('Guidelines must be an array');
            }
    
            foreach ($guidelines as $index => $guide) {
                if (!isset($guide['title']) || !isset($guide['description'])) {
                    return $this->failValidationErrors("Each guideline must have a title and description. Error at index $index");
                }
            }
    
            // Convert guidelines array to JSON string
            $guidelines = json_encode($guidelines);
        }
    
        $packageData = [
            'name'             => $name,
            'description'      => $data['description'] ?? null,
            'price'            => $data['price'] ?? null,
            'discounted_price' => $data['discounted_price'] ?? null,
            'features'         => isset($data['features']) ? json_encode($data['features']) : null,
            'is_most_popular'  => $data['is_most_popular'] ?? 0,
            'status'           => $status,
            'guidelines'       => $guidelines, // save validated guidelines
            'create_audit_id'  => $create_audit_id,
            'create_audit_time'=> date('Y-m-d H:i:s')
        ];
    
        $id = $this->model->createPackage($packageData);
    
        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Package created successfully',
            'data'    => ['id' => $id]
        ]);
    }

    // =========================
    // Update package
    // =========================
    public function update($id = null)
    {
        if (!$id) {
            return $this->failNotFound('Package ID is required');
        }
    
        $data = $this->request->getJSON(true);
    
        $name            = $data['name'] ?? null;
        $status          = $data['status'] ?? null;
        $update_audit_id = $data['update_audit_id'] ?? null;
        $guidelines      = $data['guidelines'] ?? null; // new field
    
        // Validate required fields
        if (!$name || !$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Name and valid Status are required');
        }
    
        // Validate guidelines
        if ($guidelines) {
            if (!is_array($guidelines)) {
                return $this->failValidationErrors('Guidelines must be an array');
            }
    
            foreach ($guidelines as $index => $guide) {
                if (!isset($guide['title']) || !isset($guide['description'])) {
                    return $this->failValidationErrors("Each guideline must have a title and description. Error at index $index");
                }
            }
    
            // Convert guidelines array to JSON string
            $guidelines = json_encode($guidelines);
        }
    
        $packageData = [
            'name'             => $name,
            'description'      => $data['description'] ?? null,
            'price'            => $data['price'] ?? null,
            'discounted_price' => $data['discounted_price'] ?? null,
            'features'         => isset($data['features']) ? json_encode($data['features']) : null,
            'is_most_popular'  => $data['is_most_popular'] ?? 0,
            'status'           => $status,
            'guidelines'       => $guidelines, // save validated guidelines
            'update_audit_id'  => $update_audit_id,
            'update_audit_time'=> date('Y-m-d H:i:s')
        ];
    
        $updated = $this->model->updatePackage($id, $packageData);
    
        if (!$updated) {
            return $this->failNotFound('Package not found or could not be updated');
        }
    
        return $this->respond([
            'status'  => 200,
            'message' => 'Package updated successfully',
            'data'    => ['id' => $id]
        ]);
    }

    public function updateStatus($id = null)
    {
        $category = $this->model->getPackageById($id);
        if (!$category) {
            return $this->failNotFound('Package not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data) {
            return $this->failValidationErrors('Invalid JSON input');
        }

        $status = $data['status'] ?? null;
        $userId = $data['update_audit_id'] ?? 1;

        if (!$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Invalid or missing status value');
        }

        $this->model->updateStatus($id, $status, $userId);

        return $this->respond([
            'status' => 200,
            'message' => 'Package status updated successfully',
            'data' => [
                'id' => $id,
                'status' => $status
            ]
        ]);
    }
    
    // =========================
    // Delete package
    // =========================
    public function delete($id = null)
{
    $package = $this->model->getPackageById($id);
    if (!$package) {
        return $this->failNotFound('Package not found');
    }

    // Example: logged-in user ID
    $delete_audit_id = 1; // replace with actual logged-in user ID

    $this->model->deletePackage($id, $delete_audit_id);

    return $this->respondDeleted([
        'status'  => 200,
        'message' => 'Package deleted successfully'
    ]);
}

}
