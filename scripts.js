// Função para inicializar a API
function initGoogleAPI() {
    gapi.load('client:auth2', initClient);
}

// Inicializando o cliente da API
function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY',
        clientId: 'YOUR_CLIENT_ID',
        discoveryDocs: ["https://script.google.com/macros/s/AKfycbzruVrw38y-YXiweZSyKJZTKtiTl8VOwMEkOdA4ZQNkGJ8evkOgJbjiRnzb2XQ9JD2H/exec"],
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
    const spreadsheetId = '        discoveryDocs: ["https://script.google.com/macros/s/AKfycbzruVrw38y-YXiweZSyKJZTKtiTl8VOwMEkOdA4ZQNkGJ8evkOgJbjiRnzb2XQ9JD2H/exec"]; // ID da planilha
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
      var url = 'https://script.google.com/macros/s/AKfycbzruVrw38y-YXiweZSyKJZTKtiTl8VOwMEkOdA4ZQNkGJ8evkOgJbjiRnzb2XQ9JD2H/exec' + encodeURIComponent(serie);
      
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






  // Referências aos elementos do formulário
const serieSelect = document.getElementById("serie");
const perguntaRepassar = document.getElementById("pergunta-repassar");
const btnSim = document.getElementById("btn-sim");
const btnNao = document.getElementById("btn-nao");
const livrosRepassar = document.getElementById("livros-repassar");
const livrosRepassarSelect = document.getElementById("livros-repassar-select");
const livrosNecessarios = document.getElementById("livros-necessarios");
const livrosNecessariosSelect = document.getElementById("livros-necessarios-select");

// Exibe a pergunta sobre repassar livros após selecionar as séries
serieSelect.addEventListener("change", function () {
  if (serieSelect.selectedOptions.length > 0) {
    perguntaRepassar.style.display = "block";
  }
});

// Quando o usuário clica em "Sim" ou "Não" na pergunta sobre repassar livros
btnSim.addEventListener("click", function () {
  livrosRepassar.style.display = "block";

  // Busca os livros da série anterior e preenche o select
  const seriesSelecionadas = Array.from(serieSelect.selectedOptions).map(opt => opt.value);
  const seriesAnteriores = seriesSelecionadas.map(serie => obterSerieAnterior(serie));

  seriesAnteriores.forEach(serie => {
    fetch(`URL_DO_SEU_SCRIPT?serie=${serie}`)
      .then(response => response.json())
      .then(livros => {
        livros.forEach(livro => {
          const option = document.createElement("option");
          option.value = livro[1];
          option.textContent = livro[1];
          livrosRepassarSelect.appendChild(option);
        });
      });
  });
});

btnNao.addEventListener("click", function () {
  livrosNecessarios.style.display = "block";

  // Busca os livros da série selecionada e preenche o select
  const seriesSelecionadas = Array.from(serieSelect.selectedOptions).map(opt => opt.value);

  seriesSelecionadas.forEach(serie => {
    fetch(`URL_DO_SEU_SCRIPT?serie=${serie}`)
      .then(response => response.json())
      .then(livros => {
        livros.forEach(livro => {
          const option = document.createElement("option");
          option.value = livro[1];
          option.textContent = livro[1];
          livrosNecessariosSelect.appendChild(option);
        });
      });
  });
});

// Função auxiliar para obter a série anterior
function obterSerieAnterior(serie) {
  const series = ["G5", "1° ano", "2° ano", "3° ano", "4° ano", "5° ano", "6° ano", "7° ano", "8° ano", "9° ano", "1º serie EM", "2º serie EM", "3º serie EM"];
  const index = series.indexOf(serie);
  return index > 0 ? series[index - 1] : null;
}



function mostrarLivrosRepassar(mostrar) {
    document.getElementById("livrosRepassar").style.display = mostrar ? "block" : "none";
}

