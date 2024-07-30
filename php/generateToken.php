<?php

use Random\RandomException;

session_start();

/**
 * @throws RandomException
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

try {
    echo generateCSRFToken();
} catch (RandomException $e) {
    echo json_encode(["success" => false, "message" => "Errore nella generazione del token CSRF"]);
    exit;
}