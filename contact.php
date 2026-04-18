<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Metodo non consentito."
    ]);
    exit;
}

function clean_input($value) {
    return trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
}

$name = clean_input($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$message = clean_input($_POST['message'] ?? '');
$recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';

$secretKey = '6Le1r70sAAAAAM-LZbnCJ7j4c2_zRqaTwA8q2WIr';

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
        "success" => false,
        "message" => "Compila tutti i campi obbligatori."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Inserisci un indirizzo email valido."
    ]);
    exit;
}

if (empty($recaptchaResponse)) {
    echo json_encode([
        "success" => false,
        "message" => "Conferma il reCAPTCHA."
    ]);
    exit;
}

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$postData = http_build_query([
    'secret' => $secretKey,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
]);

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => $postData,
        'timeout' => 10
    ]
];

$context = stream_context_create($options);
$verifyResponse = file_get_contents($verifyUrl, false, $context);

if ($verifyResponse === false) {
    echo json_encode([
        "success" => false,
        "message" => "Errore nella verifica del reCAPTCHA."
    ]);
    exit;
}

$responseData = json_decode($verifyResponse, true);

if (!$responseData || empty($responseData['success'])) {
    echo json_encode([
        "success" => false,
        "message" => "Verifica reCAPTCHA fallita."
    ]);
    exit;
}

$to = 'degiorgio.andrea2003@gmail.com';
$subject = 'Portfolio - Nuovo messaggio dal form contatti';

$emailContent = "Hai ricevuto un nuovo messaggio dal form contatti.\n\n";
$emailContent .= "Nome: $name\n";
$emailContent .= "Email: $email\n\n";
$emailContent .= "Messaggio:\n$message\n";

$headers = [];
$headers[] = "From: Portfolio <noreply@andreadegiorgio.io>";
$headers[] = "Reply-To: $email";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$mailSent = mail($to, $subject, $emailContent, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Messaggio inviato con successo."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Errore nell'invio dell'email."
    ]);
}
exit;