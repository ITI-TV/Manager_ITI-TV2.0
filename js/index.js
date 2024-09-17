console.log('Benvenuto nel Manager del progetto ITI-TV dell`IIS "N.Copernico A.Carpeggiani"');
console.log('Versione b2.0.11');
console.log('Crediti: ');
console.log('. Classe 5X Informatica 2024/25 (Project Manager: Gabriele Bovina e Samuele Marinelli)');
console.log('. Classe 4X Informatica 2023/24 (Project Manager: Gabriele Bovina e Samuele Marinelli)');
console.log('. Classe 3X Informatica 2022/23 (Project Manager: Gabriele Bovina e Samuele Marinelli)');
console.log('. Classe 5X Informatica 2020/21 (Project Manager: Luca Corticelli e Diego Bonati)');
console.log('Ringraziamenti per il supporto e la collaborazione per gli eventi giornalieri: ');
console.log('. Macca 4T Telecomunicazioni 2024/25');

let username;

function checkSession(callback) {
    $.ajax({
        url: 'php/checkSession.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.loggedIn) {
                document.getElementById('userbox').style.display = 'block';
                if (callback) callback(true);
            } else {
                if (data.sessionExpired) {
                    alert("La tua sessione è scaduta. Effettua nuovamente il login.");
                    window.location.reload();
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Errore nel controllo della sessione:', textStatus, errorThrown);
            showLoginForm();
            if (callback) callback(false);
        }
    });
}

function loadContent(page) {
    checkSession(function (isLoggedIn) {
        if (isLoggedIn) {
            const contentMap = {
                'home': 'HTML/Benvenuto/main.html',
                'inserimento-comunicazione': 'HTML/InserimentoComunicazione/main.html',
                'inserimento-componente': 'HTML/InserimentoComponenteAggiuntivo/main.html',
                'visualizza-comunicazioni': 'HTML/VisualizzaComunicazioni/main.html',
                'visualizza-componenti': 'HTML/VisualizzaComponentiAggiuntivi/main.html',
                'eventi-giornalieri': 'HTML/VisualizzaModificaEventiGiornalieri/main.html',
                'informazioni-generali': 'HTML/InformazioniGenerali/main.html',
                'contatti': 'HTML/Contatti/main.html'
            };

            const url = contentMap[page] || contentMap['home'];

            $('#appContent').load(url, function (response, status, xhr) {
                //do la classe active alla pagina selezionata
                $('#navbar a').removeClass('active');
                $(`#navbar a[data-page="${page}"]`).addClass('active');
                if (status === 'error') {
                    console.error(`Errore nel caricamento di ${url}:`, xhr.status, xhr.statusText);
                }
            });
        }
    });
}

function setupNavigation() {
    $('#navbar').on('click', 'a', function (e) {
        e.preventDefault();
        const page = $(this).data('page');
        if (page) {
            loadContent(page);
        }
    });
    //sistemo la classe del userbox
    document.getElementById('userbox').classList.add('normalUserBox');
    //ascolto se userbox è cliccato
    document.getElementById('userbox').addEventListener('click', function () {
        //mostro il menu se è nascosto
        if (document.getElementById('boxInfo').style.display === 'none') {
            document.getElementById('boxInfo').style.display = 'block';
            document.getElementById('userbox').classList.add('userboxClicked');
            document.getElementById('userbox').classList.remove('normalUserBox')
        } else {
            //altrimenti lo nascondo
            document.getElementById('boxInfo').style.display = 'none';
            document.getElementById('userbox').classList.remove('userboxClicked');
            document.getElementById('userbox').classList.add('normalUserBox');
        }
    });
    //aggiungo un ascolto se viene premuto il tasto logout
    document.getElementById('logout').addEventListener('click', handleLogout);
    document.getElementById('usernameUserbox').innerHTML = 'Buongiorno <br>' + username;
}

function showLoggedInState() {
    document.getElementById('mainContentLogin').classList.add('minimizzato');
    $('#appContent').show();
    loadNavbar();
    loadContent('home');
}

function showLoginForm() {
    $('#loginContainer').show();
    $('#appContent').hide();
}

function loadCSRFToken() {
    $.get('php/generateToken.php')
        .done(function (token) {
            $('#csrf_token').val(token);
        })
        .fail(function (error) {
            console.error('Riavvio della pagina:', error);
            window.location.reload();
        });
}

function handleLogin(e) {
    e.preventDefault();

    const formData = {
        username: $('#username').val(),
        password: $('#password').val(),
        csrf_token: $('#csrf_token').val()
    };

    $.ajax({
        url: 'php/checkAccount.php',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function (data) {
            if (data.success) {

                fetch('php/getUsername.php')
                    .then(response => response.json())
                    .then(data => {
                        //assegno il nome utente alla variabile username
                        username = data;
                        //mostro il nome utente
                        console.log('Nome utente:', username);
                        //mostro il contenuto dell'app
                        document.getElementById('userbox').style.display = 'block';
                        showLoggedInState();
                    })
                    .catch(error => {
                        console.error('Errore nel recupero del nome utente:', error);
                        showLoginForm();
                    });
            } else {
                alert(data.message);
                window.location.reload();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Errore AJAX:', textStatus, errorThrown);
            $('#result').text('Errore di connessione al server');
        }
    });
}

function loadNavbar() {
    $('#navbar').load('HTML/navbar.html', function () {
        setupNavigation();
        const hamburgerButton = document.getElementById("hamburgerButton");
        const navbarMenu = document.getElementById("navbarNav");

        function openMenu() {
            navbarMenu.classList.add("show", "show-menu");
            document.addEventListener("click", handleOutsideClick);
            hamburgerButton.removeEventListener("click", openMenu);
        }

        function closeMenu() {
            if (navbarMenu.classList.contains("show")) {
                navbarMenu.classList.remove("show", "show-menu");
                document.removeEventListener("click", handleOutsideClick);
                hamburgerButton.addEventListener("click", openMenu);
            }
        }

        function handleOutsideClick(event) {
            if (!navbarMenu.contains(event.target) && !hamburgerButton.contains(event.target)) {
                closeMenu();
            }
        }

        hamburgerButton.addEventListener("click", openMenu);

        navbarMenu.addEventListener("click", function (event) {
            if (event.target.tagName === "A") {
                closeMenu();
            }
        });
    });
}

function handleLogout() {
    $.ajax({
        url: 'php/logout.php',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            console.log('Risposta logout:', data);
            if (data && data.success) {
                showLoginForm();
                $('#mainContent').empty();
                $('#loginForm')[0].reset();
                loadCSRFToken();
                window.location.reload();
            } else {
                console.error('Errore durante il logout:', data ? data.message : 'Risposta non valida');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Errore AJAX durante il logout:', textStatus, errorThrown);
            console.log('Risposta del server:', jqXHR.responseText);
        }
    });
}

$(document).ready(function () {
    checkSession(function (isLoggedIn) {
        if (isLoggedIn) {
            //contatto il file getUrsername.php per ottenere il nome utente
            fetch('php/getUsername.php')
                .then(response => response.json())
                .then(data => {
                    //assegno il nome utente alla variabile username
                    username = data;
                    //mostro il nome utente
                    console.log('Nome utente:', username);
                    //mostro il contenuto dell'app
                    showLoggedInState();
                })
                .catch(error => {
                    console.error('Errore nel recupero del nome utente:', error);
                    showLoginForm();
                });
        } else {
            showLoginForm();
        }
    });
    loadCSRFToken();

    $('#loginForm').on('submit', handleLogin);
});

