<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\EmployeesModel;
use Firebase\JWT\JWT;

class EmployeesController extends ResourceController
{
    protected $model;
    private $jwtKey;
    protected $db;

    public function __construct()
    {
        $this->model = new EmployeesModel();
        $this->expiration = getenv('JWT_EXPIRATION');
        $this->jwtKey = getenv('JWT_SECRET'); // fallback
        $this->db = \Config\Database::connect();
        $this->email = \Config\Services::email();

    }

    /* ===========================
       GET ALL
    ============================ */
    public function index()
    {
        return $this->respond([
            'status' => 200,
            'data' => $this->model->getAll()
        ]);
    }

    /* ===========================
       GET BY ID
    ============================ */
    public function show($id = null)
    {
        $employee = $this->model->getById($id);

        if (!$employee) {
            return $this->failNotFound('Employee not found');
        }

        return $this->respond([
            'status' => 200,
            'data' => $employee
        ]);
    }

    /* ===========================
       CREATE
    ============================ */
    public function create()
    {
        $data = $this->request->getJSON(true);

        if (
            empty($data['name']) ||
            empty($data['email']) ||
            empty($data['mobile']) ||
            empty($data['password']) ||
            empty($data['create_audit_id'])
        ) {
            return $this->failValidationErrors(
                'name, email, mobile, password, create_audit_id are required'
            );
        }

        $id = $this->model->createData($data);

        return $this->respondCreated([
            'status' => 201,
            'message' => 'Employee created successfully',
            'data' => ['id' => $id]
        ]);
    }

    /* ===========================
       UPDATE FULL DATA
    ============================ */
    public function update($id = null)
    {
        if (!$this->model->getById($id)) {
            return $this->failNotFound('Employee not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id is required');
        }

        $this->model->updateData($id, $data);

        return $this->respond([
            'status' => 200,
            'message' => 'Employee updated successfully'
        ]);
    }

    /* ===========================
       UPDATE STATUS ONLY
    ============================ */
    public function updateStatus($id = null)
    {
        if (!$this->model->getById($id)) {
            return $this->failNotFound('Employee not found');
        }

        $data = $this->request->getJSON(true);

        if (
            empty($data['status']) ||
            empty($data['update_audit_id'])
        ) {
            return $this->failValidationErrors(
                'status and update_audit_id are required'
            );
        }

        $this->model->updateStatus(
            $id,
            $data['status'],
            $data['update_audit_id']
        );

        return $this->respond([
            'status' => 200,
            'message' => 'Employee status updated successfully'
        ]);
    }

    /* ===========================
       SOFT DELETE
    ============================ */
    public function delete($id = null)
    {
        if (!$this->model->getById($id)) {
            return $this->failNotFound('Employee not found');
        }

        $data = $this->request->getJSON(true);

        if (empty($data['delete_audit_id'])) {
            return $this->failValidationErrors('delete_audit_id is required');
        }

        $this->model->softDelete($id, $data['delete_audit_id']);

        return $this->respondDeleted([
            'status' => 200,
            'message' => 'Employee deleted successfully'
        ]);
    }

    /**
     * POST: /api/employee/login
     */
    public function login()
    {
        $data = $this->request->getJSON(true);

        if (empty($data['email']) || empty($data['password'])) {
            return $this->failValidationErrors('email and password are required');
        }

        // email OR mobile supported
        $employee = $this->model->getByEmailOrMobile($data['email']);

        if (!$employee) {
            return $this->failUnauthorized('Invalid credentials');
        }

        if ($employee['status'] !== 'Active') {
            return $this->fail('Employee account is Inactive');
        }

        if (!password_verify($data['password'], $employee['password'])) {
            return $this->failUnauthorized('Invalid credentials');
        }

        // JWT Payload
        $payload = [
            'iss'   => base_url(),
            'iat'   => time(),
            'exp'   => time() + (int) $this->expiration, // e.g. 3600
            'uid'   => $employee['id'],
            'role'  => 'employee',
            'email' => $employee['email']
        ];

        $token = JWT::encode($payload, $this->jwtKey, 'HS256');

        return $this->respond([
            'status'  => 200,
            'message' => 'Login successful',
            'token'   => $token,
            'user' => [
                'id' => $employee['id'],
                'name' => $employee['name'],
                'email' => $employee['email']
            ]
        ]);
    }
    
    public function adminProfile($id = null)
    {
        // Fetch admin from users table
        $admin = $this->model
            ->select('*')
            ->where('id', $id)
            ->get()
            ->getRowArray();
    
        if (!$admin) {
            return $this->failNotFound('Admin not found');
        }
    
        return $this->respond([
            'status'  => 200,
            'message' => 'Admin profile fetched successfully',
            'data'    => $admin
        ]);
    }
    
