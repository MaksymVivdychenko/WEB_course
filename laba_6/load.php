<?php
// Встановлення заголовків для дозволу доступу з клієнтської частини
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Шлях до файлу з даними
$dataFile = 'data.json';

// Перевірка існування файлу
if (!file_exists($dataFile)) {
    http_response_code(404);
    echo json_encode([
        'status' => 'error',
        'message' => 'Файл не знайдено.'
    ]);
    exit;
}

// Спроба зчитати дані з файлу
$data = file_get_contents($dataFile);
if ($data === false) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Не вдалося зчитати файл.'
    ]);
    exit;
}

// Перевірка, чи дані є валідним JSON
$jsonData = json_decode($data, true);
if ($jsonData === null) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Файл містить некоректний JSON.'
    ]);
    exit;
}

// Відправлення даних на клієнт
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'data' => $jsonData
]);
?>