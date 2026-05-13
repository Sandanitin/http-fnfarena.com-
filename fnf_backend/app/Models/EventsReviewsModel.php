<?php

namespace App\Models;

use CodeIgniter\Model;

class EventsReviewsModel extends Model
{
    protected $table      = 'events_reviews';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'event_id',
        'reviewer_name',
        'title_of_occasion',
        'place',
        'rating',
        'review_description',
        'reviewer_image',
        'occasion',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* ===========================
       GET ALL (JOIN EVENT MEDIA)
    ============================ */
   public function getAll()
{
    return $this->select('
        events_reviews.*,
        em.main_image,
        em.landing_image,
        et.name AS event_type_name
    ')
    ->join(
        'event_media em',
        'em.id = (SELECT id FROM event_media WHERE event_id = events_reviews.event_id AND delete_audit_time IS NULL ORDER BY id ASC LIMIT 1)',
        'left'
    )
    ->join(
        'event_types et',
        'et.id = em.event_id',
        'left'
    )
    ->where('events_reviews.delete_audit_time IS NULL', null, false)
    ->orderBy('events_reviews.id', 'DESC')
    ->findAll();
}

    
    public function getClientAll()
    {
        return $this->select('
        events_reviews.*,
        em.main_image,
        em.landing_image,
        et.name AS event_type_name
    ')
    ->join(
        'event_media em',
        'em.id = (SELECT id FROM event_media WHERE event_id = events_reviews.event_id AND delete_audit_time IS NULL ORDER BY id ASC LIMIT 1)',
        'left'
    )
    ->join(
        'event_types et',
        'et.id = em.event_id',
        'left'
    )
    ->where('events_reviews.status', 'Active')
    ->where('events_reviews.delete_audit_time IS NULL', null, false)
    ->orderBy('events_reviews.id', 'DESC')
    ->findAll();
    }

    /* ===========================
       GET BY ID
    ============================ */
    public function getById($id)
    {
        return $this->select('
                    events_reviews.*,
                    em.event_id,
                    em.main_image,
                    em.landing_image,
                    et.name AS event_type_name
                ')
                ->join(
                    'event_media em',
                    'em.id = events_reviews.event_id AND em.delete_audit_time IS NULL',
                    'left'
                )
                ->join(
                    'event_types et',
                    'et.id = em.event_id',
                    'left'
                )
                ->where('events_reviews.delete_audit_time IS NULL', null, false)
                ->where('events_reviews.id', $id)
                ->first();
    }

    /* ===========================
       CREATE
    ============================ */
    public function createData(array $data)
    {
        $data['create_audit_time'] = date('Y-m-d H:i:s');
        $this->insert($data);
        return $this->insertID();
    }

    /* ===========================
       UPDATE
    ============================ */
    public function updateData($id, array $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }

    /* ===========================
       UPDATE STATUS
    ============================ */
    public function updateStatus($id, $status, $auditId)
    {
        return $this->update($id, [
            'status'             => $status,
            'update_audit_id'    => $auditId,
            'update_audit_time'  => date('Y-m-d H:i:s')
        ]);
    }

    /* ===========================
       SOFT DELETE
    ============================ */
    public function softDelete($id, $auditId)
    {
        return $this->update($id, [
            'delete_audit_id'    => $auditId,
            'delete_audit_time'  => date('Y-m-d H:i:s')
        ]);
    }
}
