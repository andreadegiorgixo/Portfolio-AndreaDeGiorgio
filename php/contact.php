<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Metodo non consentito.');
}

$configPath = __DIR__ . '/config.php';

if (!is_file($configPath)) {
    respond(500, false, 'Configurazione server non trovata.');
}

$config = require $configPath;

$recipientEmail = trim((string)($config['contact_recipient_email'] ?? ''));
$senderEmail = trim((string)($config['contact_sender_email'] ?? ''));
$recaptchaSecret = trim((string)($config['recaptcha_secret_key'] ?? ''));

if (
    $recipientEmail === '' ||
    $senderEmail === '' ||
    $recaptchaSecret === '' ||
    !filter_var($recipientEmail, FILTER_VALIDATE_EMAIL) ||
    !filter_var($senderEmail, FILTER_VALIDATE_EMAIL)
) {
    respond(500, false, 'Configurazione email non valida.');
}

$name = normalizeInput($_POST['name'] ?? '');
$surname = normalizeInput($_POST['surname'] ?? '');
$email = normalizeInput($_POST['email'] ?? '');
$subject = normalizeInput($_POST['subject'] ?? '');
$message = normalizeInput($_POST['message'] ?? '');
$recaptchaToken = trim((string)($_POST['recaptchaToken'] ?? ''));
$consent = (string)($_POST['consent'] ?? '');

if (
    $name === '' ||
    $surname === '' ||
    $email === '' ||
    $subject === '' ||
    $message === ''
) {
    respond(422, false, 'Compila tutti i campi obbligatori.');
}

if ($consent !== '1') {
    respond(422, false, 'Devi acconsentire al trattamento dei dati personali.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Inserisci un indirizzo email valido.');
}

if ($recaptchaToken === '') {
    respond(422, false, 'Completa la verifica reCAPTCHA prima di inviare.');
}

if (textLength($name) > 80 || textLength($surname) > 80) {
    respond(422, false, 'Nome o cognome troppo lunghi.');
}

if (textLength($email) > 160) {
    respond(422, false, 'Indirizzo email troppo lungo.');
}

if (textLength($subject) > 140) {
    respond(422, false, 'Oggetto troppo lungo.');
}

if (textLength($message) > 5000) {
    respond(422, false, 'Messaggio troppo lungo.');
}

if (containsHeaderInjection([$name, $surname, $email, $subject])) {
    respond(422, false, 'I dati inseriti contengono caratteri non validi.');
}

$recaptchaResult = verifyRecaptcha($recaptchaSecret, $recaptchaToken);

if (!$recaptchaResult['success']) {
    respond(
        (int)($recaptchaResult['status_code'] ?? 422),
        false,
        recaptchaErrorMessage($recaptchaResult)
    );
}

$safeSubject = preg_replace('/[\r\n]+/', ' ', $subject);
$safeName = preg_replace('/[\r\n]+/', ' ', $name . ' ' . $surname);
$safeName = trim((string)$safeName);

$bodyLines = [
    'Nuovo messaggio dal form contatti del portfolio.',
    '',
    'Nome: ' . $name,
    'Cognome: ' . $surname,
    'Email: ' . $email,
    'Oggetto: ' . $safeSubject,
    '',
    'Messaggio:',
    $message,
];

$mailBody = implode("\n", $bodyLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Andrea De Giorgio Portfolio <' . $senderEmail . '>',
    'Reply-To: ' . ($safeName !== '' ? $safeName . ' <' . $email . '>' : $email),
    'X-Mailer: PHP/' . PHP_VERSION,
];

$encodedSubject = mb_encode_mimeheader('[Portfolio] ' . $safeSubject, 'UTF-8');
$mailSent = mail($recipientEmail, $encodedSubject, $mailBody, implode("\r\n", $headers));

if (!$mailSent) {
    respond(500, false, 'Invio non riuscito. Controlla la configurazione del server email.');
}

respond(200, true, 'Messaggio inviato con successo. Ti rispondero presto.');

function normalizeInput(mixed $value): string
{
    $text = trim((string)$value);
    $text = str_replace("\0", '', $text);

    return $text;
}

function containsHeaderInjection(array $values): bool
{
    foreach ($values as $value) {
        if (preg_match('/[\r\n]/', (string)$value) === 1) {
            return true;
        }
    }

    return false;
}

function textLength(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value);
    }

    return strlen($value);
}

function verifyRecaptcha(string $secret, string $token): array
{
    $payload = http_build_query([
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $response = null;
    $transportError = null;

    if (function_exists('curl_init')) {
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
            CURLOPT_TIMEOUT => 10,
        ]);

        $curlResponse = curl_exec($ch);

        if ($curlResponse === false) {
            $transportError = curl_error($ch) ?: 'Errore cURL sconosciuto.';
        } else {
            $response = $curlResponse;
        }

        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'content' => $payload,
                'timeout' => 10,
            ],
        ]);

        $streamResponse = @file_get_contents(
            'https://www.google.com/recaptcha/api/siteverify',
            false,
            $context
        );

        if ($streamResponse === false) {
            $lastError = error_get_last();
            $transportError = is_array($lastError) ? (string)($lastError['message'] ?? '') : '';
        } else {
            $response = $streamResponse;
        }
    }

    if ($response === null) {
        return [
            'success' => false,
            'status_code' => 500,
            'reason' => 'transport',
            'transport_error' => $transportError,
        ];
    }

    $decoded = json_decode($response, true);

    if (!is_array($decoded)) {
        return [
            'success' => false,
            'status_code' => 500,
            'reason' => 'invalid_json',
        ];
    }

    return $decoded;
}

function recaptchaErrorMessage(array $result): string
{
    $reason = (string)($result['reason'] ?? '');

    if ($reason === 'transport') {
        return 'Il server non riesce a verificare reCAPTCHA con Google. Controlla rete, firewall o supporto cURL/PHP.';
    }

    if ($reason === 'invalid_json') {
        return 'La risposta di verifica reCAPTCHA non e valida.';
    }

    $errorCodes = $result['error-codes'] ?? [];

    if (!is_array($errorCodes)) {
        $errorCodes = [];
    }

    if (in_array('missing-input-secret', $errorCodes, true)) {
        return 'La secret key di reCAPTCHA manca nella configurazione server.';
    }

    if (in_array('invalid-input-secret', $errorCodes, true)) {
        return 'La secret key di reCAPTCHA non e valida o non corrisponde alla site key.';
    }

    if (in_array('missing-input-response', $errorCodes, true)) {
        return 'Il token reCAPTCHA non e stato inviato dal browser.';
    }

    if (in_array('invalid-input-response', $errorCodes, true)) {
        return 'Il token reCAPTCHA non e valido per questo dominio o per questa chiave.';
    }

    if (in_array('timeout-or-duplicate', $errorCodes, true)) {
        return 'Il controllo reCAPTCHA e scaduto o e gia stato usato. Riprova spuntandolo di nuovo.';
    }

    if (in_array('bad-request', $errorCodes, true)) {
        return 'La richiesta inviata a reCAPTCHA non e valida.';
    }

    return 'Verifica reCAPTCHA non riuscita. Riprova.';
}

function respond(int $statusCode, bool $success, string $message): never
{
    http_response_code($statusCode);

    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    exit;
}
