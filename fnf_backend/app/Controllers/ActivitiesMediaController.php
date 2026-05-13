<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ActivitiesMediaModel;
use App\Models\ActivityGalleryModel;
use App\Models\ActivityVideosModel;
use App\Models\ActivityTypeModel;
use Config\Database; // ✅ ADD THIS LINE

use App\Libraries\R2Upload;

class ActivitiesMediaController extends ResourceController
{
    protected $model;
    protected $galleryModel;
    protected $videosModel;
    protected $db;

    public function __construct()
    {
        $this->model                = new ActivitiesMediaModel();
        $this->galleryModel         = new ActivityGalleryModel();
        $this->videosModel          = new ActivityVideosModel();
        $this->ActivityTypeModel    = new ActivityTypeModel();
        $this->db = Database::connect();
    }

    // GET /activities
    public function index()
    {
        $activities = $this->model->getAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Activities fetched successfully',
            'data'    => $activities
        ]);
    }
    
    // GET /activities
    public function get()
    {
        $activities = $this->model->getClinetAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Activities fetched successfully',
            'data'    => $activities
        ]);
    }

    // GET /activities/{id}
    public function show($id = null)
    {
        if (!$id) {
            return $this->failValidationErrors('Activity ID is required');
        }

        $activity = $this->model->getById($id);
        if (!$activity) {
            return $this->failNotFound('Activity not found');
        }

        // // Attach gallery images
        // $gallery = $this->galleryModel->getByActivity($id);
        // $activity['gallery'] = $gallery ?? [];

        // // Attach videos
        // $videos = $this->videosModel->getByActivity($id);
        // $activity['videos'] = $videos ?? [];

        return $this->respond([
            'status'  => 200,
            'message' => 'Activity details fetched successfully',
            'data'    => $activity
        ]);
    }


    // POST /activities
    public function create()
    {
        $activity_type_id = $this->request->getPost('activity_type_id');
        $status           = $this->request->getPost('status') ?? 'Active';
        $auditId          = $this->request->getPost('create_audit_id');

        if (!$activity_type_id || !$auditId || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('activity_type_id, status, create_audit_id are required');
        }

        // Upload main & landing images
        $mainImage    = $this->uploadImage('main_image');
        $landingImage = $this->uploadImage('landing_image');

        /* -------------------------
        GALLERY (JSON)
        --------------------------*/
        $galleryImages = [];
        $galleryFiles = $this->request->getFiles()['gallery'] ?? [];
        foreach ($galleryFiles as $file) {
            $imageName = $this->uploadFileToR2($file);
            if ($imageName) $galleryImages[] = $imageName;
        }

        /* -------------------------
        VIDEOS (JSON) + video_label
        --------------------------*/
        $videos = [];
        $videoFiles  = $this->request->getFiles()['videos'] ?? [];
        $videoLabels = $this->request->getPost('video_labels') ?? '[]';

        // Decode only if string
        if (is_string($videoLabels)) {
            $videoLabels = json_decode($videoLabels, true) ?? [];
        }
        if (!is_array($videoLabels)) {
            $videoLabels = [];
        }

        $firstVideoLabel = null;

        foreach ($videoFiles as $index => $file) {
            $videoName = $this->uploadFileToR2($file);
            $label     = $videoLabels[$index] ?? '';

            if ($videoName) {
                $videos[] = [
                    'video' => $videoName,
                    'label' => $label
                ];

                // Store first video label separately
                if ($firstVideoLabel === null) $firstVideoLabel = $label;
            }
        }
        
        /* -------------------------
        LINKS (JSON)
        --------------------------*/
        $links = $this->request->getPost('links') ?? '[]';
        
        // Decode only if string
        if (is_string($links)) {
            $links = json_decode($links, true) ?? [];
        }
        if (!is_array($links)) {
            $links = [];
        }
        
        // ✅ FIX: handle double encoded case
        if (count($links) === 1 && is_string($links[0])) {
            $decodedInner = json_decode($links[0], true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decodedInner)) {
                $links = $decodedInner;
            }
        }

        /* -------------------------
        INSERT INTO DB
        JSON encode arrays before saving
        --------------------------*/
        $activityData = [
            'activity_type_id'  => $activity_type_id,
            'status'            => $status,
            'main_image'        => $mainImage,
            'landing_image'     => $landingImage,
            'gallery_images'    => !empty($galleryImages) ? json_encode($galleryImages) : null,
            'videos'            => !empty($videos) ? json_encode($videos) : null,
            'video_label'       => $firstVideoLabel,
            'links'             => !empty($links) ? json_encode($links) : null,
            'create_audit_id'   => $auditId,
            'create_audit_time' => date('Y-m-d H:i:s')
        ];

        $activityId = $this->model->insert($activityData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Activity created successfully',
            'data'    => ['id' => $activityId]
        ]);
    }

    // PUT /activities/{id}
   public function update($id = null)
{
    $activity = $this->model->find($id);
    if (!$activity) {
        return $this->failNotFound('Activity not found');
    }

    $auditId = $this->request->getPost('update_audit_id');
    if (!$auditId) {
        return $this->failValidationErrors('update_audit_id is required');
    }

    /* -------------------------
       BASIC FIELDS
    --------------------------*/
    $activity_type_id = $this->request->getPost('activity_type_id');
    $activity_type_id = $activity_type_id !== null
        ? (int)$activity_type_id
        : (int)$activity['activity_type_id'];

    $status = $this->request->getPost('status') ?? $activity['status'];

    $mainImage    = $this->uploadImage('main_image') ?? $activity['main_image'];
    $landingImage = $this->uploadImage('landing_image') ?? $activity['landing_image'];

    $allFiles = $this->request->getFiles();

    /* -------------------------
       GALLERY (SAFE)
    --------------------------*/
    $existingGallery = $activity['gallery_images']
        ? json_decode($activity['gallery_images'], true)
        : [];

    if (!is_array($existingGallery)) $existingGallery = [];

    $keepGallery = $this->request->getPost('keep_gallery');

    $galleryImages = $existingGallery; // ✅ default keep old

    if ($keepGallery !== null) {
        $decoded = json_decode($keepGallery, true);
        if (is_array($decoded)) {
            $galleryImages = $decoded;
        }

        // Add new uploads
        if (isset($allFiles['gallery'])) {
            $files = $allFiles['gallery'];
            if (!is_array($files)) $files = [$files];

            foreach ($files as $file) {
                if ($file && $file->isValid() && !$file->hasMoved()) {
                    $imageName = $this->uploadFileToR2($file);
                    if ($imageName) $galleryImages[] = $imageName;
                }
            }
        }

        $galleryImages = array_values(array_unique($galleryImages));
    }

    /* -------------------------
       VIDEOS (SAFE)
    --------------------------*/
    $existingVideos = $activity['videos']
        ? json_decode($activity['videos'], true)
        : [];

    if (!is_array($existingVideos)) $existingVideos = [];

    $videos = $existingVideos; // ✅ default keep old

    if ($this->request->getPost('videos_data') !== null) {

        $videosData = $this->request->getPost('videos_data');

        if (is_string($videosData)) {
            $videosData = json_decode($videosData, true) ?? [];
        }

        $videos = [];

        $videoFiles  = $allFiles['videos'] ?? [];
        $videoLabels = $this->request->getPost('video_labels') ?? [];

        if (is_string($videoLabels)) {
            $videoLabels = json_decode($videoLabels, true) ?? [];
        }

        if (!is_array($videoLabels)) $videoLabels = [];

        // Prepare videos array
        foreach ($videosData as $index => $vid) {
            $videos[] = [
                'video' => $vid['video'],
                'label' => $vid['label'] ?? ($videoLabels[$index] ?? '')
            ];
        }

        // Upload new files
        if (!empty($videoFiles)) {
            if (!is_array($videoFiles)) $videoFiles = [$videoFiles];

            foreach ($videoFiles as $index => $file) {
                if ($file && $file->isValid() && !$file->hasMoved()) {
                    $videoName = $this->uploadFileToR2($file);
                    if ($videoName) {
                        $videos[$index]['video'] = $videoName;
                    }
                }
            }
        }
    }

    /* -------------------------
       VIDEO LABEL
    --------------------------*/
    $videoLabels = $this->request->getPost('video_labels');

    if (is_string($videoLabels)) {
        $videoLabels = json_decode($videoLabels, true) ?? [];
    }

    if (!is_array($videoLabels)) {
        $videoLabels = [];
    }

    $firstVideoLabel = $videoLabels[0] ?? null;

    /* -------------------------
       LINKS
    --------------------------*/
    $links = [];

    $newLinks = $this->request->getPost('links');

    if ($newLinks !== null) {
        if (is_string($newLinks)) {
            $newLinks = json_decode($newLinks, true) ?? [];
        }

        if (is_array($newLinks)) {
            $links = $newLinks;
        }
    }

    /* -------------------------
       PREPARE UPDATE DATA
    --------------------------*/
    $updateData = [
        'activity_type_id' => $activity_type_id,
        'status'           => $status,
        'main_image'       => $mainImage,
        'landing_image'    => $landingImage,
        'video_label'      => $firstVideoLabel,
        'links'            => !empty($links) ? json_encode($links) : null,
        'update_audit_id'  => $auditId,
        'update_audit_time'=> date('Y-m-d H:i:s'),
    ];

    // ✅ Only update if sent
    if ($keepGallery !== null) {
        $updateData['gallery_images'] = !empty($galleryImages)
            ? json_encode($galleryImages)
            : null;
    }

    if ($this->request->getPost('videos_data') !== null) {
        $updateData['videos'] = !empty($videos)
            ? json_encode($videos)
            : null;
    }

    /* -------------------------
       UPDATE QUERY
    --------------------------*/
    $update = $this->db->table($this->model->getTable())
        ->where('id', $id)
        ->update($updateData);

    if (!$update) {
        return $this->fail('Failed to update activity');
    }

    return $this->respond([
        'status'  => 200,
        'message' => 'Activity updated successfully',
        'data'    => ['id' => $id]
    ]);
}




    // PATCH update status (JSON)
    public function updateStatus($id = null)
    {
        $activity = $this->model->getById($id);
        if (!$activity) return $this->failNotFound('Activity not found');

        $data = $this->request->getJSON(true);
        $status  = $data['status'] ?? null;
        $auditId = $data['update_audit_id'] ?? null;

        if (!$status || !$auditId || !in_array($status, ['Active','Inactive'])) {
            return $this->failValidationErrors('status and update_audit_id are required');
        }

        $this->model->updateStatus($id, $status, $auditId);

        return $this->respond([
            'status'  => 200,
            'message' => 'Activity status updated successfully',
            'data'    => ['id' => $id, 'status' => $status]
        ]);
    }

    // DELETE /activities/{id} (soft delete)
    public function delete($id = null)
{
    $activity = $this->model->find($id);
    if (!$activity) {
        return $this->failNotFound('Activity not found');
    }

    // Get JSON input
    $json = $this->request->getJSON(true); // true = returns as array
    $auditId = $json['delete_audit_id'] ?? null;

    if (!$auditId) {
        return $this->failValidationErrors('delete_audit_id is required');
    }

    $timestamp = date('Y-m-d H:i:s');

    // Soft delete main activity
    $this->db->table($this->model->getTable())
             ->where('id', $id)
             ->update([
                 'delete_audit_id'   => $auditId,
                 'delete_audit_time' => $timestamp
             ]);

    // // Soft delete gallery images (Query Builder to avoid CI4 DataException)
    // $this->db->table($this->galleryModel->getTable())
    //          ->where('activity_id', $id)
    //          ->update([
    //              'delete_audit_id'   => $auditId,
    //              'delete_audit_time' => $timestamp
    //          ]);

    // // Soft delete videos
    // $this->db->table($this->videosModel->getTable())
    //          ->where('activity_id', $id)
    //          ->update([
    //              'delete_audit_id'   => $auditId,
    //              'delete_audit_time' => $timestamp
    //          ]);

    return $this->respondDeleted([
        'status'  => 200,
        'message' => 'Activity deleted successfully'
    ]);
}


    // Helper function for uploading images
    private function uploadImage($fieldName)
    {
        $file = $this->request->getFile($fieldName);
        return $this->uploadFileToR2($file);
    }

    private function uploadFileToR2($file)
    {
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $objectKey = uniqid() . '.' . $file->getExtension();
            $r2 = new R2Upload();
            $r2->upload($file->getTempName(), 'FNF/' . $objectKey);
            return $objectKey;
        }
        return null;
    }
}
