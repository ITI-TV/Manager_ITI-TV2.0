<?php
session_start();
//se action è setComm predo le info di NumeroComunicazione, TitoloComunicazione, CorpoComunicazione, InizioComunicazione, FineComunicazione e lo carico sul DB nella tabella Comunicazioni
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
    $tag = "Comunicazione";
    try {
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Numero = ?");
        $stmt->bind_param("s", $NumeroComunicazione);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            //output in json
            echo json_encode(["success" => false, "message" => "Comunicazione già presente"]);
            exit;
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Errore nella query"]);
        exit;
    }
    try{
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Titolo = ?");
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
        $stmt = $db->prepare("SELECT * FROM comunicazione WHERE Corpo = ?");
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
    echo json_encode(["success" => true, "message" => "Comunicazione inserita correttamente"]);
}else if($_POST['action']=="getLastComm"){
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $stmt = $db->prepare("SELECT * FROM comunicazione ORDER BY Data DESC LIMIT 1");
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();
    $db->close();
    echo json_encode(["success" => true, "Numero" => $row['Numero'], "Titolo" => $row['Titolo'], "Corpo" => $row['Corpo'], "Data_inizio" => $row['Data_inizio'], "Data_fine" => $row['Data_fine'], "Firma" => $row['Prof']]);
}