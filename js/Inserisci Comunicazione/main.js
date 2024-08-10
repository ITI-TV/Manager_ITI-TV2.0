function start(){
    lastComm();
    //faccio un ascolto a  TagComunicazione se viene selezionato Comunicazione, News o Emergenza
    document.getElementById('TagComunicazione').addEventListener('change', function() {
        //se Comunicazione è selezionato
        if (document.getElementById('TagComunicazione').value === 'Comunicazione') {
            //mostro TitoloComunicazione e il suo label
            document.getElementById('TitoloComunicazione').style.display = 'block';
            document.getElementById('labelTitoloComunicazione').style.display = 'block';
            //mostro NumeroComunicazione e il suo label
            document.getElementById('NumeroComunicazione').style.display = 'block';
            document.getElementById('labelNumeroComunicazione').style.display = 'block';
            document.getElementById('TitoloComunicazione').style.pointerEvents = 'auto';
            document.getElementById('CorpoComunicazione').style.pointerEvents = 'auto';
            document.getElementById('NumeroComunicazione').style.pointerEvents = 'auto';
            document.getElementById('DataFineComunicazione').style.pointerEvents = 'auto';
            document.getElementById('DataInizioComunicazione').style.pointerEvents = 'auto';
            document.getElementById('InserisciComunicazione').style.pointerEvents = 'auto';
            checkInfoComm();
        }
        //se News è selezionato
        else if (document.getElementById('TagComunicazione').value === 'News') {
            //nascondo TitoloComunicazione e il suo label
            document.getElementById('TitoloComunicazione').style.display = 'none';
            document.getElementById('labelTitoloComunicazione').style.display = 'none';
            //nascondo NumeroComunicazione e il suo label
            document.getElementById('NumeroComunicazione').style.display = 'none';
            document.getElementById('labelNumeroComunicazione').style.display = 'none';
            document.getElementById('CorpoComunicazione').style.pointerEvents = 'auto';
            document.getElementById('DataFineComunicazione').style.pointerEvents = 'auto';
            document.getElementById('DataInizioComunicazione').style.pointerEvents = 'auto';
            document.getElementById('InserisciComunicazione').style.pointerEvents = 'auto';
            checkInfoNews();
        }
        //se Emergenza è selezionato
        else if (document.getElementById('TagComunicazione').value === 'Emergenza') {
            //nascondo TitoloComunicazione e il suo label
            document.getElementById('TitoloComunicazione').style.display = 'none';
            document.getElementById('labelTitoloComunicazione').style.display = 'none';
            //nascondo NumeroComunicazione e il suo label
            document.getElementById('NumeroComunicazione').style.display = 'none';
            document.getElementById('labelNumeroComunicazione').style.display = 'none';
            document.getElementById('CorpoComunicazione').style.pointerEvents = 'auto';
            document.getElementById('DataFineComunicazione').style.pointerEvents = 'auto';
            document.getElementById('DataInizioComunicazione').style.pointerEvents = 'auto';
            document.getElementById('InserisciComunicazione').style.pointerEvents = 'auto';
            checkInfoEmerg();
        }
        //se niente è selezionato
        else {
            //mostro TitoloComunicazione e il suo label
            document.getElementById('TitoloComunicazione').style.display = 'block';
            document.getElementById('labelTitoloComunicazione').style.display = 'block';
            //mostro NumeroComunicazione e il suo label
            document.getElementById('NumeroComunicazione').style.display = 'block';
            document.getElementById('labelNumeroComunicazione').style.display = 'block';
            document.getElementById('TitoloComunicazione').style.pointerEvents = 'none';
            document.getElementById('CorpoComunicazione').style.pointerEvents = 'none';
            document.getElementById('NumeroComunicazione').style.pointerEvents = 'none';
            document.getElementById('DataFineComunicazione').style.pointerEvents = 'none';
            document.getElementById('DataInizioComunicazione').style.pointerEvents = 'none';
            document.getElementById('InserisciComunicazione').style.pointerEvents = 'none';
        }
    });
}

