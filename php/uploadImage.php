<?php
//facico partire la sessio
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        $uploadDirectory = 'C:/xampp/htdocs/TV ITI-TV 2.0/IMG/Componenti Aggiuntivi/';
        $fileName = $_SESSION['username'] . '_' . time() . '_' . $_FILES['file']['name'];
        $targetFilePath = $uploadDirectory . $fileName;

        // Assicurati che la cartella esista
        if (!is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

        // Controlla che il file sia un'immagine
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        $allowedTypes = array('jpg', 'jpeg', 'png', 'gif');

        if (in_array(strtolower($fileType), $allowedTypes)) {
            // Sposta il file caricato nella cartella di destinazione
            if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
                // Restituisce il percorso del file caricato
                echo "IMG/Componenti Aggiuntivi/" . $fileName;
            } else {
                http_response_code(500);
                echo 'Errore nel salvataggio del file.';
            }
        } else {
            http_response_code(400);
            echo 'Formato file non supportato.';
        }
    } else {
        http_response_code(400);
        echo 'Nessun file caricato o errore nel caricamento.';
    }
} else {
    http_response_code(405);
    echo 'Metodo non consentito.';
}
?>
