<?php

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "message" => "Metodo non consentito."
    ]);
    exit;
}

$recipientEmail = getenv("CONTACT_RECIPIENT_EMAIL") ?: "degiorgio.andrea2003@gmail.com ";
$recaptchaSecret = getenv("RECAPTCHA_SECRET_KEY") ?: "6Le1r70sAAAAAM-LZbnCJ7j4c2_zRqaTwA8q2WIr";

if (
    $recipientEmail === "degiorgio.andrea2003@gmail.com" ||
    $recaptchaSecret === "6Le1r70sAAAAAM-LZbnCJ7j4c2_zRqaTwA8q2WIr"
) {
    http_response_code(500);
    echo json_encode([
        "message" => "Configurazione server incompleta. Verifica email destinatario e secret key reCAPTCHA."
    ]);
    exit;
}

$payload = json_decode(file_get_contents("php://input"), true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode([
        "message" => "Payload non valido."
    ]);
    exit;
}

$name = trim((string) ($payload["name"] ?? ""));
$email = trim((string) ($payload["email"] ?? ""));
$message = trim((string) ($payload["message"] ?? ""));
$recaptchaToken = trim((string) ($payload["recaptchaToken"] ?? ""));

if ($name === "" || $email === "" || $message === "") {
    http_response_code(400);
    echo json_encode([
        "message" => "Compila tutti i campi richiesti."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "message" => "Inserisci un indirizzo email valido."
    ]);
    exit;
}

if ($recaptchaToken === "") {
    http_response_code(400);
    echo json_encode([
        "message" => "Completa la verifica reCAPTCHA prima di inviare."
    ]);
    exit;
}

$verificationContext = stream_context_create([
    "http" => [
        "method" => "POST",
        "header" => "Content-type: application/x-www-form-urlencoded\r\n",
        "content" => http_build_query([
            "secret" => $recaptchaSecret,
            "response" => $recaptchaToken,
            "remoteip" => $_SERVER["REMOTE_ADDR"] ?? ""
        ]),
        "timeout" => 10
    ]
]);

$verificationResponse = @file_get_contents(
    "https://www.google.com/recaptcha/api/siteverify",
    false,
    $verificationContext
);

if ($verificationResponse === false) {
    http_response_code(502);
    echo json_encode([
        "message" => "Verifica reCAPTCHA non raggiungibile. Riprova tra poco."
    ]);
    exit;
}

$verificationResult = json_decode($verificationResponse, true);

if (!is_array($verificationResult) || empty($verificationResult["success"])) {
    http_response_code(400);
    echo json_encode([
        "message" => "Verifica reCAPTCHA non valida. Riprova."
    ]);
    exit;
}

$safeName = preg_replace("/[\r\n]+/", " ", $name);
$safeEmail = str_replace(["\r", "\n"], "", $email);
$safeMessage = str_replace("\r", "", $message);

$subject = "Nuovo messaggio dal sito andreadegiorgio.io";
$mailBody = "Nome: {$safeName}\n";
$mailBody .= "Email: {$safeEmail}\n\n";
$mailBody .= "Messaggio:\n{$safeMessage}\n";

$mailSent = mail(
    $recipientEmail,
    "=?UTF-8?B?" . base64_encode($subject) . "?=",
    $mailBody,
    implode("\r\n", $headers)
);

if (!$mailSent) {
    http_response_code(500);
    echo json_encode([
        "message" => "Invio email non riuscito. Verifica la configurazione del server."
    ]);
    exit;
}

echo json_encode([
    "message" => "Messaggio inviato correttamente. Ti rispondero il prima possibile."
]);
