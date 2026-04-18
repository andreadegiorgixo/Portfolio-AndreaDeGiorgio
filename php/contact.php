<?php

header("Content-Type: application/json; charset=UTF-8");

$localConfig = __DIR__ . "/config.php";
$config = [];

if (is_file($localConfig)) {
    $loadedConfig = require $localConfig;
    if (is_array($loadedConfig)) {
        $config = $loadedConfig;
    }
}

function respond(int $statusCode, string $message, bool $success = false): void
{
    http_response_code($statusCode);
    echo json_encode([
        "success" => $success,
        "message" => $message
    ]);
    exit;
}

function postForm(string $url, array $data): ?string
{
    $body = http_build_query($data);

    if (function_exists("curl_init")) {
        $ch = curl_init($url);

        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTPHEADER => [
                "Content-Type: application/x-www-form-urlencoded"
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if (is_string($response) && $response !== "" && $httpCode >= 200 && $httpCode < 300) {
            return $response;
        }
    }

    $context = stream_context_create([
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/x-www-form-urlencoded\r\n",
            "content" => $body,
            "timeout" => 10
        ],
        "ssl" => [
            "verify_peer" => true,
            "verify_peer_name" => true
        ]
    ]);

    $response = @file_get_contents($url, false, $context);

    return is_string($response) && $response !== "" ? $response : null;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(405, "Metodo non consentito.");
}

$recipientEmail = trim((string) (getenv("CONTACT_RECIPIENT_EMAIL") ?: ($config["contact_recipient_email"] ?? "")));
$recaptchaSecret = trim((string) (getenv("RECAPTCHA_SECRET_KEY") ?: ($config["recaptcha_secret_key"] ?? "")));
$senderEmail = trim((string) (getenv("CONTACT_SENDER_EMAIL") ?: ($config["contact_sender_email"] ?? "noreply@andreadegiorgio.io")));

if ($recipientEmail === "" || $recaptchaSecret === "") {
    respond(
        500,
        "Configurazione server incompleta. Verifica email destinatario e secret key reCAPTCHA."
    );
}

$payload = json_decode(file_get_contents("php://input"), true);

if (!is_array($payload)) {
    $payload = $_POST;
}

if (!is_array($payload) || $payload === []) {
    respond(400, "Payload non valido.");
}

$name = trim((string) ($payload["name"] ?? ""));
$email = trim((string) ($payload["email"] ?? ""));
$message = trim((string) ($payload["message"] ?? ""));
$recaptchaToken = trim((string) ($payload["recaptchaToken"] ?? $payload["g-recaptcha-response"] ?? ""));

if ($name === "" || $email === "" || $message === "") {
    respond(400, "Compila tutti i campi richiesti.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, "Inserisci un indirizzo email valido.");
}

if ($recaptchaToken === "") {
    respond(400, "Completa la verifica reCAPTCHA prima di inviare.");
}

$verificationPayload = [
    "secret" => $recaptchaSecret,
    "response" => $recaptchaToken,
    "remoteip" => $_SERVER["REMOTE_ADDR"] ?? ""
];

$verificationResponse = postForm(
    "https://www.google.com/recaptcha/api/siteverify",
    $verificationPayload
);

if ($verificationResponse === null) {
    $verificationResponse = postForm(
        "https://www.recaptcha.net/recaptcha/api/siteverify",
        $verificationPayload
    );
}

if ($verificationResponse === null) {
    respond(502, "Verifica reCAPTCHA non raggiungibile. Riprova tra poco.");
}

$verificationResult = json_decode($verificationResponse, true);

if (!is_array($verificationResult) || empty($verificationResult["success"])) {
    respond(400, "Verifica reCAPTCHA non valida. Riprova.");
}

$safeName = preg_replace("/[\r\n]+/", " ", $name);
$safeEmail = str_replace(["\r", "\n"], "", $email);
$safeMessage = str_replace("\r", "", $message);
$serverName = preg_replace("/[^a-zA-Z0-9.-]/", "", (string) ($_SERVER["SERVER_NAME"] ?? "andreadegiorgio.io"));
$messageIdDomain = $serverName !== "" ? $serverName : "andreadegiorgio.io";
$timestamp = date(DATE_RFC2822);
$messageId = sprintf("<%s@%s>", bin2hex(random_bytes(16)), $messageIdDomain);

$subject = "Richiesta contatto dal sito andreadegiorgio.io";
$mailBody = "Nome: {$safeName}\n";
$mailBody .= "Email: {$safeEmail}\n\n";
$mailBody .= "Messaggio:\n{$safeMessage}\n";
$mailBody .= "\n";
$mailBody .= "IP mittente: " . ($_SERVER["REMOTE_ADDR"] ?? "non disponibile") . "\n";
$mailBody .= "Data invio: {$timestamp}\n";

$headers = [
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "From: Portfolio Contact <{$senderEmail}>",
    "Sender: Portfolio Contact <{$senderEmail}>",
    "Reply-To: {$safeEmail}",
    "Date: {$timestamp}",
    "Message-ID: {$messageId}",
    "X-Auto-Response-Suppress: All",
    "X-Mailer: PHP/" . phpversion()
];

$mailSent = mail(
    $recipientEmail,
    "=?UTF-8?B?" . base64_encode($subject) . "?=",
    $mailBody,
    implode("\r\n", $headers),
    "-f{$senderEmail}"
);

if (!$mailSent) {
    respond(500, "Invio email non riuscito. Verifica la configurazione del server.");
}

respond(200, "Messaggio inviato correttamente. Ti rispondero il prima possibile.", true);
