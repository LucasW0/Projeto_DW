// Adiciona um evento de clique ao botão 'Carregar Dados'
document.getElementById('loadData').addEventListener('click', function() {
    // Faz uma requisição GET para a API local para buscar dados dos focos de incêndio
    fetch('http://localhost:3000/focosDeIncendio')
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            const dataContainer = document.getElementById('data');
            dataContainer.innerHTML = ''; // Limpa o conteúdo atual do contêiner de dados

            // Itera sobre cada foco de incêndio e cria um elemento div para exibir as informações
            data.forEach(foco => {
                const focoDiv = document.createElement('div');
                focoDiv.className = 'foco-item'; // Define a classe do elemento para estilização
                focoDiv.innerHTML = `
                    <p><span class="label">Latitude:</span> ${foco.latitude}</p>
                    <p><span class="label">Longitude:</span> ${foco.longitude}</p>
                    <p><span class="label">Intensidade:</span> ${foco.intensidade}</p>
                    <p><span class="label">Data:</span> ${foco.data}</p>
                `;
                dataContainer.appendChild(focoDiv); // Adiciona o novo elemento ao contêiner de dados
            });
        })
        .catch(error => {
            // Exibe um erro no console se a requisição falhar
            console.error('Erro ao carregar os dados:', error);
        });
});

// Adiciona um evento de envio ao formulário de relatório
document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores dos campos do formulário
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const intensidade = document.getElementById('intensidade').value;
    const dataFoco = document.getElementById('dataFoco').value;

    // Cria um objeto com os dados do novo foco de incêndio
    const novoFoco = {
        latitude: parseFloat(latitude), // Converte latitude para número
        longitude: parseFloat(longitude), // Converte longitude para número
        intensidade: intensidade,
        data: dataFoco
    };

    // Faz uma requisição POST para a API local para adicionar o novo foco de incêndio
    fetch('http://localhost:3000/focosDeIncendio', {
        method: 'POST', // Define o método da requisição como POST
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(novoFoco) // Converte o objeto novoFoco para uma string JSON
    })
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {
        // Exibe uma mensagem de sucesso e limpa o formulário
        document.getElementById('mensagem').textContent = 'Foco de incêndio informado com sucesso!';
        document.getElementById('mensagem').style.color = 'green'; // Define a cor da mensagem para verde
        document.getElementById('reportForm').reset(); // Limpa o formulário
    })
    .catch(error => {
        // Exibe uma mensagem de erro se a requisição falhar
        document.getElementById('mensagem').textContent = 'Erro ao enviar os dados.';
        document.getElementById('mensagem').style.color = 'red'; // Define a cor da mensagem para vermelho
    });
});