function checkInfoComm() {
    document.getElementById('FirmaComunicazioneAnteprima').innerHTML = document.getElementById('username').value;
    //controllo che il box NumeroComunicazione quando modificato quanto è grande il numero e che non sia maggione di 9999 o minore di 1
    document.getElementById('NumeroComunicazione').addEventListener('input', function () {
        if (document.getElementById('NumeroComunicazione').value.length > 4) {
            document.getElementById('NumeroComunicazione').value = document.getElementById('NumeroComunicazione').value.slice(0, 4);
        }
        if (document.getElementById('NumeroComunicazione').value > 9999) {
            document.getElementById('NumeroComunicazione').value = 9999;
        }
        if (document.getElementById('NumeroComunicazione').value < 1) {
            document.getElementById('NumeroComunicazione').value = 1;
        }
        document.getElementById('NumeroComunicazioneAnteprima').innerHTML = document.getElementById('NumeroComunicazione').value;
    });
    //controllo che il box TitoloComunicazione quando modificato che non sia maggione di 55 o minore di 1
    document.getElementById('TitoloComunicazione').addEventListener('input', function () {
        //tolgo la classe error
        document.getElementById('TitoloComunicazione').classList.remove('error');
        //conto i caratteri
        document.getElementById('labelTitoloComunicazione').innerHTML = document.getElementById('TitoloComunicazione').value.length + "/55";
        if (document.getElementById('TitoloComunicazione').value.length > 55) {
            document.getElementById('labelTitoloComunicazione').innerHTML = "55/55";
            document.getElementById('TitoloComunicazione').value = document.getElementById('TitoloComunicazione').value.slice(0, 55);
        }
        if (document.getElementById('TitoloComunicazione').value.length < 1) {
            //do la classe error
            document.getElementById('TitoloComunicazione').classList.add('error');
        }
        document.getElementById('TitoloComunicazioneAnteprima').innerHTML = document.getElementById('TitoloComunicazione').value;
    });
    document.getElementById('CorpoComunicazione').addEventListener('input', function () {
        //tolgo la classe error
        document.getElementById('CorpoComunicazione').classList.remove('error');
        //conto i caratteri
        document.getElementById('labelCorpoComunicazione').innerHTML = document.getElementById('CorpoComunicazione').value.length + "/300";
        if (document.getElementById('CorpoComunicazione').value.length > 300) {
            document.getElementById('labelCorpoComunicazione').innerHTML = "300/300";
            document.getElementById('CorpoComunicazione').value = document.getElementById('CorpoComunicazione').value.slice(0, 300);
        }
        if (document.getElementById('CorpoComunicazione').value.length < 1) {
            //do la classe error
            document.getElementById('CorpoComunicazione').classList.add('error');
        }
        document.getElementById('CorpoComunicazioneAnteprima').innerHTML = document.getElementById('CorpoComunicazione').value;
    });
    //controllo che data di fine non sia minore di data di inizio
    document.getElementById('DataFineComunicazione').addEventListener('change', function () {
        if (document.getElementById('DataFineComunicazione').value < document.getElementById('DataInizioComunicazione').value) {
            document.getElementById('DataInizioComunicazione').value = document.getElementById('DataFineComunicazione').value;
        }
    });
    //quado premo sul punsalte AggiungiComunicazione, controllo che TitoloComunicazione, CorpoComunicazione, NumeroComunicazione, DataInizioComunicazione e DataFineComunicazione non sia vuoto
    document.getElementById('InserisciComunicazione').addEventListener('click', function () {
        if (document.getElementById('TitoloComunicazione').value.length < 1 || document.getElementById('CorpoComunicazione').value.length < 1 || document.getElementById('NumeroComunicazione').value.length < 1 || document.getElementById('DataInizioComunicazione').value.length < 1 || document.getElementById('DataFineComunicazione').value.length < 1) {
            //faccio un alert (Messaggio per Samu,Qua puoi fare un pop up che viene fuori, fai come vuoi)
            alert('Compilare tutti i campi');
        }
        else{
            //contatto setters.php con action setComm e con tutti i parametri
            let firma = document.getElementById('username').value;
            $.post('php/setters.php', {
                action: 'setComm',
                Titolo: document.getElementById('TitoloComunicazione').value,
                Corpo: document.getElementById('CorpoComunicazione').value,
                Numero: document.getElementById('NumeroComunicazione').value,
                DataInizio: document.getElementById('DataInizioComunicazione').value,
                DataFine: document.getElementById('DataFineComunicazione').value,
                Firma : firma
            })
                .done(function (data) {
                    //faccio un alert (Messaggio per Samu,Qua puoi fare un pop up che viene fuori, fai come vuoi)
                    //decodifico data in json
                    let result = JSON.parse(data);
                    alert(result.message);
                    if (result.success) {
                        //svuoto tutti i campi
                        document.getElementById('TitoloComunicazione').value = '';
                        document.getElementById('CorpoComunicazione').value = '';
                        document.getElementById('NumeroComunicazione').value = '';
                        document.getElementById('DataInizioComunicazione').value = '';
                        document.getElementById('DataFineComunicazione').value = '';
                        //azzero i due counter
                        document.getElementById('labelTitoloComunicazione').innerHTML = "0/55";
                        document.getElementById('labelCorpoComunicazione').innerHTML = "0/300";
                        //azzero i box dell'anteprima
                        document.getElementById('NumeroComunicazioneAnteprima').innerHTML = '';
                        document.getElementById('TitoloComunicazioneAnteprima').innerHTML = '';
                        document.getElementById('CorpoComunicazioneAnteprima').innerHTML = '';
                        //richiamo lastComm
                        lastComm();
                    }
                })
                .fail(function (error) {
                    console.error('Errore:', error);
                });
        }
    });
}

function lastComm(){
    $.post('php/setters.php', {
        action: 'getLastComm'
    })
        .done(function (data) {
            //decodifico data in json
            let result = JSON.parse(data);
            //se result.success è true
            if (result.success) {
                //mostro le info della comunicazione
                document.getElementById('NumeroUltimaComunizazione').innerHTML = result.Numero;
                document.getElementById('TitoloUltimaComunicazione').innerHTML = result.Titolo;
                document.getElementById('CorpoUltimaComunicazione').innerHTML = result.Corpo;
                document.getElementById('FirmaUltimaComunicazione').innerHTML = result.Firma;
            }
        })
        .fail(function (error) {
            console.error('Errore:', error);
        });
}

start();