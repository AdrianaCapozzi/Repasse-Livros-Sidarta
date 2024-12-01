// Função para inicializar a API
function initGoogleAPI() {
    gapi.load('client:auth2', initClient);
}

// Inicializando o cliente da API
function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
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
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // ID da planilha
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