function mostrarLivrosNecessarios(mostrar) {
    document.getElementById("livrosNecessarios").style.display = mostrar ? "block" : "none";
}

  
const livros = {

    g5: [
        "O que é preciso pra ser rei? (1º bimestre)",
        "Carona (2º bimestre)",
        "A revolta dos gizes de cera (3º bimestre)",
        "O pássaro encantado (4º bimestre)",
        "Bichodário (do 1º bimestre ao 4º bimestre)"
    ],

    "1ano": [
        "Ligamundo matemática (livro e caderno de atividades)",
        "Achou? (1º bimestre)",
        "Monstro azul (2º bimestre)",
        "Mesma nova história (3º bimestre)",
        "Os vizinhos (4º bimestre)",
        "Estranha madame Mizu (1º semestre)",
        "Meu primeiro livro de contos de fadas (2º semestre)",
        "As férias do pequeno Nicolau (2º semestre)"
    ],

    "2ano": [
        "Ligamundo matemática (livro e caderno de atividades)",
        "De volta (1º bimestre)",
        "As roupas novas dos reis (2º bimestre)",
        "Minha Família Enauenê (3º bimestre)",
        "Carol (4º bimestre)",
        "Nove novos contos de fadas e de princesas (2º semestre)",
        "Noite de brinquedo (2º semestre)",
        "Science Skills 2 AB W/Online Activities"
    ],

    "3ano": [
        "Buriti Plus Português (caderno de atividades)",
        "Lola y Leo Paso a Paso LIBRO DEL ALUMNO 1 (2024) 2 (2025)",
        "Ligamundo matemática (livro e caderno de atividades)",
        "Science Skills 3 AB W/Online Activities",
        "Muito esquisito (1º bimestre)",
        "Diário das águas (2º bimestre)",
        "Álbum de família (3º bimestre)",
        "Um dia, um rio (4º bimestre)",
        "Mania de explicação: peça em seis atos (2º semestre)",
        "Diário de Pilar na Amazônia - Urgente! (nova edição) (2º semestre)"
    ],

    "4ano": [
        "Lampião & Lancelote (1º bimestre)", 
        "Pequenas Grandes Sonhadoras: mulheres visionárias ao redor do mundo (2º bimestre)",
        "Lendas da Amazônia... e é assim até hoje! (3º bimestre)",
        "A África recontada para crianças (4º bimestre)",
        "Português: Projeto Presente - Língua Portuguesa - 6º ed. (livro)",
        "Mini Aurelio: o dicionário da língua portuguesa (8ª ed.)",
        "Matemática: Ligamundo (livro e caderno de atividades)",
        "Projeto Presente - Ciências Humanas Integrado - 6º ed. (livro)",
	    "Atlas Geográfico Escolar (volume único) - Comprar apenas no 4º ano e alunos novos",
        "Buriti Plus Ciências (livro)",
        "Buriti Plus Ciências (caderno de atividades)",
        "Lola y Leo Paso a Paso 2 (2024) 3 (2025)"
                
    ],

    "5ano": [
        "Projeto Presente - Língua Portuguesa - 6º ed. (livro)",
        "Mini Aurelio: o dicionário da língua portuguesa (8ª ed.)",
        "Ligamundo (livro e caderno de atividades)",
        "Projeto Presente - Ciências Humanas Integrado - 6º ed. (livro)",
        "Atlas Geográfico Escolar (volume único) - Só alunos novos",
        "Buriti Plus Ciências (livro)",
        "Buriti Plus Ciências (caderno de atividades)",
        "Lola y Leo Paso a Paso 3 (2024) Reporteros Brasil 1 (2025)",
        "Vendo poemas (1º bimestre)",
        "Dois meninos de Kakuma (2º bimestre)",
        "Histórias greco-romanas (3º bimeste)",
        "Iara sob supseita (4º bimestre)"
     
    ],

    "6ano": [
        "O meu quintal é maior do que o mundo (1º bimestre)",
        "Mil Milhas (2º bimestre)",
        "Mais de 100 histórias maravilhosas (3º bimestre)",
        "Lendas negras (4º bimestre)",
        "Convergências (livro)",
        "Mini Aurelio: o dicionário da língua portuguesa (8ª ed.)",
        "Geração Alpha - 5º ed. (livro)",
        "Araribá Plus - História (livro)",
        "Araribá Plus - Geografia (livro)",
        "Atlas Geográfico Escolar (volume único)- Só alunos novos"
    
    ],

    "7ano": [
        "Sol Lascado (1º bimestre)",                                                                                                          Obs.: Autor da região de Cotia, fazer a compra pelo site https://trovoar.lojaintegrada.com.br/ com o cupom SIDARTA para 10% de desconto e a entrega será feita no Sidarta, na primeira semana de aula.
        "Curupira (2º bimestre)",
        "Vidas secas (3º bimestre)",
        "Contos da selva (4º bimestre)",
        "Português: Convergências (livro)",
        "Mini Aurelio: o dicionário da língua portuguesa (8ª ed.)",
        "Geração Alpha - 5º ed. (livro)",
        "Araribá Plus - História Plus (livro)",
        "Araribá Plus - Geografia (livro)",
        "Atlas Geográfico Escolar (volume único) - só alunos novos)",
        "Ciências da Natureza: Geração Alpha - 5º ed. (livro)",
        "Reporteros Brasil 3"

    ],

    "8ano": [
        "Português: Convergências (livro)",
        "Matemática: Geração Alfa - 5º ed. (livro)",
        "Espanhol: Reporteros Brasil 4)",
        "Araribá Plus - Ciências (livro)",
        "Araribá Plus - História (livro)",
        "Araribá Plus - Geografia (livro)",
        "O perigo de uma história única (1º bimestre)",
        "Valentes: histórias de pessoas refugiadas no Brasil  (2º bimestre)",
        "O chinês americano (1º semestre)",
        "O fazedor de velhos (3º bimestre)",
        "Marcovaldo ou as estações na cidade  (4º bimestre)"

    ],

    "9ano": [
        "O dia do curinga  (1º bimestre)",
        "Maus (1º semestre)",
        "A revolução dos bichos  (2º bimestre)",
        "Torto Arado  (3º bimestre)",
        "Ligue os pontos: poemas de amor e big bang  (4º bimestre)",
        "Português: Convergências (livro)",
        "Matemática: Geração Alfa - 5º ed. (livro)",
        "Espanhol: Gente Joven 4",
        "Geração Alpha Ciências - 5º ed. (livro)",
        "Araribá Plus - História (livro)",
        "Araribá Plus - Geografia (livro)"

    ],

    "1medio": [
        "Espanhol: Nos Vemos Hoy 3",
        "Édipo rei  (1º bimestre)",
        "Prosas seguidas de ode mínimas  (2º bimestre)",
        "A metamorfose  (3º bimestre)",
        "Canção para ninar menino grande  (4º bimestre)"

    ],

    "2medio": [
        "Espanhol: Nos Vemos Hoy 3",
        "Opúsculo humanitário  (1º bimestre)",
        "Memórias de Martha  (2º bimestre)",
        "Dom Casmurro  (1º semestre)",
        "Balada do amor ao vento  (3º bimestre)",
        "Nebulosas  (4º bimestre)"

    ],

    "3medio": [
       "Espanhol: Nos Vemos Hoy 3",
       "A visão das plantas  (1º bimestre)",
       "Alguma poesia   (2º bimestre)",
       "Caminhos das pedras  (1º semestre)",
       "O cristo cigano e Geografia  (3º bimestre)",
       "As meninas  (4º bimestre)"

    ]
};

