function startInserimentoComponenteAggiuntivo() {
    document.getElementById('ProfComponentiAggiuntivi').innerHTML = username;
    document.getElementById('formTitoloComponentiAggiuntivi').addEventListener('input', checkLunghezzaTitolo);
    document.getElementById('formTestoComponentiAggiuntivi').addEventListener('input', checkLunghezzaCorpo);
    document.getElementById('formDataInizioComponentiAggiuntivi').addEventListener('change', checkDateInizio);
    document.getElementById('formDataFineComponentiAggiuntivi').addEventListener('change', checkDateFine);
    document.getElementById('formImmagineComponentiAggiuntivi').addEventListener('change', function () {
        document.getElementById('ImmagineComponentiAggiuntivi').src = URL.createObjectURL(this.files[0]);
    });
    document.getElementById('submitComponenteAggiuntivo').addEventListener('click', invioComponenteAggiuntivo);
}

function checkLunghezzaTitolo() {
    document.getElementById('formTitoloComponentiAggiuntivi').classList.remove('error');
    if (document.getElementById('formTitoloComponentiAggiuntivi').value.length > 100) {
        document.getElementById('formTitoloComponentiAggiuntivi').value = document.getElementById('formTitoloComponentiAggiuntivi').value.substring(0, 100);
    }
    if (document.getElementById('formTitoloComponentiAggiuntivi').value.length < 1) {
        document.getElementById('formTitoloComponentiAggiuntivi').classList.add('error');
    }
    document.getElementById('textFormTitoloComponentiAggiuntivi').innerHTML = document.getElementById('formTitoloComponentiAggiuntivi').value.length + '/100';
    document.getElementById('TitoloComponentiAggiuntivi').innerHTML = document.getElementById('formTitoloComponentiAggiuntivi').value;
}

function checkLunghezzaCorpo() {
    document.getElementById('formTestoComponentiAggiuntivi').classList.remove('error');
    if (document.getElementById('formTestoComponentiAggiuntivi').value.length > 625) {
        document.getElementById('formTestoComponentiAggiuntivi').value = document.getElementById('formTestoComponentiAggiuntivi').value.substring(0, 625);
    }
    if (document.getElementById('formTestoComponentiAggiuntivi').value.length < 1) {
        document.getElementById('formTestoComponentiAggiuntivi').classList.add('error');
    }
    document.getElementById('textFormTestoComponentiAggiuntivi').innerHTML = document.getElementById('formTestoComponentiAggiuntivi').value.length + '/625';
    document.getElementById('TestoComponentiAggiuntivi').innerHTML = document.getElementById('formTestoComponentiAggiuntivi').value;
}

function checkDateFine() {
    if (document.getElementById('formDataFineComponentiAggiuntivi').value < document.getElementById('formDataInizioComponentiAggiuntivi').value) {
        document.getElementById('formDataInizioComponentiAggiuntivi').value = document.getElementById('formDataFineComponentiAggiuntivi').value;
    }
}

function checkDateInizio() {
    if (document.getElementById('formDataInizioComponentiAggiuntivi').value > document.getElementById('formDataFineComponentiAggiuntivi').value) {
        document.getElementById('formDataFineComponentiAggiuntivi').value = document.getElementById('formDataInizioComponentiAggiuntivi').value;
    }
}

function invioComponenteAggiuntivo() {
    checkSession(function (isLoggedIn) {
        if (isLoggedIn) {
            if (document.getElementById('formTitoloComponentiAggiuntivi').value.length < 1 ||
                document.getElementById('formTestoComponentiAggiuntivi').value.length < 1) {
                alert('Compilare tutti i campi');
                return;
            }

            if (document.getElementById('formImmagineComponentiAggiuntivi').files.length < 1) {
                alert('Caricare un\'immagine');
                return;
            }

            if (document.getElementById('formDataInizioComponentiAggiuntivi').value.length < 1 || document.getElementById('formDataFineComponentiAggiuntivi').value.length < 1) {
                alert('Inserire una data di inizio e di fine');
                return;
            }

            let firmaComponenteAggiuntivo = username;
            let formData = new FormData();
            formData.append('file', document.getElementById('formImmagineComponentiAggiuntivi').files[0]);

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/uploadImage.php', true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    let response = xhr.responseText;
                    console.log(response);

                    $.post('php/setters.php', {
                        Titolo: document.getElementById('formTitoloComponentiAggiuntivi').value,
                        Corpo: document.getElementById('formTestoComponentiAggiuntivi').value,
                        DataInizio: document.getElementById('formDataInizioComponentiAggiuntivi').value,
                        DataFine: document.getElementById('formDataFineComponentiAggiuntivi').value,
                        Immagine: response,
                        Firma: firmaComponenteAggiuntivo,
                        action: 'setComponenteAggiuntivo'
                    })
                        .done(function (response) {
                            alert('Componente aggiuntivo inserito correttamente');
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
                        .fail(function (error) {
                            console.error('Errore nella query:', error);
                        });
                } else {
                    console.error('Errore nel caricamento dell\'immagine:', xhr.statusText);
                }
            };

            xhr.onerror = function () {
                console.error('Errore nel caricamento dell\'immagine:', xhr.statusText);
            };

            xhr.send(formData);
        }
    });
}


startInserimentoComponenteAggiuntivo();