<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityGalleryModel extends Model
{
    protected $table      = 'activity_gallery';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'activity_id',
        'image',        
        'create_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    // Add gallery images
    public function createImages(array $images)
    {
        foreach ($images as $img) {
            $img['create_audit_time'] = date('Y-m-d H:i:s');
            $this->insert($img);
        }
    }

    // Get gallery by activity
    public function getByActivity($activityId)
    {
        return $this->where('activity_id', $activityId)
                    ->findAll();
    }

    // Soft delete gallery images by activity
    public function softDeleteByActivity($activityId, $auditId)
{
    return $this->db->table($this->table)
        ->where('activity_id', $activityId)
        ->update([
            'delete_audit_id'   => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
}

}
