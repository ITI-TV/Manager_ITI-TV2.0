function startContatti(){
    fetch('php/getters.php?action=getContatti')
        .then(response => response.json())
        .then(data => {
            for (let i=0; i<data.length; i++){
                if(data[i]['Tipo']=== 'Prof') {
                    let riga = document.createElement('tr');
                    let nomeContatto = document.createElement('td');
                    let cognomeContatto = document.createElement('td');
                    let emailContatto = document.createElement('td');
                    nomeContatto.innerText = data[i]['Nome'];
                    cognomeContatto.innerText = data[i]['Cognome'];
                    emailContatto.innerText = data[i]['Mail'];
                    riga.appendChild(nomeContatto);
                    riga.appendChild(cognomeContatto);
                    riga.appendChild(emailContatto);
                    document.getElementById('ReferentiProgetto').appendChild(riga);
                }else{
                    let riga = document.createElement('tr');
                    let nomeContatto = document.createElement('td');
                    let cognomeContatto = document.createElement('td');
                    let emailContatto = document.createElement('td');
                    nomeContatto.innerText = data[i]['Nome'];
                    cognomeContatto.innerText = data[i]['Cognome'];
                    emailContatto.innerText = data[i]['Mail'];
                    riga.appendChild(nomeContatto);
                    riga.appendChild(cognomeContatto);
                    riga.appendChild(emailContatto);
                    document.getElementById('ProjectManagerProgetto').appendChild(riga);
                }
            }
        });
}

startContatti();