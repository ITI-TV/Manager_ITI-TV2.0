<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        $uploadDirectory = 'C:/xampp/htdocs/TV ITI-TV 2.0/IMG/Componenti Aggiuntivi/';
        $fileName = $_SESSION['username'] . '_' . time() . '_' . $_FILES['file']['name'];
        $targetFilePath = $uploadDirectory . $fileName;

        if (!is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
        $allowedTypes = array('jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff', 'tif', 'psd', 'raw', 'psp', 'heic');

        if (in_array(strtolower($fileType), $allowedTypes)) {
            if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFilePath)) {
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
