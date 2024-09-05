<?php
session_start();

function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!verifyCSRFToken($_POST['csrf_token'])) {
        echo json_encode(["success" => false, "message" => "Token CSRF non valido, riavvio pagina"]);
        exit;
    }

    $username = $_POST["username"];
    $password = $_POST["password"];

    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);

    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }

    $stmt = $db->prepare("SELECT password FROM utenti WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_logged_in'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['last_activity'] = time();
            echo json_encode(["success" => true, "message" => "Accesso riuscito"]);
        } else {
            echo json_encode(["success" => false, "message" => "Password errata"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Utente non trovato"]);
    }

    $stmt->close();
    $db->close();
} else {
    echo json_encode(["success" => false, "message" => "Metodo di richiesta non valido"]);
}