<?php
session_start();
header('Content-Type: application/json');

// Funzione per controllare se la sessione è scaduta
function isSessionExpired() {
    $max_lifetime = 1 * 60; // 30 minuti in secondi
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $max_lifetime)) {
        return true;
    }
    return false;
}

if (isset($_SESSION['user_logged_in']) && $_SESSION['user_logged_in'] === true) {
    if (isSessionExpired()) {
        // La sessione è scaduta
        session_unset();
        session_destroy();
        echo json_encode(["loggedIn" => false, "sessionExpired" => true]);
    } else {
        // Aggiorna il timestamp dell'ultima attività
        $_SESSION['last_activity'] = time();
        echo json_encode(["loggedIn" => true, "username" => $_SESSION['username']]);
    }
} else {
    echo json_encode(["loggedIn" => false]);
}
?>