<?php
session_start();
if($_POST['action'] == 'setComm'){
    $NumeroComunicazione = $_POST['Numero'];
    $TitoloComunicazione = $_POST['Titolo'];
    $CorpoComunicazione = $_POST['Corpo'];
    $InizioComunicazione = $_POST['DataInizio'];
    $FineComunicazione = $_POST['DataFine'];
    $FirmaComunicazione = $_POST['Firma'];
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $data= date("Y-m-d H:i:s");
    $tag = "comunicazione";
    try {
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Numero = ? AND Tag = 'comunicazione'");
        $stmt->bind_param("s", $NumeroComunicazione);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Comunicazione già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    try{
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Titolo = ? AND Tag = 'comunicazione'");
        $stmt->bind_param("s", $TitoloComunicazione);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Titolo già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    try{
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Corpo = ? AND Tag = 'comunicazione'");
        $stmt->bind_param("s", $CorpoComunicazione);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Corpo già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    $stmt = $db->prepare("INSERT INTO comunicazione (Data, Prof, Numero, Titolo, Corpo, Data_inizio, Data_fine, Tag) VALUE (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $data, $FirmaComunicazione, $NumeroComunicazione, $TitoloComunicazione, $CorpoComunicazione, $InizioComunicazione, $FineComunicazione, $tag);
    $stmt->execute();
    $stmt->close();
    $db->close();
    $_SESSION['last_activity'] = time();
    require ('GestoreNumeroPagine.php');
    echo json_encode(["success" => true, "message" => "Comunicazione inserita correttamente"]);
}else if($_POST['action']=="getLastComm"){
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Tag = 'comunicazione' ORDER BY Data DESC LIMIT 1");
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    $db->close();
    echo json_encode(["success" => true, "Numero" => $row['Numero'], "Titolo" => $row['Titolo'], "Corpo" => $row['Corpo'], "Data_inizio" => $row['Data_inizio'], "Data_fine" => $row['Data_fine'], "Firma" => $row['Prof']]);
}else if($_POST['action']=="setNews"){
    $CorpoNews = $_POST['Corpo'];
    $InizioNews = $_POST['DataInizio'];
    $FineNews = $_POST['DataFine'];
    $FirmaNews = $_POST['Firma'];
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $data= date("Y-m-d H:i:s");
    $tag = "news";
    try{
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Corpo = ? AND Tag = 'news'");
        $stmt->bind_param("s", $CorpoNews);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Corpo già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    $stmt = $db->prepare("INSERT INTO comunicazione (Data, Prof, Corpo, Data_inizio, Data_fine, Tag) VALUE (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $data, $FirmaNews, $CorpoNews, $InizioNews, $FineNews, $tag);
    $stmt->execute();
    $stmt->close();
    $db->close();
    $_SESSION['last_activity'] = time();
    require ('GestoreNumeroPagine.php');
    echo json_encode(["success" => true, "message" => "News inserita correttamente"]);
}else if($_POST['action']=="setEmergenza"){
    $CorpoEmergenza = $_POST['Corpo'];
    $InizioEmergenza = $_POST['DataInizio'];
    $FineEmergenza = $_POST['DataFine'];
    $FirmaEmergenza = $_POST['Firma'];
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $data= date("Y-m-d H:i:s");
    $tag = "emergenza";
    try{
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Corpo = ? AND Tag = 'emergenza'");
        $stmt->bind_param("s", $CorpoEmergenza);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Corpo già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    $stmt = $db->prepare("INSERT INTO comunicazione (Data, Prof, Corpo, Data_inizio, Data_fine, Tag) VALUE (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $data, $FirmaEmergenza, $CorpoEmergenza, $InizioEmergenza, $FineEmergenza, $tag);
    $stmt->execute();
    $stmt->close();
    $db->close();
    $_SESSION['last_activity'] = time();
    require ('GestoreNumeroPagine.php');
    echo json_encode(["success" => true, "message" => "Emergenza inserita correttamente"]);
}else if($_POST['action']=="setComponenteAggiuntivo"){
    $TitoloComponente = $_POST['Titolo'];
    $CorpoComponente = $_POST['Corpo'];
    $FirmaComponente = $_POST['Firma'];
    $DataInizioComponente = $_POST['DataInizio'];
    $DataFineComponente = $_POST['DataFine'];
    $ImmagineComponente = $_POST['Immagine'];
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $data= date("Y-m-d H:i:s");
    try{
        $stmt = $db->prepare("SELECT * FROM componenti_aggiuntivi WHERE Titolo = ?");
        $stmt->bind_param("s", $TitoloComponente);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Titolo già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    try{
        $stmt = $db->prepare("SELECT * FROM componenti_aggiuntivi WHERE Testo = ?");
        $stmt->bind_param("s", $CorpoComponente);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Corpo già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    $stmt = $db->prepare("INSERT INTO componenti_aggiuntivi (Data, Prof, Titolo, Testo, Data_inizio, Data_fine, Immagine) VALUE (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $data, $FirmaComponente, $TitoloComponente, $CorpoComponente, $DataInizioComponente, $DataFineComponente, $ImmagineComponente);
    $stmt->execute();
    $stmt->close();
    $db->close();
    $_SESSION['last_activity'] = time();
    require ('GestoreNumeroPagine.php');
    echo json_encode(["success" => true, "message" => "Componente inserito correttamente"]);
}