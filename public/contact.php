<?php
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');
$honeypot = trim($data['website'] ?? '');

// Honeypot field: real users never fill this in, bots usually do.
if ($honeypot !== '') {
    echo json_encode(['success' => true]);
    exit;
}

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Compila tutti i campi.']);
    exit;
}

// Strip newlines to prevent header injection via the Reply-To header.
$name = str_replace(["\r", "\n"], '', $name);
$email = str_replace(["\r", "\n"], '', $email);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Email non valida.']);
    exit;
}

$to = 'degiorgio.andrea2003@gmail.com';
$subject = '=?UTF-8?B?' . base64_encode('Nuovo messaggio dal portfolio - ' . $name) . '?=';

$body = "Hai ricevuto un nuovo messaggio dal form di contatto del portfolio:\n\n";
$body .= "Nome: $name\n";
$body .= "Email: $email\n\n";
$body .= "Messaggio:\n$message\n";

$host = preg_replace('/[^a-zA-Z0-9\.\-]/', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$headers = [
    'From: Portfolio Website <no-reply@' . $host . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Invio non riuscito. Riprova più tardi.']);
}
