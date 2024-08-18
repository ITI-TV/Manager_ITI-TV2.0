function startInserimentoComponenteAggiuntivo() {
    //ascolto formTitoloComponentiAggiuntivi quando scrivo
    document.getElementById('formTitoloComponentiAggiuntivi').addEventListener('input', checkLunghezzaTitolo);
    //ascolto formCorpoComponentiAggiuntivi quando scrivo
    document.getElementById('formTestoComponentiAggiuntivi').addEventListener('input', checkLunghezzaCorpo);
    //ascolto formInizioComponentiAggiuntivi quando cambio data
    document.getElementById('formDataInizioComponentiAggiuntivi').addEventListener('change', checkDate);
    document.getElementById('formDataFineComponentiAggiuntivi').addEventListener('change', checkDate);
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

function checkDate(){

}

startInserimentoComponenteAggiuntivo();