<?php

declare(strict_types=1);

$allowedOrigins = [
    'https://nayara-ismael.com.br'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

function clip(string $value, int $max): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $max);
    }
    return substr($value, 0, $max);
}

function word_count(string $name): int
{
    $parts = preg_split('/\s+/', trim($name), -1, PREG_SPLIT_NO_EMPTY);
    return is_array($parts) ? count($parts) : 0;
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config', 'message' => 'Arquivo config.php não encontrado']);
    exit;
}

try {
    /** @var array{db_host: string, db_name: string, db_user: string, db_pass: string, notify_email: string, from_email: string} $config */
    $config = require $configFile;

    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'json', 'message' => 'JSON inválido']);
        exit;
    }

    $guests = [];
    if (isset($data['guests']) && is_array($data['guests'])) {
        foreach ($data['guests'] as $guest) {
            if (!is_string($guest)) {
                continue;
            }
            $name = trim($guest);
            if ($name === '') {
                continue;
            }
            if (word_count($name) < 2) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'error' => 'fullname', 'message' => 'Nome e sobrenome são obrigatórios']);
                exit;
            }
            $guests[] = clip($name, 180);
        }
    }

    $contact = isset($data['contact']) && is_string($data['contact'])
        ? clip(trim($data['contact']), 255)
        : '';
    $note = isset($data['note']) && is_string($data['note'])
        ? clip(trim($data['note']), 2000)
        : '';

    if (count($guests) === 0) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'guests', 'message' => 'Nenhum convidado informado']);
        exit;
    }

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $db = mysqli_init();
    if ($db === false) {
        throw new RuntimeException('Não foi possível iniciar o MySQLi');
    }
    $db->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
    $db->real_connect(
        $config['db_host'],
        $config['db_user'],
        $config['db_pass'],
        $config['db_name']
    );
    $db->set_charset('utf8mb4');
    $db->begin_transaction();

    $insertConfirmation = $db->prepare(
        'INSERT INTO rsvp_confirmations (contact, note) VALUES (?, ?)'
    );
    $insertConfirmation->bind_param('ss', $contact, $note);
    $insertConfirmation->execute();
    $confirmationId = $db->insert_id;
    $insertConfirmation->close();

    $insertGuest = $db->prepare(
        'INSERT INTO rsvp_guests (confirmation_id, name) VALUES (?, ?)'
    );
    $guestName = '';
    $insertGuest->bind_param('is', $confirmationId, $guestName);
    foreach ($guests as $guestName) {
        $insertGuest->execute();
    }
    $insertGuest->close();
    $db->commit();
    $db->close();

    // $guestList = implode(', ', $guests);
    // $subject = 'Nova confirmação de presença — ' . $guestList;
    // $body = "Nova confirmação no site do casamento.\n\n"
    //     . "Quem vai: {$guestList}\n"
    //     . 'WhatsApp: ' . ($contact !== '' ? $contact : '(não informado)') . "\n"
    //     . 'Recado: ' . ($note !== '' ? $note : '(sem recado)') . "\n";

    // $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    // $headers = [
    //     'MIME-Version: 1.0',
    //     'Content-Type: text/plain; charset=UTF-8',
    //     'From: Casamento <' . $config['from_email'] . '>',
    //     'Reply-To: ' . ($contact !== '' ? $contact : $config['from_email']),
    // ];

    // @mail($config['notify_email'], $encodedSubject, $body, implode("\r\n", $headers));

    echo json_encode(['ok' => true]);
} catch (Throwable $exception) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'exception',
        'message' => $exception->getMessage(),
        'file' => $exception->getFile(),
        'line' => $exception->getLine(),
    ], JSON_UNESCAPED_UNICODE);
}
