<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\HomeStatsModel;
use App\Libraries\R2Upload;

class HomeStatsController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new HomeStatsModel();
    }

    /**
     * GET /api/home-stats
     */
    public function index()
    {
        $data = $this->model->getStats();

        return $this->respond([
            'status'  => 200,
            'message' => 'Home stats fetched successfully',
            'data'    => $data
        ]);
    }

    public function get()
    {
        $data = $this->model->getClientStats();

        return $this->respond([
            'status'  => 200,
            'message' => 'Home stats fetched successfully',
            'data'    => $data
        ]);
    }

    /**
     * GET /api/home-stats/{id}
     */
    public function show($id = null)
    {
        $stat = $this->model->getById($id);

        if (!$stat) {
            return $this->failNotFound('Stat not found');
        }

        return $this->respond([
            'status' => 200,
            'data'   => $stat
        ]);
    }

    /**
     * POST /api/home-stats
     * Create stat with R2 image
     */
    public function store()
{
    $request = $this->request;

    $title            = $request->getPost('title');
    $status           = $request->getPost('status') ?? 'Active';
    $createAuditId    = $request->getPost('create_audit_id');

    if (!$title || !$createAuditId) {
        return $this->failValidationErrors('title and create_audit_id are required');
    }

    /* -------------------------
    MAIN IMAGE
    --------------------------*/
    $imageName = null;
    $image = $request->getFile('image');

    if ($image && $image->isValid() && !$image->hasMoved()) {
        $objectKey = uniqid() . '.' . $image->getExtension();
        (new R2Upload())->upload($image->getTempName(), 'FNF/' . $objectKey);
        $imageName = $objectKey;
    }

    /* -------------------------
    FEATURE IMAGES (1–5)
    --------------------------*/
    $featureImages = [];

    for ($i = 1; $i <= 5; $i++) {
        $file = $request->getFile("feature_image{$i}");
        $featureImages[$i] = null;

        if ($file && $file->isValid() && !$file->hasMoved()) {
            $objectKey = uniqid() . '.' . $file->getExtension();
            (new R2Upload())->upload($file->getTempName(), 'FNF/' . $objectKey);
            $featureImages[$i] = $objectKey;
        }
    }

    /* -------------------------
    INSERT DATA
    --------------------------*/
    $data = [
        'title'                  => $title,
        'image'                  => $imageName,

        'metrics1'               => $request->getPost('metrics1'),
        'metrics1_suffix'        => $request->getPost('metrics1_suffix'),
        'metrics2'               => $request->getPost('metrics2'),
        'metrics2_suffix'        => $request->getPost('metrics2_suffix'),
        'metrics3'               => $request->getPost('metrics3'),
        'metrics3_suffix'        => $request->getPost('metrics3_suffix'),

        'feature_title1'         => $request->getPost('feature_title1'),
        'feature_title2'         => $request->getPost('feature_title2'),
        'feature_title3'         => $request->getPost('feature_title3'),
        'feature_title4'         => $request->getPost('feature_title4'),
        'feature_title5'         => $request->getPost('feature_title5'),

        'feature_description1'   => $request->getPost('feature_description1'),
        'feature_description2'   => $request->getPost('feature_description2'),
        'feature_description3'   => $request->getPost('feature_description3'),
        'feature_description4'   => $request->getPost('feature_description4'),
        'feature_description5'   => $request->getPost('feature_description5'),

        'feature_image1'         => $featureImages[1],
        'feature_image2'         => $featureImages[2],
        'feature_image3'         => $featureImages[3],
        'feature_image4'         => $featureImages[4],
        'feature_image5'         => $featureImages[5],

        'status'                 => $status,
        'create_audit_id'        => $createAuditId,
        'create_audit_time'      => date('Y-m-d H:i:s')
    ];

    $id = $this->model->createStat($data);

    return $this->respondCreated([
        'status'  => 201,
        'message' => 'Home stat created successfully',
        'data'    => [
            'id'    => $id,
            'image' => $imageName
        ]
    ]);
}


    /**
     * PUT /api/home-stats/{id}
     * Update stat with optional R2 image
     */
    public function create()
{
    $id = '1';
    $stat = $this->model->getById($id);
    if (!$stat) {
        return $this->failNotFound('Stat not found');
    }

    $request = $this->request;

    $updateAuditId = $request->getPost('update_audit_id');
    if (!$updateAuditId) {
        return $this->failValidationErrors('update_audit_id is required');
    }

    /* -------------------------
    BASIC FIELDS (KEEP OLD IF EMPTY)
    --------------------------*/
    $title   = $request->getPost('title') ?? $stat['title'];
    $status  = $request->getPost('status') ?? $stat['status'];

    $metrics1 = $request->getPost('metrics1') ?? $stat['metrics1'];
    $metrics1_suffix = $request->getPost('metrics1_suffix') ?? $stat['metrics1_suffix'];
    $metrics2 = $request->getPost('metrics2') ?? $stat['metrics2'];
    $metrics2_suffix = $request->getPost('metrics2_suffix') ?? $stat['metrics2_suffix'];
    $metrics3 = $request->getPost('metrics3') ?? $stat['metrics3'];
    $metrics3_suffix = $request->getPost('metrics3_suffix') ?? $stat['metrics3_suffix'];

    /* -------------------------
    MAIN IMAGE
    --------------------------*/
    $imageName = $stat['image'];
    $image = $request->getFile('image');

    if ($image && $image->isValid() && !$image->hasMoved()) {
        $objectKey = uniqid() . '.' . $image->getExtension();
        (new R2Upload())->upload($image->getTempName(), 'FNF/' . $objectKey);
        $imageName = $objectKey;
    }

    /* -------------------------
    FEATURE IMAGES (1–5)
    --------------------------*/
    $featureImages = [];

    for ($i = 1; $i <= 5; $i++) {
        $existingImage = $stat["feature_image{$i}"] ?? null;
        $file = $request->getFile("feature_image{$i}");

        if ($file && $file->isValid() && !$file->hasMoved()) {
            $objectKey = uniqid() . '.' . $file->getExtension();
            (new R2Upload())->upload($file->getTempName(), 'FNF/' . $objectKey);
            $featureImages[$i] = $objectKey;
        } else {
            $featureImages[$i] = $existingImage;
        }
    }

    /* -------------------------
    UPDATE DATA
    --------------------------*/
    $updateData = [
        'title'                => $title,
        'image'                => $imageName,

        'metrics1'             => $metrics1,
        'metrics1_suffix'      => $metrics1_suffix,
        'metrics2'             => $metrics2,
        'metrics2_suffix'      => $metrics2_suffix,
        'metrics3'             => $metrics3,
        'metrics3_suffix'      => $metrics3_suffix,

        'feature_title1'       => $request->getPost('feature_title1') ?? $stat['feature_title1'],
        'feature_title2'       => $request->getPost('feature_title2') ?? $stat['feature_title2'],
        'feature_title3'       => $request->getPost('feature_title3') ?? $stat['feature_title3'],
        'feature_title4'       => $request->getPost('feature_title4') ?? $stat['feature_title4'],
        'feature_title5'       => $request->getPost('feature_title5') ?? $stat['feature_title5'],

        'feature_description1' => $request->getPost('feature_description1') ?? $stat['feature_description1'],
        'feature_description2' => $request->getPost('feature_description2') ?? $stat['feature_description2'],
        'feature_description3' => $request->getPost('feature_description3') ?? $stat['feature_description3'],
        'feature_description4' => $request->getPost('feature_description4') ?? $stat['feature_description4'],
        'feature_description5' => $request->getPost('feature_description5') ?? $stat['feature_description5'],

        'feature_image1'       => $featureImages[1],
        'feature_image2'       => $featureImages[2],
        'feature_image3'       => $featureImages[3],
        'feature_image4'       => $featureImages[4],
        'feature_image5'       => $featureImages[5],

        'status'               => $status,
        'update_audit_id'      => $updateAuditId,
        'update_audit_time'    => date('Y-m-d H:i:s')
    ];

    $this->model->updateStat($id, $updateData);

    return $this->respond([
        'status'  => 200,
        'message' => 'Home stat updated successfully',
        'data'    => [
            'id'    => $id,
            'image' => $imageName
        ]
    ]);
}


    /**
     * PATCH /api/home-stats/{id}/status
     */
    public function updateStatus($id = null)
    {
        $stat = $this->model->getById($id);
        if (!$stat) {
            return $this->failNotFound('Stat not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data) {
            return $this->failValidationErrors('Invalid JSON input');
        }

        $status = $data['status'] ?? null;
        $userId = $data['update_audit_id'] ?? null;

        if (!$status || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('Invalid status value');
        }

        if (!$userId) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        // ✅ Model handles DB query
        $this->model->updateStatus($id, $status, $userId);

        return $this->respond([
            'status'  => 200,
            'message' => 'Home stat status updated successfully',
            'data'    => [
                'id'     => $id,
                'status' => $status
            ]
        ]);
    }

    /**
     * DELETE /api/home-stats/{id}
     */
    public function delete($id = null)
    {
        $stat = $this->model->getById($id);
        if (!$stat) {
            return $this->failNotFound('Stat not found');
        }

        $data = $this->request->getJSON(true);
        if (!$data || !isset($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDeleteStat($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status'  => 200,
            'message' => 'Home stat deleted successfully'
        ]);
    }

}
