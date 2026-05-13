<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Email extends BaseConfig
{
    public string $fromEmail  = 'noreply@acsprod.info';
    public string $fromName   = 'FNF';

    public string $protocol = 'smtp';

    public string $SMTPHost = 'mail.acsprod.info';
    public string $SMTPUser = 'noreply@acsprod.info';
    public string $SMTPPass = '3{+#k[3%*E9b';
    public int    $SMTPPort = 465;
    public string $SMTPCrypto = 'ssl';

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
}