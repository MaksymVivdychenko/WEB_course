<?php
// Встановлення заголовків
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Метод не дозволено']);
    exit;
}
// Зчитування даних із запиту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка на помилки
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Некоректні дані']);
    exit;
}

// Запис даних у файл `data.json`
$file = 'data.json';
if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['status' => 'success', 'message' => 'Дані збережено']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Помилка збереження']);
}
?>