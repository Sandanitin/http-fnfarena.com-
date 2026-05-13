<?php
namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Cors implements FilterInterface
{
    private array $allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://acsdev.in',
    ];

    private function applyCors(RequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $origin = $request->getHeaderLine('Origin');

        if ($origin && in_array($origin, $this->allowedOrigins, true)) {
            $response->setHeader('Access-Control-Allow-Origin', $origin);
            $response->setHeader('Vary', 'Origin'); // important for caching/CDN
            $response->setHeader('Access-Control-Allow-Credentials', 'true');
        } else {
            // fallback (no credentials with wildcard)
            $response->setHeader('Access-Control-Allow-Origin', '*');
        }

        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->setHeader('Access-Control-Max-Age', '86400');

        return $response;
    }

    public function before(RequestInterface $request, $arguments = null)
    {
        
        if ($request->getMethod() === 'OPTIONS') {
    return service('response')
        ->setStatusCode(200)
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
}

        $response = service('response');
        $response = $this->applyCors($request, $response);

        if (strtoupper($request->getMethod()) === 'OPTIONS') {
            return $response->setStatusCode(204);
        }

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
{
    $origin = $request->getHeaderLine('Origin');

    if ($origin) {
        $response->setHeader('Access-Control-Allow-Origin', $origin);
        $response->setHeader('Access-Control-Allow-Credentials', 'true');
        $response->setHeader('Vary', 'Origin');
    }

    $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    return $response;
}
}
