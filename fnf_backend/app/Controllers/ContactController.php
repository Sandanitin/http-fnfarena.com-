<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ContactModel;
use Config\Database;


class ContactController extends ResourceController
{
    protected $modelName = ContactModel::class;
    protected $format    = 'json';
    
    protected $model;

    public function __construct()
    {
        $this->model = new ContactModel();
    }
    
    public function send()
    {
        $data = $this->request->getJSON(true);
    
        // Validation
        if (
            empty($data['name']) ||
            empty($data['email']) ||
            empty($data['message'])
        ) {
            return $this->response->setJSON([
                'status'  => 'error',
                'message' => 'All fields are required'
            ])->setStatusCode(400);
        }
    
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->response->setJSON([
                'status'  => 'error',
                'message' => 'Invalid email address'
            ])->setStatusCode(400);
        }
    
        $email = \Config\Services::email();
    
        $emailConfig = config('Email');
        $email->setFrom($emailConfig->fromEmail, 'Website Contact (' . $data['name'] . ')');
    
        // Admin / Client email
        $email->setTo('sudhakarbv144@gmail.com');
    
        // User email goes to Reply-To
        $email->setReplyTo($data['email'], $data['name']);
    
        $email->setSubject('New Contact Message');
    
        $email->setMessage("
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> {$data['name']}</p>
            <p><strong>Email:</strong> {$data['email']}</p>
            <p><strong>Message:</strong></p>
            <p>{$data['message']}</p>
        ");
    
        if ($email->send()) {
            return $this->response->setJSON([
                'status'  => 'success',
                'message' => 'Message sent successfully'
            ]);
        } else {
            // Debugging
            return $this->response->setJSON([
                'status'  => 'error',
                'message' => 'Email failed',
                'debug'   => $email->printDebugger(['headers'])
            ])->setStatusCode(500);
        }
    }
    
    
    /* ─────────────────────────
     GET CONTACT (SINGLE)
    ───────────────────────── */
    public function index()
    {
        $contact = $this->model->getContact();

        if (!$contact) {
            return $this->failNotFound('Contact not found');
        }

        return $this->respond([
            'status' => 200,
            'data'   => $contact
        ]);
    }

    /* ─────────────────────────
     UPDATE CONTACT
    ───────────────────────── */
    public function create()
{
    
    $db = \Config\Database::connect();
    $data = $this->request->getJSON(true);

    if (empty($data['update_audit_id'])) {
        return $this->failValidationErrors('update_audit_id is required');
    }

    $contact = $db->table('contact')
        ->get()
        ->getRowArray();

    if (!$contact) {
        return $this->failNotFound('Contact not found');
    }

    $updateData = [
        'phone'              => $data['phone']      ?? $contact['phone'],
        'phone2'             => $data['phone2']     ?? $contact['phone2'],
        'email'              => $data['email']      ?? $contact['email'],
        'email2'             => $data['email2']     ?? $contact['email2'],
        'instagram'          => $data['instagram']  ?? $contact['instagram'],
        'facebook'           => $data['facebook']   ?? $contact['facebook'],
        'youtube'            => $data['youtube']    ?? $contact['youtube'],
        'linkedin'            => $data['linkedin']    ?? $contact['linkedin'],
        'address'            => $data['address']    ?? $contact['address'],
        'map'                => $data['map']        ?? $contact['map'],
        'status'             => $data['status']     ?? $contact['status'],
        'update_audit_id'    => $data['update_audit_id'],
        'update_audit_time'  => date('Y-m-d H:i:s'),
    ];

    $db->table('contact')
        ->where('id', $contact['id'])
        ->update($updateData);

    return $this->respond([
        'status'  => 200,
        'message' => 'Contact updated successfully'
    ]);
}



}
