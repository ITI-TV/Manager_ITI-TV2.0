function startVisualizzazioneComunicazioni(){
    fetch('php/getters.php?action=getComunicazioni')
        .then(response => response.json())
        .then(data => {
            for (let i=3; i<data.length; i++){
                let riga = document.createElement('tr');
                let numeroComunicazione = document.createElement('td');
                let titoloComunicazione = document.createElement('td');
                let corpoComunicazione = document.createElement('td');
                let dataInizioComunicazione = document.createElement('td');
                let dataFineComunicazione = document.createElement('td');
                let tipoComunicazione = document.createElement('td');
                let profComunicazione = document.createElement('td');
                let azioniComunicazione = document.createElement('td');
                let visualizza = document.createElement('button');
                //aggiungo classe a visualizza
                visualizza.classList.add('BottoneVisualizzaComunicazione');
                visualizza.innerHTML = '<img src="img/UI/occhio.png" alt="Visualizza">';
                visualizza.addEventListener('click', function(){
                    if(data[i]['Tag'] === 'comunicazione') {
                        let NumeroComunicazioneAnteprima = document.getElementById('NumeroVisualizzazioneComunicazioneAnteprima');
                        let TitoloComunicazioneAnteprima = document.getElementById('TitoloVisualizzazioneComunicazioneAnteprima');
                        let CorpoComunicazioneAnteprima = document.getElementById('CorpoVisualizzazioneComunicazioneAnteprima');
                        let FirmaComunicazioneAnteprima = document.getElementById('FirmaVisualizzazioneComunicazioneAnteprima');

                        NumeroComunicazioneAnteprima.innerText = data[i]['Numero'];
                        TitoloComunicazioneAnteprima.innerText = data[i]['Titolo'];
                        CorpoComunicazioneAnteprima.innerText = data[i]['Corpo'];
                        FirmaComunicazioneAnteprima.innerText = data[i]['Prof'];
                    }else if(data[i]['Tag'] === 'news') {
                        let CorpoComunicazioneAnteprima = document.getElementById('CorpoVisualizzazioneComunicazioneAnteprima');

                        CorpoComunicazioneAnteprima.innerHTML = 'Non è possibile visualizzare le News come Comunicazioni';
                    }else{
                        let CorpoComunicazioneAnteprima = document.getElementById('CorpoVisualizzazioneComunicazioneAnteprima');

                        CorpoComunicazioneAnteprima.innerHTML = 'Non è possibile visualizzare le Emergenze come Comunicazioni';
                    }
                });
                numeroComunicazione.innerText = data[i]['Numero'];
                titoloComunicazione.innerText = data[i]['Titolo'];
                corpoComunicazione.innerText = data[i]['Corpo'];
                dataInizioComunicazione.innerText = data[i]['Data_inizio'];
                dataFineComunicazione.innerText = data[i]['Data_fine'];
                tipoComunicazione.innerText = data[i]['Tag'];
                profComunicazione.innerText = data[i]['Prof'];
                azioniComunicazione.appendChild(visualizza);
                riga.appendChild(numeroComunicazione);
                riga.appendChild(titoloComunicazione);
                riga.appendChild(corpoComunicazione);
                riga.appendChild(dataInizioComunicazione);
                riga.appendChild(dataFineComunicazione);
                riga.appendChild(tipoComunicazione);
                riga.appendChild(profComunicazione);
                riga.appendChild(azioniComunicazione);
                document.getElementById('ListaComunicazioni').appendChild(riga);
            }
    
        });

}

startVisualizzazioneComunicazioni();