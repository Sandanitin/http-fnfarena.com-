<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\EventsMetricsModel;

class EventsMetricsController extends ResourceController
{
    protected $eventsMetricsModel;

    public function __construct()
    {
        $this->eventsMetricsModel = new EventsMetricsModel();
    }

    /* =========================
       CREATE
    ========================= */
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (
            empty($data['event_id']) ||
            empty($data['create_audit_id'])
        ) {
            return $this->failValidationErrors('event_id and create_audit_id are required');
        }

        // Prevent duplicate metrics for same event
        // if ($this->eventsMetricsModel->checkEventMetricsExists($data['event_id'])) {
        //     return $this->fail('Metrics already exist for this event');
        // }

        $insertData = [
            'event_id' => $data['event_id'],

            'attendance_rate'          => $data['attendance_rate'],
            'attendance_rate_suffix'   => $data['attendance_rate_suffix'],

            'satisfaction_score'       => $data['satisfaction_score'],
            'satisfaction_score_suffix'=> $data['satisfaction_score_suffix'],

            'occasions'                => $data['occasions'],
            'occasions_suffix'         => $data['occasions_suffix'],

            'repeat_bookings'          => $data['repeat_bookings'],
            'repeat_bookings_suffix'   => $data['repeat_bookings_suffix'],

            'status' => $data['status'] ?? 'active',

            'create_audit_id'   => $data['create_audit_id'],
            'create_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->eventsMetricsModel->insertMetrics($insertData);

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Event metrics created successfully'
        ]);
    }

    /* =========================
       LIST
    ========================= */
    public function index()
    {
        return $this->respond([
            'status' => 200,
            'data'   => $this->eventsMetricsModel->getAllMetrics()
        ]);
    }


    public function get()
    {
        return $this->respond([
            'status' => 200,
            'data'   => $this->eventsMetricsModel->getClientAllMetrics()
        ]);
    }

    /* =========================
       GET BY ID
    ========================= */
    public function show($id = null)
    {
        $metrics = $this->eventsMetricsModel->getMetricsById($id);

        if (!$metrics) {
            return $this->failNotFound('Event metrics not found');
        }

        return $this->respond([
            'status' => 200,
            'data'   => $metrics
        ]);
    }

    /* =========================
       UPDATE
    ========================= */
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        if (!$this->eventsMetricsModel->getMetricsById($id)) {
            return $this->failNotFound('Event metrics not found');
        }

        $updateData = [
            'attendance_rate'           => $data['attendance_rate'],
            'attendance_rate_suffix'    => $data['attendance_rate_suffix'],

            'satisfaction_score'        => $data['satisfaction_score'],
            'satisfaction_score_suffix' => $data['satisfaction_score_suffix'],

            'occasions'                 => $data['occasions'],
            'occasions_suffix'          => $data['occasions_suffix'],

            'repeat_bookings'           => $data['repeat_bookings'],
            'repeat_bookings_suffix'    => $data['repeat_bookings_suffix'],

            'status' => $data['status'],

            'update_audit_id'   => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ];

        $this->eventsMetricsModel->updateMetrics($id, $updateData);

        return $this->respond([
            'status'  => 200,
            'message' => 'Event metrics updated successfully'
        ]);
    }

    /* =========================
       SOFT DELETE
    ========================= */
    public function delete($id = null)
    {
        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        if (!$this->eventsMetricsModel->getMetricsById($id)) {
            return $this->failNotFound('Event metrics not found');
        }

        $this->eventsMetricsModel->softDeleteMetrics($id, $data['delete_audit_id']);

        return $this->respond([
            'status'  => 200,
            'message' => 'Event metrics deleted successfully'
        ]);
    }

    /* =========================
       STATUS UPDATE (PATCH)
    ========================= */
    public function updateStatus($id = null)
    {
        $data = $this->request->getJSON(true);

        if (
            empty($data['status']) ||
            empty($data['update_audit_id'])
        ) {
            return $this->failValidationErrors('status and update_audit_id are required');
        }

        if (!$this->eventsMetricsModel->getMetricsById($id)) {
            return $this->failNotFound('Event metrics not found');
        }

        $this->eventsMetricsModel->toggleStatus(
            $id,
            $data['status'],
            $data['update_audit_id']
        );

        return $this->respond([
            'status'  => 200,
            'message' => 'Status updated successfully'
        ]);
    }
}
