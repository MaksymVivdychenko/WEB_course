<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$fileName = '../storage/data.json';

if (file_exists($fileName)) {
    echo file_get_contents($fileName);
} else {
    echo json_encode(['status' => 'error', 'message' => 'File not found']);
}
?>