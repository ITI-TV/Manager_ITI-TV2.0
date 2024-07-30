console.log('Benvenuto nel Manager del progetto ITI-TV dell`IIS "N.Copernico A.Carpeggiani"');
console.log('Versione b2.0.2');
console.log('Crediti: ');
console.log('. Classe 5X Informatica 2024/25 (Project Manager: Gabriele Bovina e Samuele Marinelli)');
console.log('. Classe 4X Informatica 2023/24 (Project Manager: Gabriele Bovina e Samuele Marinelli)');
console.log('. Classe 3X Informatica 2022/23 (Project Manager: Gabriele Bovina e Samuele Marinelli)');
console.log('. Classe 5X Informatica 2020/21 (Project Manager: Luca Corticelli e Diego Bonati)');
console.log('Ringraziamenti per il supporto e la collaborazione per gli eventi giornalieri: ');

$(document).ready(function() {
    checkSession();
    loadCSRFToken();
    $('#loginForm').on('submit', handleLogin);
});

function checkSession(callback) {
    $.ajax({
        url: 'php/checkSession.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.loggedIn) {
                if (callback) callback(true);
            } else {
                if (data.sessionExpired) {
                    alert("La tua sessione è scaduta. Effettua nuovamente il login.");
                    window.location.reload();
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Errore nel controllo della sessione:', textStatus, errorThrown);
            showLoginForm();
            if (callback) callback(false);
        }
    });
}

function loadContent(page) {
    checkSession(function(isLoggedIn) {
        if (isLoggedIn) {
            const contentMap = {
                'home': 'HTML/Benvenuto/main.html',
                'inserimento-comunicazione': 'HTML/InserimentoComunicazione/main.html',
                'inserimento-componente': 'HTML/InserimentoComponenteAggiuntivo/main.html',
                'visualizza-comunicazioni': 'HTML/VisualizzaComunicazioni/main.html',
                'eventi-giornalieri': 'HTML/VisualizzaModificaEventiGiornalieri/main.html',
                'contatti': 'HTML/Contatti/main.html'
            };

            const url = contentMap[page] || contentMap['home'];

            $('#mainContent').load(url, function(response, status, xhr) {
                if (status === 'error') {
                    console.error(`Errore nel caricamento di ${url}:`, xhr.status, xhr.statusText);
                }
            });
        }
    });
}

function setupNavigation() {
    $('#navbar').on('click', 'a', function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        if (page) {
            loadContent(page);
        } else if ($(this).attr('id') === 'logout') {
            handleLogout();
        }
    });
}

function showLoggedInState() {
    $('#loginContainer').hide();
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
        .done(function(token) {
            $('#csrf_token').val(token);
        })
        .fail(function(error) {
            console.error('Errore nel caricamento del token CSRF:', error);
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
        success: function(data) {
            if (data.success) {
                showLoggedInState(formData.username);
            } else {
                $('#result').text(data.message);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Errore AJAX:', textStatus, errorThrown);
            $('#result').text('Errore di connessione al server');
        }
    });
}

function loadNavbar() {
    $('#navbar').load('HTML/navbar.html', function() {
        setupNavigation();
    });
}

function handleLogout() {
    $.ajax({
        url: 'php/logout.php',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            console.log('Risposta logout:', data);
            if (data && data.success) {
                showLoginForm();
                $('#mainContent').empty();
                $('#loginForm')[0].reset();
                loadCSRFToken();
            } else {
                console.error('Errore durante il logout:', data ? data.message : 'Risposta non valida');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Errore AJAX durante il logout:', textStatus, errorThrown);
            console.log('Risposta del server:', jqXHR.responseText);
        }
    });
}

$(document).ready(function() {
    checkSession(function(isLoggedIn) {
        if (isLoggedIn) {
            showLoggedInState();
        } else {
            showLoginForm();
        }
    });
    loadCSRFToken();
    $('#loginForm').on('submit', handleLogin);
});