<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use UnexpectedValueException;
use Exception;

class JwtAuth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        
        $uri = $request->getUri()->getPath();

        // Handle CORS preflight properly
        if (strtolower($request->getMethod()) === 'options') {
            return service('response')
                ->setStatusCode(200)
                ->setBody('');
        }

        // ✅ FIX: Correct way to read Authorization header (IMPORTANT FIX)
        $authHeader = $request->getHeaderLine('Authorization');

        // Fallback for Apache/Nginx environments
        if (!$authHeader) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
        }

        if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return service('response')->setJSON([
                'status'  => 'Unauthorized',
                'message' => 'Missing or invalid Authorization header'
            ])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        $token = $matches[1];
        $key   = getenv('JWT_SECRET') ?? 'your_super_secret_key';

        try {
            $decoded = JWT::decode($token, new Key($key, 'HS256'));

            // attach decoded token
            $request->decodedToken = (array) $decoded;

        } catch (ExpiredException $e) {
            return service('response')->setJSON([
                'status'  => 'Unauthorized',
                'message' => 'Token has expired'
            ])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);

        } catch (SignatureInvalidException $e) {
            return service('response')->setJSON([
                'status'  => 'Unauthorized',
                'message' => 'Invalid token signature'
            ])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);

        } catch (UnexpectedValueException $e) {
            return service('response')->setJSON([
                'status'  => 'Unauthorized',
                'message' => 'Malformed or invalid token'
            ])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);

        } catch (Exception $e) {
            return service('response')->setJSON([
                'status'  => 'Unauthorized',
                'message' => 'Invalid token',
                'error'   => $e->getMessage()
            ])->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}