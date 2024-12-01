// Função para inicializar a API
function initGoogleAPI() {
    gapi.load('client:auth2', initClient);
}

// Inicializando o cliente da API
function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ["https://script.google.com/macros/s/AKfycbwIfF2p8rZXVbdTT51uDDbjPT4JQKPL5kFFki7ZTGHk3EI_uCsxliLT1MnvbdqoD7f8/exec"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(function () {
        console.log("API Initialized");
    });
}

// Função para autenticar o usuário
function authenticate() {
    return gapi.auth2.getAuthInstance().signIn();
}

// Função para enviar dados para o Google Sheets
function sendDataToSheets(data) {
    const spreadsheetId = '        discoveryDocs: ["https://script.google.com/macros/s/AKfycbwIfF2p8rZXVbdTT51uDDbjPT4JQKPL5kFFki7ZTGHk3EI_uCsxliLT1MnvbdqoD7f8/exec"]; // ID da planilha
    const range = 'Usuarios!A1'; // Aqui você pode escolher o intervalo onde os dados serão inseridos
    const valueRangeBody = {
        "values": data
    };

    const request = gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: "RAW",
        resource: valueRangeBody
    });

    request.then(function(response) {
        console.log('Dados enviados:', response);
    }, function(error) {
        console.error('Erro ao enviar dados:', error);
    });
}

// Quando o formulário for enviado
document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Coletando dados do formulário
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const celular = document.getElementById("celular").value;
    const serie = document.getElementById("serie_2025").value;
    const temLivros = document.querySelector('input[name="temLivros"]:checked').value;

    // Enviando os dados para o Google Sheets
    const dados = [
        [nome, senha, celular, serie, temLivros]
    ];
    sendDataToSheets(dados);
});

document.getElementById("serie").addEventListener("change", function() {
    var serie = this.value; // Obtém a série selecionada
    
    if (serie) {
      // Substitua pela URL do seu Google Apps Script
      var url = 'URL_DO_SEU_SCRIPT?serie=' + encodeURIComponent(serie);
      
      // Faz a requisição ao Apps Script
      fetch(url)
        .then(response => response.json())
        .then(livros => {
          var livrosList = document.getElementById("livros");
          livrosList.innerHTML = ""; // Limpa a lista de livros anterior
  
          // Adiciona cada livro à lista
          livros.forEach(livro => {
            var li = document.createElement("li");
            li.textContent = livro[1]; // Supondo que o nome do livro está na segunda coluna da planilha
            livrosList.appendChild(li);
          });
        })
        .catch(error => console.error('Erro:', error));
    } else {
      // Caso nenhuma série seja selecionada
      document.getElementById("livros").innerHTML = "<li>Por favor, selecione uma série.</li>";
    }
  });
  