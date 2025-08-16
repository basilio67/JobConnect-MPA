const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;
const DB_FILE = './vagas.json';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Carregar vagas do arquivo
function lerVagas() {
    if (!fs.existsSync(DB_FILE)) return [];
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

// Salvar vagas no arquivo
function salvarVagas(vagas) {
    fs.writeFileSync(DB_FILE, JSON.stringify(vagas, null, 2));
}

// Listar vagas
app.get('/vagas', (req, res) => {
    res.json(lerVagas());
});

// Adicionar vaga
app.post('/vagas', (req, res) => {
    const vagas = lerVagas();
    vagas.push(req.body);
    salvarVagas(vagas);
    res.status(201).json({ ok: true });
});

// Remover vaga (opcional)
app.delete('/vagas/:index', (req, res) => {
    const vagas = lerVagas();
    vagas.splice(req.params.index, 1);
    salvarVagas(vagas);
    res.json({ ok: true });
});

// Rota para favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

// Rota para /
app.get('/', (req, res) => {
    res.send('Backend JobConnect MPA rodando.');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
