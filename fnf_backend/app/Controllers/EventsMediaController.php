<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\EventsMediaModel;
use App\Models\EventsGalleryModel;
use App\Models\EventsVideosModel;
use App\Models\EventTypeModel;
use Config\Database;

use App\Libraries\R2Upload;

class EventsMediaController extends ResourceController
{
    protected $model;
    protected $galleryModel;
    protected $videosModel;
    protected $db;

    public function __construct()
    {
        $this->model                = new EventsMediaModel();
        $this->galleryModel         = new EventsGalleryModel();
        $this->videosModel          = new EventsVideosModel();
        $this->EventTypeModel    = new EventTypeModel();
        $this->db = Database::connect();
    }

    // GET /Events
    public function index()
    {
        $Events = $this->model->getAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Events fetched successfully',
            'data'    => $Events
        ]);
    }
    
    public function get()
    {
        $Events = $this->model->getClientAll();
        return $this->respond([
            'status'  => 200,
            'message' => 'Events fetched successfully',
            'data'    => $Events
        ]);
    }

    // GET /Events/{id}
    public function show($id = null)
    {
        if (!$id) {
            return $this->failValidationErrors('Events ID is required');
        }

        $Events = $this->model->getById($id);
        if (!$Events) {
            return $this->failNotFound('Events not found');
        }

        $Events = $this->model->getById($id);

        // // Attach gallery images
        // $gallery = $this->galleryModel->getByEvents($id);
        // $Events['gallery'] = $gallery ?? [];

        // // Attach videos
        // $videos = $this->videosModel->getByEvents($id);
        // $Events['videos'] = $videos ?? [];

        return $this->respond([
            'status'  => 200,
            'message' => 'Events details fetched successfully',
            'data'    => $Events
        ]);
    }


    // POST /Events
    public function create()
    {
        $event_id = $this->request->getPost('event_id');
        $status   = $this->request->getPost('status') ?? 'Active';
        $auditId  = $this->request->getPost('create_audit_id');

        if (!$event_id || !$auditId || !in_array($status, ['Active', 'Inactive'])) {
            return $this->failValidationErrors('event_id, status, create_audit_id are required');
        }

        /* -------------------------
        MAIN & LANDING IMAGES
        --------------------------*/
        $mainImage    = $this->uploadImage('main_image');
        $landingImage = $this->uploadImage('landing_image');

        /* -------------------------
        GALLERY (JSON)
        --------------------------*/
        $galleryImages = [];
        $galleryFiles = $this->request->getFiles()['gallery'] ?? [];

        foreach ($galleryFiles as $file) {
            $imageName = $this->uploadFileToR2($file);
            if ($imageName) {
                $galleryImages[] = $imageName;
            }
        }

        /* -------------------------
        VIDEOS (JSON) + video_label
        --------------------------*/
        $videos = [];
        $videoFiles  = $this->request->getFiles()['videos'] ?? [];
        $videoLabels = $this->request->getPost('video_labels') ?? '[]';

        // Decode labels if JSON string
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
                if ($firstVideoLabel === null) {
                    $firstVideoLabel = $label;
                }
            }
        }

        /* -------------------------
        INSERT INTO DB
        --------------------------*/
        $activityData = [
            'event_id'          => $event_id,
            'status'            => $status,
            'main_image'        => $mainImage,
            'landing_image'     => $landingImage,
            'gallery_images'    => !empty($galleryImages) ? json_encode($galleryImages) : null,
            'videos'            => !empty($videos) ? json_encode($videos) : null,
            'video_label'       => $firstVideoLabel,
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

    // PUT /Events/{id}
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
        $event_id = $this->request->getPost('event_id');
        $event_id = $event_id !== null
            ? (int) $event_id
            : (int) $activity['event_id'];

        $status = $this->request->getPost('status') ?? $activity['status'];

        $mainImage    = $this->uploadImage('main_image') ?? $activity['main_image'];
        $landingImage = $this->uploadImage('landing_image') ?? $activity['landing_image'];

       /* -------------------------
GALLERY (SMART UPDATE)
--------------------------*/

// Old images from DB
$oldGallery = $activity['gallery_images']
    ? json_decode($activity['gallery_images'], true)
    : [];

// Images frontend wants to keep
$keepGallery = $this->request->getPost('keep_gallery');

if ($keepGallery) {
    $keepGallery = json_decode($keepGallery, true) ?? [];
} else {
    $keepGallery = [];
}

// Start with only kept images
$galleryImages = [];

foreach ($oldGallery as $img) {
    if (in_array($img, $keepGallery)) {
        $galleryImages[] = $img;
    }
    // OPTIONAL: delete from R2 if not kept
    // else {
    //     $this->deleteFileFromR2($img);
    // }
}

// Append new uploaded images
$galleryFiles = $this->request->getFiles()['gallery'] ?? [];

foreach ($galleryFiles as $file) {
    $imageName = $this->uploadFileToR2($file);
    if ($imageName) {
        $galleryImages[] = $imageName;
    }
}


        /* -------------------------
        VIDEOS (JSON – APPEND)
        --------------------------*/
        $videos = $activity['videos']
            ? json_decode($activity['videos'], true)
            : [];

        $videoFiles  = $this->request->getFiles()['videos'] ?? [];
        $videoLabels = $this->request->getPost('video_labels') ?? '[]';

        if (is_string($videoLabels)) {
            $videoLabels = json_decode($videoLabels, true) ?? [];
        }
        if (!is_array($videoLabels)) {
            $videoLabels = [];
        }

        $firstVideoLabel = $activity['video_label'];

        foreach ($videoFiles as $index => $file) {
            $videoName = $this->uploadFileToR2($file);
            $label     = $videoLabels[$index] ?? '';

            if ($videoName) {
                $videos[] = [
                    'video' => $videoName,
                    'label' => $label
                ];

                if (!$firstVideoLabel) {
                    $firstVideoLabel = $label;
                }
            }
        }

        /* -------------------------
        UPDATE DATA
        --------------------------*/
        $updateData = [
            'event_id'        => $event_id,
            'status'          => $status,
            'main_image'      => $mainImage,
            'landing_image'   => $landingImage,
            'gallery_images'  => $galleryImages ? json_encode($galleryImages) : null,
            'videos'          => $videos ? json_encode($videos) : null,
            'video_label'     => $firstVideoLabel,
        ];

        /* -------------------------
        CHANGE DETECTION
        --------------------------*/
        $hasChanges = false;

        foreach ($updateData as $key => $newValue) {
            $oldValue = $activity[$key] ?? null;

            if (in_array($key, ['gallery_images', 'videos'])) {
                $oldDecoded = $oldValue ? json_decode($oldValue, true) : null;
                $newDecoded = $newValue ? json_decode($newValue, true) : null;

                if ($oldDecoded !== $newDecoded) {
                    $hasChanges = true;
                    break;
                }
            } else {
                if ((string) $oldValue !== (string) $newValue) {
                    $hasChanges = true;
                    break;
                }
            }
        }

        /* -------------------------
        UPDATE DB
        --------------------------*/
        if ($hasChanges) {
            $updateData['update_audit_id']   = $auditId;
            $updateData['update_audit_time'] = date('Y-m-d H:i:s');

            $this->db->table($this->model->getTable())
                    ->where('id', $id)
                    ->update($updateData);
        }

        return $this->respond([
            'status'  => 200,
            'message' => $hasChanges
                ? 'Activity updated successfully'
                : 'No changes detected, activity already up to date',
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

    // DELETE /Events/{id} (soft delete)
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

    // Soft delete gallery images (Query Builder to avoid CI4 DataException)
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
