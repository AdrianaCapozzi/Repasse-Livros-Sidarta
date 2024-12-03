document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Chamada à API do Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxAgOTBDewvikGCTXCpefJRhGRys18MvDVSNfywTlUvbsybIYe3DxTztFQDeKfk3XSw/exec', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'perfil.html'; // Redireciona após sucesso
        } else {
            document.getElementById('errorMsg').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Evento para o botão de cadastro
document.getElementById('registerButton').addEventListener('click', function() {
    const username = prompt('Digite seu nome de usuário (login):');
    const password = prompt('Digite sua senha numérica de 6 dígitos:');

    if (!username || !password || password.length !== 6 || isNaN(password)) {
        alert('Dados inválidos! Certifique-se de preencher corretamente.');
        return;
    }

    // Chamada à API para cadastro
    fetch('https://script.google.com/macros/s/AKfycbxAgOTBDewvikGCTXCpefJRhGRys18MvDVSNfywTlUvbsybIYe3DxTztFQDeKfk3XSw/exec', {
        method: 'POST',
        body: JSON.stringify({ username, password, action: 'register' }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuário cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Erro ao cadastrar:', error);
    });
});