    public function changePassword($id = null)
    {
        $data = $this->request->getJSON(true);
    
        $oldPassword = $data['old_password'] ?? null;
        $newPassword = $data['new_password'] ?? null;
        $confirm     = $data['confirm_password'] ?? null;
    
        if (!$oldPassword || !$newPassword || !$confirm) {
            return $this->failValidationErrors(
                'old_password, new_password, confirm_password are required'
            );
        }
    
        if ($newPassword !== $confirm) {
            return $this->failValidationErrors('New password and confirm password do not match');
        }
    
        if (strlen($newPassword) < 6) {
            return $this->failValidationErrors('Password must be at least 6 characters');
        }
    
        // Fetch admin
        $admin = $this->model
            ->where('id', $id)
            ->first();
    
        if (!$admin) {
            return $this->failNotFound('Admin not found');
        }
    
        // Verify old password
        if (!password_verify($oldPassword, $admin['password'])) {
            return $this->failUnauthorized('Old password is incorrect');
        }
    
        // Update password
        $this->model->update($admin['id'], [
            'password' => password_hash($newPassword, PASSWORD_BCRYPT),
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    
        return $this->respond([
            'status'  => 200,
            'message' => 'Password changed successfully'
        ]);
    }
    
    
    public function forgotPassword()
    {
        $data = $this->request->getJSON(true);

        if (empty($data['email'])) {
            return $this->failValidationErrors("Email is required");
        }

        $email = $data['email'];

        // Check if email exists
        $user = $this->db->table('employees')
            ->where('email', $email)
            ->get()
            ->getRowArray();

        if (!$user) {
            return $this->failNotFound("No user found with this email");
        }

        // Generate OTP + Secure Token
        $otp = rand(100000, 999999);
        $token = bin2hex(random_bytes(20));
        $expire = date('Y-m-d H:i:s', strtotime('+10 minutes'));

        // Delete previous OTP entries
        $this->db->table('password_resets')->where('email', $email)->delete();

        // Insert new record
        $this->db->table('password_resets')->insert([
            'email'      => $email,
            'otp'        => $otp,
            'token'      => $token,
            'expire_at'  => $expire,
            'created_at' => date('Y-m-d H:i:s')
        ]);

        // Send OTP via email
        $this->sendOtpMail($email, $otp);

        return $this->respond([
            'status'  => 200,
            'message' => 'OTP sent to email successfully',
            'token'   => $token
        ]);
    }

    public function verifyOtp()
    {
        $request = service('request');
        $data = $request->getJSON(true); // Get JSON as array

        $email = $data['email'] ?? null;
        $otp   = $data['otp'] ?? null;
        $token = $data['token'] ?? null;

        if (!$email || !$otp || !$token) {
            return $this->failValidationErrors("Email, OTP & Token are required");
        }

        $resetData = $this->db->table('password_resets')
            ->where('email', $email)
            ->where('otp', $otp)
            ->where('token', $token)
            ->get()
            ->getRowArray();

        if (!$resetData) {
            return $this->failNotFound("Invalid OTP or token");
        }

        // Check expiration
        if (strtotime($resetData['expire_at']) < time()) {
            return $this->fail("OTP expired", 400);
        }

        return $this->respond([
            'status' => 200,
            'message' => 'OTP verified successfully',
            'data' => [
                'email' => $email,
                'token' => $token
            ]
        ]);
    }

    public function resetPassword()
    {
        $data = $this->request->getJSON(true); // Get JSON input

        $email    = $data['email'] ?? null;
        $token    = $data['token'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$token || !$password) {
            return $this->failValidationErrors("Email, token & password required");
        }

        // Verify token
        $resetData = $this->db->table('password_resets')
            ->where('email', $email)
            ->where('token', $token)
            ->get()
            ->getRowArray();

        if (!$resetData) {
            return $this->failNotFound("Invalid token");
        }

        // Update password in users table
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $this->db->table('employees')
            ->where('email', $email)
            ->update([
                'password' => $hashedPassword
            ]);

        // Remove password reset entry
        $this->db->table('password_resets')
            ->where('email', $email)
            ->delete();

        return $this->respond([
            'status'  => 200,
            'message' => 'Password reset successfully'
        ]);
    }


    private function sendOtpMail($email, $otp)
    {
        $emailService = \Config\Services::email();
    
        // Fix SSL issues
        $emailService->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];
    
        $emailService->setFrom('noreply@acsprod.info', 'FNF');
        $emailService->setTo($email);
        $emailService->setSubject('Your OTP Code');
    
        $emailService->setMessage("
            <h3>Your OTP Code</h3>
            <p style='font-size:20px; font-weight:bold;'>$otp</p>
            <br><br>
            <p>OTP is valid for 10 minutes.</p>
        ");
    
        if ($emailService->send()) {
            return true;
        }
    
        // Show error in logs
        log_message('error', print_r($emailService->printDebugger(), true));
        return false;
    }

}
