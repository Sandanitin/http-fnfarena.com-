<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class DashboardController extends ResourceController
{
    protected $db;

    public function __construct()
    {
        $this->db = \Config\Database::connect();
    }

    public function index()
    {
        $db = $this->db;
    
        // 1️⃣ Booking counts
        $birthday_bookings = $db->table('birthday_bookings')
            ->where('delete_audit_time', null)
            ->countAllResults();
    
        $corporate_bookings = $db->table('corporate_bookings')
            ->where('delete_audit_time', null)
            ->countAllResults();
    
        $bookings = $db->table('bookings')
            ->where('delete_audit_time', null)
            ->countAllResults();
    
        $plan_bookings = $db->table('plan_bookings')
            ->where('delete_audit_time', null)
            ->countAllResults();
    
        // 2️⃣ Fetch recent bookings with unified fields
        $birthday = $db->table('birthday_bookings')
            ->select('customer_name as customer, "Birthday Party" as activity, status, create_audit_time')
            ->where('delete_audit_time', null)
            ->orderBy('create_audit_time', 'DESC')
            ->get()
            ->getResultArray();
    
        $corporate = $db->table('corporate_bookings')
            ->select('company_name as customer, "Corporate Event" as activity, status, create_audit_time')
            ->where('delete_audit_time', null)
            ->orderBy('create_audit_time', 'DESC')
            ->get()
            ->getResultArray();
    
        $generic = $db->table('bookings')
            ->select('user_name as customer, "Generic Booking" as activity, status, create_audit_time')
            ->where('delete_audit_time', null)
            ->orderBy('create_audit_time', 'DESC')
            ->get()
            ->getResultArray();
    
        $plan = $db->table('plan_bookings')
            ->select('full_name as customer, "Plan Booking" as activity, status, create_audit_time')
            ->where('delete_audit_time', null)
            ->orderBy('create_audit_time', 'DESC')
            ->get()
            ->getResultArray();
    
        // 3️⃣ Merge all bookings
        $allBookings = array_merge($birthday, $corporate, $generic, $plan);
    
        // 4️⃣ Sort by create_audit_time DESC (recent first)
        usort($allBookings, function ($a, $b) {
            return strtotime($b['create_audit_time']) <=> strtotime($a['create_audit_time']);
        });
    
        // 5️⃣ Limit to latest 10 bookings
        $recentBookings = $allBookings;
        
        $activityTypesQuery = $db->table('activity_types')
        ->select('id, name')
        ->where('delete_audit_id', null)
        ->orderBy('name', 'ASC')
        ->get()
        ->getResultArray();
        
         // Format activity types into simple array
        $activity_types = [];
        foreach ($activityTypesQuery as $type) {
            $activity_types[] = [
                'id'   => $type['id'],
                'name' => $type['name']
            ];
        }
    
        // 6️⃣ Respond with counts and recent bookings
        return $this->respond([
            'status' => 200,
            'data' => [
                'cards' => [
                    'birthday_bookings'  => $birthday_bookings,
                    'corporate_bookings' => $corporate_bookings,
                    'all_bookings'       => $bookings,
                    'plan_bookings'      => $plan_bookings,
                ],
                'recent_bookings' => $recentBookings,
                'popular_activities'   => $activity_types
            ]
        ]);
    }

}
