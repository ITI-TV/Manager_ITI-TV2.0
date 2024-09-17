function start() {
    //fetch sul file getUrsername.php per ottenere il nome utente
    fetch('php/getUsername.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore HTTP, status = ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('BenvenutoUsername').innerHTML = data;
        })
        .catch(error => {
            console.error('Errore durante il fetch:', error);
        });
}

start();