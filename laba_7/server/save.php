<?php
// Налаштування для CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Перевіряємо, чи прийшов POST-запит
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Перевірка на валідність даних
    if (isset($data['name']) && isset($data['content'])) {
        $fileName = '../storage/data.json';

        // Зберігаємо дані у JSON файл
        file_put_contents($fileName, json_encode($data, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success', 'message' => 'Data saved']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    }
    exit;
}
?>