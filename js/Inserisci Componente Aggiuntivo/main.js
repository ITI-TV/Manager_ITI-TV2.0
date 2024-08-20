function startInserimentoComponenteAggiuntivo() {
    //inserisco il nome del prof nel box di firma
    document.getElementById('ProfComponentiAggiuntivi').innerHTML = document.getElementById('username').value;
    //ascolto formTitoloComponentiAggiuntivi quando scrivo
    document.getElementById('formTitoloComponentiAggiuntivi').addEventListener('input', checkLunghezzaTitolo);
    //ascolto formCorpoComponentiAggiuntivi quando scrivo
    document.getElementById('formTestoComponentiAggiuntivi').addEventListener('input', checkLunghezzaCorpo);
    //ascolto formInizioComponentiAggiuntivi quando cambio data
    document.getElementById('formDataInizioComponentiAggiuntivi').addEventListener('change', checkDateInizio);
    document.getElementById('formDataFineComponentiAggiuntivi').addEventListener('change', checkDateFine);
    //aggiungo un evento per uqando viene inserita un'immagine
    document.getElementById('formImmagineComponentiAggiuntivi').addEventListener('change', function(){
        document.getElementById('ImmagineComponentiAggiuntivi').src = URL.createObjectURL(this.files[0]);
    });
    //ascolto se il bottone di invio è premuto
    document.getElementById('submitComponenteAggiuntivo').addEventListener('click', invioComponenteAggiuntivo);
}

function checkLunghezzaTitolo(){
    //rimuovo la classe error
    document.getElementById('formTitoloComponentiAggiuntivi').classList.remove('error');
    //se la lunghezza è maggiore di 100 caratteri elimino i caratteri di troppo
    if(document.getElementById('formTitoloComponentiAggiuntivi').value.length > 100){
        document.getElementById('formTitoloComponentiAggiuntivi').value = document.getElementById('formTitoloComponentiAggiuntivi').value.substring(0, 100);
    }
    //se la lunghezza è minore di 1 do la classe error
    if(document.getElementById('formTitoloComponentiAggiuntivi').value.length < 1) {
        document.getElementById('formTitoloComponentiAggiuntivi').classList.add('error');
    }
    document.getElementById('textFormTitoloComponentiAggiuntivi').innerHTML = document.getElementById('formTitoloComponentiAggiuntivi').value.length + '/100';
    document.getElementById('TitoloComponentiAggiuntivi').innerHTML = document.getElementById('formTitoloComponentiAggiuntivi').value;
}

function checkLunghezzaCorpo(){
    //rimuovo la classe error
    document.getElementById('formTestoComponentiAggiuntivi').classList.remove('error');
    //se la lunghezza è maggiore di 1000 caratteri elimino i caratteri di troppo
    if(document.getElementById('formTestoComponentiAggiuntivi').value.length > 625){
        document.getElementById('formTestoComponentiAggiuntivi').value = document.getElementById('formTestoComponentiAggiuntivi').value.substring(0, 625);
    }
    //se la lunghezza è minore di 1 do la classe error
    if(document.getElementById('formTestoComponentiAggiuntivi').value.length < 1) {
        document.getElementById('formTestoComponentiAggiuntivi').classList.add('error');
    }
    document.getElementById('textFormTestoComponentiAggiuntivi').innerHTML = document.getElementById('formTestoComponentiAggiuntivi').value.length + '/625';
    document.getElementById('TestoComponentiAggiuntivi').innerHTML = document.getElementById('formTestoComponentiAggiuntivi').value;
}

function checkDateFine(){
    //se la data di fine è minore della data di inizio allora sostituisco la data di inizio con la data di fine
    if(document.getElementById('formDataFineComponentiAggiuntivi').value < document.getElementById('formDataInizioComponentiAggiuntivi').value){
        document.getElementById('formDataInizioComponentiAggiuntivi').value = document.getElementById('formDataFineComponentiAggiuntivi').value;
    }
}

function checkDateInizio(){
    //se la data di inizio è maggiore della data di fine allora sostituisco la data di fine con la data di inizio
    if(document.getElementById('formDataInizioComponentiAggiuntivi').value > document.getElementById('formDataFineComponentiAggiuntivi').value){
        document.getElementById('formDataFineComponentiAggiuntivi').value = document.getElementById('formDataInizioComponentiAggiuntivi').value;
    }
}

function invioComponenteAggiuntivo(){
    checkSession(function (isLoggedIn) {
        if (isLoggedIn){
            // Controllo se i campi sono stati compilati correttamente
            if(document.getElementById('formTitoloComponentiAggiuntivi').value.length < 1 ||
                document.getElementById('formTestoComponentiAggiuntivi').value.length < 1) {
                alert('Compilare tutti i campi');
                return;
            }

            //controllo che ci sua un file selezionato
            if(document.getElementById('formImmagineComponentiAggiuntivi').files.length < 1){
                alert('Caricare un\'immagine');
                return;
            }

            //controllo che ci sua una data di inizio e di fine
            if(document.getElementById('formDataInizioComponentiAggiuntivi').value.length < 1 || document.getElementById('formDataFineComponentiAggiuntivi').value.length < 1){
                alert('Inserire una data di inizio e di fine');
                return;
            }

            // Salvo l'immagine nella cartella giusta
            let firmaComponenteAggiuntivo = document.getElementById('username').value;
            let formData = new FormData();
            formData.append('file', document.getElementById('formImmagineComponentiAggiuntivi').files[0]);

            // Invia il file al server
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/uploadImage.php', true);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    // Ricevo il nome del file salvato dal server
                    let response = xhr.responseText;

                    // Salvo il componente aggiuntivo nel database
                    $.post('php/setters.php', {
                        Titolo: document.getElementById('formTitoloComponentiAggiuntivi').value,
                        Corpo: document.getElementById('formTestoComponentiAggiuntivi').value,
                        DataInizio: document.getElementById('formDataInizioComponentiAggiuntivi').value,
                        DataFine: document.getElementById('formDataFineComponentiAggiuntivi').value,
                        Immagine: response,
                        Firma: firmaComponenteAggiuntivo,
                        action: 'setComponenteAggiuntivo'
                    })
                        .done(function(response) {
                            alert('Componente aggiuntivo inserito correttamente');
                            // Pulisco i campi
                            document.getElementById('formTitoloComponentiAggiuntivi').value = '';
                            document.getElementById('formTestoComponentiAggiuntivi').value = '';
                            document.getElementById('formDataInizioComponentiAggiuntivi').value = '';
                            document.getElementById('formDataFineComponentiAggiuntivi').value = '';
                            document.getElementById('formImmagineComponentiAggiuntivi').value = '';
                            document.getElementById('textFormTitoloComponentiAggiuntivi').innerHTML = '0/100';
                            document.getElementById('textFormTestoComponentiAggiuntivi').innerHTML = '0/625';
                            document.getElementById('TitoloComponentiAggiuntivi').innerHTML = '';
                            document.getElementById('TestoComponentiAggiuntivi').innerHTML = '';
                        })
                        .fail(function(error) {
                            console.error('Errore nella query:', error);
                        });
                } else {
                    console.error('Errore nel caricamento dell\'immagine:', xhr.statusText);
                }
            };

            xhr.onerror = function() {
                console.error('Errore nel caricamento dell\'immagine:', xhr.statusText);
            };

            xhr.send(formData);
        }
    });
}


startInserimentoComponenteAggiuntivo();