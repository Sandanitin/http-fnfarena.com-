<?php

namespace App\Models;

use CodeIgniter\Model;

class ContactModel extends Model
{
    protected $table      = 'contact';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'phone',
        'phone2',
        'email',
        'email2',
        'instagram',
        'facebook',
        'youtube',
        'linkedin',
        'address',
        'map',
        'status',
        'create_audit_id',
        'create_audit_time',
        'update_audit_id',
        'update_audit_time',
        'delete_audit_id',
        'delete_audit_time'
    ];

    /* Get active contact (single row use-case) */
    public function getContact()
    {
        return $this->where('delete_audit_id IS NULL', null, false)
                    ->orderBy('id', 'DESC')
                    ->first();
    }

    public function updateContact($id, $data)
    {
        $data['update_audit_time'] = date('Y-m-d H:i:s');
        return $this->update($id, $data);
    }
}