// Atualizar livros para repassar
function atualizarLivrosRepassar() {
    const serie2024 = document.getElementById("serie2024").value;
    const listaRepassar = document.getElementById("listaLivrosRepassar");

    if (livros[serie2024]) {
        listaRepassar.innerHTML = livros[serie2024]
            .map(livro => `<div><input type="checkbox" name="livros_repassar" value="${livro}"><label>${livro}</label></div>`)
            .join("");
    } else {
        listaRepassar.innerHTML = "<p>Nenhum livro disponível para esta série.</p>";
    }
}

// Atualizar livros necessários
function atualizarLivrosNecessarios() {
    const serie2025 = document.getElementById("serie2025").value;
    const listaNecessarios = document.getElementById("listaLivrosNecessarios");

    if (livros[serie2025]) {
        listaNecessarios.innerHTML = livros[serie2025]
            .map(livro => `<div><input type="checkbox" name="livros_necessarios" value="${livro}"><label>${livro}</label></div>`)
            .join("");
    } else {
        listaNecessarios.innerHTML = "<p>Nenhum livro disponível para esta série.</p>";
    }
}

// Enviar dados para Google Sheets
function sendDataToSheets(data) {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const range = 'Usuarios!A1';
    const valueRangeBody = { "values": data };

    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: "RAW",
        resource: valueRangeBody
    }).then(response => {
        console.log('Dados enviados:', response);
    }).catch(error => {
        console.error('Erro ao enviar dados:', error);
    });
}

