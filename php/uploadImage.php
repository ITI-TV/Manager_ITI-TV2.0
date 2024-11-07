<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        // Leggi il contenuto del file caricato
        $fileData = file_get_contents($_FILES['file']['tmp_name']);
        
        // Ottieni il tipo MIME corretto
        $fileType = mime_content_type($_FILES['file']['tmp_name']);
        $allowedTypes = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/vnd.microsoft.icon', 'image/tiff', 'image/x-photoshop', 'image/raw', 'image/heic');

        if (in_array($fileType, $allowedTypes)) {
            // Codifica l'immagine in Base64
            $base64Image = base64_encode($fileData);
            
            // Formatta la stringa Base64 con il MIME type corretto
            $base64ImageWithPrefix = 'data:' . $fileType . ';base64,' . $base64Image;

            // Stampa la stringa Base64
            echo $base64ImageWithPrefix;
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
