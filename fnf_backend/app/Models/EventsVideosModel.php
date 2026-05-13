<?php

namespace App\Models;

use CodeIgniter\Model;

class EventsVideosModel extends Model
{
    protected $table      = 'event_videos';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'event_id',
        'video',
        'label',
        'create_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    // Add videos
    public function createVideos(array $videos)
    {
        foreach ($videos as $video) {
            $video['create_audit_time'] = date('Y-m-d H:i:s');
            $this->insert($video);
        }
    }

    // Get videos by activity
    public function getByActivity($activityId)
    {
        return $this->where('event_id', $activityId)
                    ->findAll();
    }

    // Soft delete videos by activity
    public function softDeleteByActivity($activityId, $auditId)
{
    return $this->db->table($this->table)
        ->where('event_id', $activityId)
        ->update([
            'delete_audit_id'   => $auditId,
            'delete_audit_time' => date('Y-m-d H:i:s')
        ]);
}

}
