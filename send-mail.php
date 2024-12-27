<?php

require_once('./vendor/autoload.php');
use Postmark\PostmarkClient;

if( isset($_REQUEST['g-recaptcha-response']) ){	
	http_response_code(403);
    die();
}

$name      = isset($_REQUEST['name']) ? filter_var($_REQUEST['name'], FILTER_SANITIZE_STRING) : '';
$phone     = isset($_REQUEST['phone']) ? filter_var($_REQUEST['phone'], FILTER_SANITIZE_STRING) : '';
$email     = isset($_REQUEST['email']) ? filter_var($_REQUEST['email'], FILTER_VALIDATE_EMAIL) : '';
$message   = isset($_REQUEST['message']) ? filter_var($_REQUEST['message'], FILTER_SANITIZE_STRING) : '';
$recaptcha = isset($_REQUEST['recaptcha']) ? filter_var($_REQUEST['recaptcha'], FILTER_SANITIZE_STRING) : '';

if( empty($name) || empty($phone) || empty($email) || empty($recaptcha) ){	
    http_response_code(403);
	die();
}


//Send Mail
$client = new PostmarkClient("a2c2c205-7cf3-40d8-9158-aa48a7a33ce0");

$body = "Name : {$name}" . "<br>";
$body .= "Phone : {$phone}" . "<br>";
$body .= "Email : {$email}" . "<br>";
$body .= "Message : {$message}";

//$from, $to, $subject, $htmlBody = NULL, $textBody = NULL, $tag = NULL, $trackOpens = NULL, $replyTo = NULL, $cc = NULL, $bcc = NULL, $headers = NULL, $attachments = NULL, $trackLinks = NULL, $metadata = NULL, $messageStream = NULL
$sendResult = $client->sendEmail(
     "info@upstairs.co",
     "phong.tran@upstairs.co", //"phong.tran@upstairs.co", //
     "New contact from website",
    $body,
    NULL, NULL, true, 
    NULL, //$replyTo
    NULL, //'matthew.clark@upstairs.co' //cc    
    'phong.tran@upstairs.co', // bcc    
    // $headers //$headers
);

http_response_code(200);
die();