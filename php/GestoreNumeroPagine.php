<?php
$NumeroComunicazioni = 0;
$NumeroComponentiAggiuntivi = 0;
$NumeroEventiGiornalieri = 0;

$PagineComunicazioni = 0;
$PagineComponentiAggiuntivi = 0;
$PagineEventiGiornalieri = 0;

require ("infoAccess.php");
$db = new mysqli($serverConn, $usernameConn, $passwordConn, $dbnameConn);
if ($db->connect_error) {
    echo json_encode(["success" => false, "message" => "Errore di connessione al database"]);
    exit;
}
$stmt = $db->prepare("SELECT * FROM comunicazione WHERE Tag = 'comunicazione' ORDER BY Data ");
$stmt->execute();
$result = $stmt->get_result();
$comunicazioni = [];
while($row = $result->fetch_assoc()){
    $comunicazioni[] = $row;
}
$NumeroComunicazioni = count($comunicazioni);
$NumeroComunicazioni = $NumeroComunicazioni - 1;

$stmt = $db->prepare("SELECT * FROM componenti_aggiuntivi ORDER BY Data ");
$stmt->execute();
$result = $stmt->get_result();
$componenti_aggiuntivi = [];
while($row = $result->fetch_assoc()){
    $componenti_aggiuntivi[] = $row;
}
$NumeroComponentiAggiuntivi = count($componenti_aggiuntivi);

$day = date("d");
$mounth = date("m");
$stmt = $db->prepare("SELECT * FROM eventi_giornalieri WHERE Giorno = $day AND Mese = $mounth");
$stmt->execute();
$result = $stmt->get_result();
$eventi_giornalieri = [];
while($row = $result->fetch_assoc()){
    $eventi_giornalieri[] = $row;
}
$NumeroEventiGiornalieri = count($eventi_giornalieri);

$stmt = $db->prepare("SELECT * FROM moltiplicatoriprogrammazione");
$stmt->execute();
$result = $stmt->get_result();
$programmazione = [];
while($row = $result->fetch_assoc()){
    $programmazione[] = $row;
}
$NumeroProgrammazione = count($programmazione);

$MinutiTotali = [];
for ($i = 0; $i < $NumeroProgrammazione; $i++){
    $orarioInizio = $programmazione[$i]['Ora_Inizio'];
    $orarioFine = $programmazione[$i]['Ora_Fine'];

    $datetimeInizio = new DateTime($orarioInizio);
    $datetimeFine = new DateTime($orarioFine);

    if ($datetimeFine < $datetimeInizio) {
        $datetimeFine->modify('+1 day');
    }

    $differenza = $datetimeFine->diff($datetimeInizio);

    $MinutiTotali[$i] = ($differenza->days * 24 * 60) + ($differenza->h * 60) + $differenza->i;
}

$MinutiTotaliComunicazioni = [];
$MinutiTotaliComponentiAggiuntivi = [];
$MinutiTotaliEventiGiornalieri = [];

for($i = 0; $i < $NumeroProgrammazione; $i++){
    $MinutiTotaliComunicazioni[$i] = $MinutiTotali[$i]/3 * $programmazione[$i]['MoltComunicazioni'];
    $MinutiTotaliComunicazioni[$i] = floor($MinutiTotaliComunicazioni[$i]);
    $MinutiTotali[$i]= $MinutiTotali[$i] - $MinutiTotaliComunicazioni[$i];
    $MinutiTotaliComponentiAggiuntivi[$i] = $MinutiTotali[$i]/2 * $programmazione[$i]['MoltComponentiAggiuntivi'];
    $MinutiTotaliComponentiAggiuntivi[$i] = floor($MinutiTotaliComponentiAggiuntivi[$i]);
    $MinutiTotali[$i]= $MinutiTotali[$i] - $MinutiTotaliComponentiAggiuntivi[$i];
    $MinutiTotaliEventiGiornalieri[$i] = $MinutiTotali[$i] * $programmazione[$i]['MoltEventiGiornalieri'];
    $MinutiTotaliEventiGiornalieri[$i] = floor($MinutiTotaliEventiGiornalieri[$i]);
    if ($NumeroComponentiAggiuntivi === 0){
        $MinutiTotaliComunicazioni[$i] = $MinutiTotaliComunicazioni[$i] + $MinutiTotaliComponentiAggiuntivi[$i];
        $MinutiTotaliComponentiAggiuntivi[$i] = 0;
    }
    if ($NumeroEventiGiornalieri === 0){
        $MinutiTotaliComunicazioni[$i] = $MinutiTotaliComunicazioni[$i] + $MinutiTotaliEventiGiornalieri[$i];
        $MinutiTotaliEventiGiornalieri[$i] = 0;
    }
}

$stmt = $db->prepare("TRUNCATE TABLE programmazione");
$stmt->execute();
for($i = 0; $i < $NumeroProgrammazione; $i++){
    $stmt = $db->prepare("INSERT INTO programmazione (Ora_Inizio, Ora_Fine, Numero_Comunicazioni, Numero_Componenti_Aggiuntivi, Numero_Eventi_Giornalieri) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiii", $programmazione[$i]['Ora_Inizio'], $programmazione[$i]['Ora_Fine'], $MinutiTotaliComunicazioni[$i], $MinutiTotaliComponentiAggiuntivi[$i], $MinutiTotaliEventiGiornalieri[$i]);
    $stmt->execute();
}