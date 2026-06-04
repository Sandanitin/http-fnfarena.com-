<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Email extends BaseConfig
{
    public string $fromEmail  = 'groupbooking@fnfarena.com';
    public string $fromName   = 'FNF';

    public string $protocol = 'smtp';

    public string $SMTPHost = 'smtp.office365.com';
    public string $SMTPUser = 'groupbooking@fnfarena.com';
    public string $SMTPPass = '';
    public int    $SMTPPort = 587;
    public string $SMTPCrypto = 'tls';

    public int    $SMTPTimeout = 15;
    public bool   $SMTPKeepAlive = false;

    public bool   $wordWrap = true;
    public int    $wrapChars = 76;

    public string $mailType = 'html';
    public string $charset = 'UTF-8';
    public bool   $validate = true;

    public int    $priority = 3;

    public string $CRLF = "\r\n";
    public string $newline = "\r\n";

    public bool   $BCCBatchMode = false;
    public int    $BCCBatchSize = 200;
    public bool   $DSN = false;

    public function __construct()
    {
        parent::__construct();

        $this->fromEmail  = getenv('email.fromEmail') ?: 'groupbooking@fnfarena.com';
        $this->fromName   = getenv('email.fromName') ?: 'FNF';
        $this->protocol   = getenv('email.protocol') ?: 'smtp';
        $this->SMTPHost   = getenv('email.SMTPHost') ?: 'smtp.office365.com';
        $this->SMTPUser   = getenv('email.SMTPUser') ?: 'groupbooking@fnfarena.com';
        $this->SMTPPass   = getenv('email.SMTPPass') ?: (getenv('SMTP_PASS') ?: '');
        $this->SMTPPort   = (int)(getenv('email.SMTPPort') ?: 587);
        $this->SMTPCrypto = getenv('email.SMTPCrypto') ?: 'tls';
    }
}