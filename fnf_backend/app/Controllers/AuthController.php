<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use CodeIgniter\Email\Email;

class AuthController extends ResourceController
{
    protected $format = 'json';
    protected $userModel;
    private $jwtKey;
    protected $db;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->jwtKey = getenv('JWT_SECRET'); // fallback
        $this->expiration = getenv('JWT_EXPIRATION') ?: 3600; // default 1 hour
        $this->db = \Config\Database::connect();
        $this->email = \Config\Services::email();
    }

    /**
     * Return an array of resource objects, themselves in array format.
     *
     * @return ResponseInterface
     */
    public function adminLogin()
    {
        $data = $this->request->getJSON(true); // <--- JSON input

        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // Fetch via model only
        $user = $this->userModel->getUserByEmail($email);

        if (!$user) {
            return $this->failNotFound('User not found.');
        }

        if ($user['role'] !== 'admin') {
            return $this->failForbidden('Access denied — admin only.');
        }

        if (!password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Invalid password.');
        }

        // JWT Payload
        $payload = [
            'iss' => base_url(),
            'iat' => time(),
            'exp' => time() + (int)$this->expiration,
            'uid' => $user['id'],
            'role' => $user['role'],
            'email' => $user['email']
        ];

        $token = JWT::encode($payload, $this->jwtKey, 'HS256');

        return $this->respond([
            'status' => 200,
            'message' => 'Admin login successful.',
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]
        ]);
    }
    
    public function adminProfile($id = null)
    {
        // Fetch admin from users table
        $admin = $this->userModel
            ->select('*')
            ->where('id', $id)
            ->where('role', 'admin')
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
    
    public function updateAdminProfile($id = null)
    {
        if (!$id) {
            return $this->failValidationErrors('Admin id is required');
        }
    
        // Check admin exists
        $admin = $this->userModel
            ->where('id', $id)
            ->where('role', 'admin')
            ->first();
    
        if (!$admin) {
            return $this->failNotFound('Admin not found');
        }
    
        $data = $this->request->getJSON(true);
    
        $updateData = [
            'name'  => $data['name']  ?? $admin['name'],
            'email' => $data['email'] ?? $admin['email'],
            'phone' => $data['phone'] ?? $admin['phone'],
            'update_audit_id' => $data['update_audit_id'],
            'update_audit_time' => date('Y-m-d H:i:s')
        ];
    
        // Optional password update
        // if (!empty($data['password'])) {
        //     if (strlen($data['password']) < 6) {
        //         return $this->failValidationErrors('Password must be at least 6 characters');
        //     }
        //     $updateData['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        // }
    
        $this->userModel->update($id, $updateData);
    
        return $this->respond([
            'status'  => 200,
            'message' => 'Admin profile updated successfully'
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
        $admin = $this->userModel
            ->where('id', $id)
            ->where('role', 'admin')
            ->first();
    
        if (!$admin) {
            return $this->failNotFound('Admin not found');
        }
    
        // Verify old password
        if (!password_verify($oldPassword, $admin['password'])) {
            return $this->failUnauthorized('Old password is incorrect');
        }
    
        // Update password
        $this->userModel->update($admin['id'], [
            'password' => password_hash($newPassword, PASSWORD_BCRYPT),
            'update_audit_time' => date('Y-m-d H:i:s')
        ]);
    
        return $this->respond([
            'status'  => 200,
            'message' => 'Password changed successfully'
        ]);
    }
    
    public function updateBusinessInfo($id = null)
    {
        $data = $this->request->getJSON(true);
    
        if (empty($data['update_audit_id'])) {
            return $this->failValidationErrors('update_audit_id are required');
        }
    
        // Check admin exists
        $admin = $this->userModel
            ->where('id', $id)
            ->where('role', 'admin')
            ->where('delete_audit_time', null)
            ->first();
    
        if (!$admin) {
            return $this->failNotFound('Admin not found');
        }
    
        $updateData = [
            'business_name'    => $data['business_name'] ?? $admin['business_name'],
            'location'         => $data['location'] ?? $admin['location'],
            'gst'              => $data['gst'] ?? $admin['gst'],
            'update_audit_id'  => $data['update_audit_id'],
            'update_audit_time'=> date('Y-m-d H:i:s')
        ];
    
        $this->userModel->update($id, $updateData);
    
        return $this->respond([
            'status'  => 200,
            'message' => 'Business info updated successfully'
        ]);
    }


    // ------------------------
    //  USER REGISTRATION
    // ------------------------
    public function register()
    {
        $data = $this->request->getJSON(true);

        $rules = [
            'name'     => 'required',
            'email'    => 'required|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        $data['status'] = 'Active';
        $data['create_audit_time'] = date('Y-m-d H:i:s');

        $this->userModel->insert($data);

        return $this->respondCreated([
            "status"  => 201,
            "message" => "User registered successfully"
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
        $user = $this->db->table('users')
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

    // ------------------------
    //  USER LOGIN
    // ------------------------
    public function login()
    {
        $data = $this->request->getJSON(true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return $this->failValidationErrors("Email & password required");
        }

        $user = $this->userModel->getUserByEmail($email);

        if (!$user) {
            return $this->failNotFound("User not found");
        }

        if ($user['status'] !== 'Active') {
            return $this->failForbidden("Your account is inactive");
        }

        if (!password_verify($password, $user['password'])) {
            return $this->failUnauthorized("Invalid credentials");
        }

        // Update last login time
        $this->userModel
            ->where('id', $user['id'])
            ->set('last_login', date('Y-m-d H:i:s'))
            ->update();

        // Generate JWT Token
        $payload = [
            "iss" => base_url(),
            "iat" => time(),
            "exp" => time() + 86400, // 24 hours
            "uid" => $user['id'],
            "role" => $user['role'],
        ];

        $token = JWT::encode($payload, $this->jwtKey, 'HS256');

        return $this->respond([
            "status" => 200,
            "message" => "Login successful",
            "token" => $token,
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "email" => $user["email"],
                "role" => $user["role"]
            ]
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

        $this->db->table('users')
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
    
        $emailService->setFrom('noreply@acsprod.info', 'R-ED LABS');
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
