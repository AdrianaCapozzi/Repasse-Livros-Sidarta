// Cadastro de usuário
document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    fetch('https://script.google.com/macros/s/AKfycbxAgOTBDewvikGCTXCpefJRhGRys18MvDVSNfywTlUvbsybIYe3DxTztFQDeKfk3XSw/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            alert(data.mensagem);
        } else {
            document.getElementById('errorMsg').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Erro ao salvar usuário:', error);
    });
});

// Botão de cadastro
document.getElementById('registerButton').addEventListener('click', function() {
    const username = prompt('Digite seu nome de usuário (login):');
    const password = prompt('Digite sua senha numérica de 6 dígitos:');

    if (!username || !password || password.length !== 6 || isNaN(password)) {
        alert('Dados inválidos! Certifique-se de preencher corretamente.');
        return;
    }

    fetch('https://script.google.com/macros/s/AKfycbxAgOTBDewvikGCTXCpefJRhGRys18MvDVSNfywTlUvbsybIYe3DxTztFQDeKfk3XSw/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, action: 'register' })
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

// Lógica para perguntas condicionais
document.getElementById('yesButton').addEventListener('click', function() {
    alert('Ótimo! Vamos ajudá-lo a conseguir os livros.');
});

document.getElementById('noButton').addEventListener('click', function() {
    alert('Tudo bem! Boa sorte nos estudos!');
});

// Exibe a seção condicional com base em uma interação
setTimeout(() => {
    document.getElementById('conditionalSection').style.display = 'block';
}, 3000);
