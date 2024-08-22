document.getElementById('reportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Coleta os valores do formulário
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const intensidade = document.getElementById('intensidade').value;
    const dataFoco = document.getElementById('dataFoco').value;

    // Constrói o objeto JSON
    const dadosFoco = {
        latitude,
        longitude,
        intensidade,
        dataFoco
    };

    // Envia a requisição
    fetch('/report-fire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosFoco), // Converte o objeto para JSON string
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem').textContent = data.message;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    app.post('/report-fire', (req, res) => {
        console.log(req.body);  // Verifique o que está sendo recebido
    
        const { latitude, longitude, intensidade, dataFoco } = req.body;
    
        // Continue com a validação e processamento...
});