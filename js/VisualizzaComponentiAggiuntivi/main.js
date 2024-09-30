function startVisualizzazioneComponenteAggiuntivo() {
    fetch('php/getters.php?action=getComponentiAggiuntivi')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let riga = document.createElement('tr');
                let titoloComponenteAggiuntivo = document.createElement('td');
                let corpoComponenteAggiuntivo = document.createElement('td');
                let dataInizioComponenteAggiuntivo = document.createElement('td');
                let dataFineComponenteAggiuntivo = document.createElement('td');
                let profComponenteAggiuntivo = document.createElement('td');
                let azioniComponenteAggiuntivo = document.createElement('td');
                let visualizza = document.createElement('button');
                visualizza.classList.add('BottoneVisualizzaComunicazione');
                visualizza.innerHTML = '<img src="img/UI/occhio.png"> ';
                visualizza.addEventListener('click', function () {
                    let TitoloComponenteAggiuntivo = document.getElementById('TitoloComponentiAggiuntivi');
                    let CorpoComponenteAggiuntivo = document.getElementById('TestoComponentiAggiuntivi');
                    let FirmaComponenteAggiuntivo = document.getElementById('ProfComponentiAggiuntivi');
                    let ImmagineComponenteAggiuntivo = document.getElementById('ImmagineComponentiAggiuntivi');

                    TitoloComponenteAggiuntivo.innerText = data[i]['Titolo'];
                    CorpoComponenteAggiuntivo.innerText = data[i]['Testo'];
                    FirmaComponenteAggiuntivo.innerText = data[i]['Prof'];
                    ImmagineComponenteAggiuntivo.src = data[i]['Immagine'];
                });
                titoloComponenteAggiuntivo.innerText = data[i]['Titolo'];
                corpoComponenteAggiuntivo.innerText = data[i]['Testo'];
                dataInizioComponenteAggiuntivo.innerText = data[i]['Data_Inizio'];
                dataFineComponenteAggiuntivo.innerText = data[i]['Data_Fine'];
                profComponenteAggiuntivo.innerText = data[i]['Prof'];
                azioniComponenteAggiuntivo.appendChild(visualizza);
                riga.appendChild(titoloComponenteAggiuntivo);
                riga.appendChild(corpoComponenteAggiuntivo);
                riga.appendChild(dataInizioComponenteAggiuntivo);
                riga.appendChild(dataFineComponenteAggiuntivo);
                riga.appendChild(profComponenteAggiuntivo);
                riga.appendChild(azioniComponenteAggiuntivo);
                document.getElementById('ListaComponenti').appendChild(riga);
            }
        });

}

startVisualizzazioneComponenteAggiuntivo();