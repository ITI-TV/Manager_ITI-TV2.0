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
                // Leggi il contenuto del file
                $fileData = file_get_contents($targetFilePath);
                
                // Codifica l'immagine in Base64
                $base64Image = base64_encode($fileData);
                
                // Ottieni il mime type corretto per l'immagine
                $base64MimeType = mime_content_type($targetFilePath);
                
                // Formatta la stringa Base64
                $base64ImageWithPrefix = 'data:' . $base64MimeType . ';base64,' . $base64Image;

                // Stampa la stringa Base64
                echo $base64ImageWithPrefix;
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
