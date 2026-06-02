<?php

namespace App\Libraries;

use Aws\S3\S3Client;

class R2Upload
{
    protected $client;
    protected $bucket;

    public function __construct()
    {
        $this->client = new S3Client([
            'version'     => 'latest',
            'region'      => 'auto',
            'endpoint'    => getenv('R2_ENDPOINT'),
            'credentials' => [
                'key'    => getenv('R2_ACCESS_KEY'),
                'secret' => getenv('R2_SECRET_KEY')
            ]
        ]);

        $this->bucket = getenv('R2_BUCKET');
    }

        public function upload($tempPath, $objectKey)
    {
        try {
            $result = $this->client->putObject([
                'Bucket'     => $this->bucket,
                'Key'        => $objectKey,
                'SourceFile' => $tempPath,
                
                // ✅ Added headers
                'ContentType' => 'application/pdf',
                'ContentDisposition' => 'inline; filename="' . $tempPath . '"',
            ]);
        } catch (\Exception $e) {
            throw new \RuntimeException("R2 upload failed: " . $e->getMessage());
        }
    
        return $objectKey;
    }

}