// Coleta e envio dos dados do formulário
document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const celular = document.getElementById("celular").value;
    const serie = document.getElementById("serie2025").value;
    const temLivros = document.querySelector('input[name="temLivros"]:checked').value;

    const dados = [[nome, senha, celular, serie, temLivros]];
    sendDataToSheets(dados);
});

// Função para exibir ou ocultar seções
function mostrarLivrosRepassar(mostrar) {
    document.getElementById("livrosRepassar").style.display = mostrar ? "block" : "none";
}

function mostrarLivrosNecessarios(mostrar) {
    document.getElementById("livrosNecessarios").style.display = mostrar ? "block" : "none";
}

function atualizarEstiloDropdown(serie) {
    const series = {
        laranja: ["g5", "1ano", "2ano", "3ano"],
        verde: ["4ano", "5ano", "6ano", "7ano"],
        azul: ["8ano", "9ano", "1medio", "2medio", "3medio"]
    };

    let cor = '';
    if (grupos.laranja.includes(serie)) {
        cor = 'orange';
    } else if (grupos.verde.includes(serie)) {
        cor = 'green';
    } else if (grupos.azul.includes(serie)) {
        cor = 'blue';
    }

    const dropdowns = document.querySelectorAll('.livros-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.style.backgroundColor = cor;
    });
}


serie2024.addEventListener('change', () => {
    const serie = serie2024.value;
    if (serie) {
        atualizarListaLivros('repassar', serie);
        perguntaNecessarios.style.display = 'block';

        // Atualiza o estilo do dropdown conforme a série selecionada
        atualizarEstiloDropdown(serie);
    } else {
        livrosDropdownRepassar.style.display = 'none';
        perguntaNecessarios.style.display = 'none';
        livrosDropdownNecessarios.style.display = 'none';
    }
});

document.querySelectorAll('[name="livrosNecessarios"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value === 'sim') {
            // Mostra o dropdown e atualiza os livros da próxima série
            livrosDropdownNecessarios.style.display = 'block';
            const serieAtual = serie2024.value; // Série selecionada
            const proximaSerie = calcularProximaSerie(serieAtual);
            if (proximaSerie) {
                atualizarListaLivros('necessarios', proximaSerie);
            }
        } else {
            // Esconde o dropdown
            livrosDropdownNecessarios.style.display = 'none';
        }
    });
});


function calcularProximaSerie(serieAtual) {
    const series = ["g5", "1ano", "2ano", "3ano", "4ano", "5ano", "6ano", "7ano", "8ano", "9ano", "1medio", "2medio", "3medio"];
    const indiceAtual = series.indexOf(serieAtual);
    if (indiceAtual !== -1 && indiceAtual < series.length - 1) {
        return series[indiceAtual + 1]; // Retorna a próxima série
    }
    return null; // Caso não exista próxima série
}




