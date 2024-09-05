<?php
if(isset($_GET['action']) && $_GET['action'] == "getComunicazioni"){
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $stmt = $db->prepare("SELECT * FROM comunicazione ORDER BY Data ");
    $stmt->execute();
    $result = $stmt->get_result();
    $comunicazioni = [];
    while($row = $result->fetch_assoc()){
        $comunicazioni[] = $row;
    }
    $stmt->close();
    $db->close();
    echo json_encode($comunicazioni);
}else if($_GET['action'] == "getContatti") {
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $stmt = $db->prepare("SELECT * FROM infocontatto");
    $stmt->execute();
    $result = $stmt->get_result();
    $contatti = [];
    while($row = $result->fetch_assoc()){
        $contatti[] = $row;
    }
    echo json_encode($contatti);
}else if($_GET['action'] == "getComponentiAggiuntivi") {
    require "infoAccess.php";
    $db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
    if ($db->connect_error) {
        echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
        exit;
    }
    $stmt = $db->prepare("SELECT * FROM componenti_aggiuntivi ORDER BY Data ");
    $stmt->execute();
    $result = $stmt->get_result();
    $eventi = [];
    while ($row = $result->fetch_assoc()) {
        $eventi[] = $row;
    }
    echo json_encode($eventi);
}