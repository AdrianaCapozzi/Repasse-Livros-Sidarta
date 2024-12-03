document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Chamada à API do Apps Script
    fetch(`https://script.google.com/macros/s/AKfycbzW30I_j-G_ZldChJJthzR4jxXf8fg4tGnbmezeAhWdv_biPwPVj6UEwcP0DbD0TWNs/exec`, {
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
