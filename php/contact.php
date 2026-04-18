<?php

declare(strict_types=1);

function send_json_response(int $statusCode, array $payload): void
{
    while (ob_get_level() > 0) {
        ob_end_clean();
    }

    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function post_string(string $key): string
{
    $value = $_POST[$key] ?? '';

    return is_string($value) ? trim($value) : '';
}

function verify_recaptcha_token(string $secretKey, string $token): bool
{
    $endpoint = 'https://www.google.com/recaptcha/api/siteverify';
    $payload = http_build_query([
        'secret' => $secretKey,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $responseBody = false;

    if (function_exists('curl_init')) {
        $ch = curl_init($endpoint);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_TIMEOUT => 10,
        ]);

        $responseBody = curl_exec($ch);
        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $payload,
                'timeout' => 10,
            ],
        ]);

        $responseBody = @file_get_contents($endpoint, false, $context);
    }

    if (!is_string($responseBody) || $responseBody === '') {
        return false;
    }

    $decoded = json_decode($responseBody, true);

    return is_array($decoded) && !empty($decoded['success']);
}

ob_start();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    send_json_response(405, [
        'success' => false,
        'message' => 'Metodo non consentito.',
    ]);
}

$configPath = __DIR__ . '/config.php';

if (!is_file($configPath)) {
    send_json_response(500, [
        'success' => false,
        'message' => 'Configurazione server mancante.',
    ]);
}

$config = require $configPath;

$recipientEmail = trim((string) ($config['contact_recipient_email'] ?? ''));
$senderEmail = trim((string) ($config['contact_sender_email'] ?? ''));
$recaptchaSecretKey = trim((string) ($config['recaptcha_secret_key'] ?? ''));

if ($recipientEmail === '' || $senderEmail === '' || $recaptchaSecretKey === '') {
    send_json_response(500, [
        'success' => false,
        'message' => 'Configurazione email o reCAPTCHA non valida.',
    ]);
}

$name = post_string('name');
$surname = post_string('surname');
$email = post_string('email');
$subject = post_string('subject');
$message = post_string('message');
$recaptchaToken = post_string('recaptchaToken');

if (
    $name === '' ||
    $surname === '' ||
    $email === '' ||
    $subject === '' ||
    $message === '' ||
    $recaptchaToken === ''
) {
    send_json_response(422, [
        'success' => false,
        'message' => 'Compila tutti i campi richiesti e completa il reCAPTCHA.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json_response(422, [
        'success' => false,
        'message' => 'Inserisci un indirizzo email valido.',
    ]);
}

if (!verify_recaptcha_token($recaptchaSecretKey, $recaptchaToken)) {
    send_json_response(422, [
        'success' => false,
        'message' => 'Verifica reCAPTCHA non valida. Riprova.',
    ]);
}

$fullName = trim($name . ' ' . $surname);
$mailSubject = '[Portfolio] ' . $subject;
$mailBody = implode("\n", [
    'Nuovo messaggio dal form contatti',
    '',
    'Nome: ' . $fullName,
    'Email: ' . $email,
    'Oggetto: ' . $subject,
    '',
    'Messaggio:',
    $message,
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Andrea De Giorgio <' . $senderEmail . '>',
    'Reply-To: ' . $fullName . ' <' . $email . '>',
];

$mailSent = @mail($recipientEmail, $mailSubject, $mailBody, implode("\r\n", $headers));

if (!$mailSent) {
    send_json_response(500, [
        'success' => false,
        'message' => 'Invio email non riuscito. Controlla la configurazione del server.',
    ]);
}

send_json_response(200, [
    'success' => true,
    'message' => 'Messaggio inviato con successo.',
]);
