<?php
session_start();
header('Content-Type: application/json');

// Distruggi tutte le variabili di sessione
$_SESSION = array();

// Se si desidera distruggere completamente la sessione, cancellare anche
// il cookie di sessione.
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Infine, distruggi la sessione
session_destroy();

// Restituisci una risposta JSON
echo json_encode(["success" => true, "message" => "Logout effettuato con successo"]);
?>