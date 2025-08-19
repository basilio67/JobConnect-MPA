const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Listar vagas
app.get('/vagas', (req, res) => {
    db.all('SELECT * FROM jobs', [], (err, rows) => {
        if (err) return res.status(500).send('Erro ao buscar vagas');
        // Mapeia os campos para o padrão do frontend
        const vagas = rows.map(vaga => ({
            id: vaga.id,
            titulo: vaga.title,
            empresa: vaga.empresa,
            local: vaga.local,
            descricao: vaga.description,
            imagem: vaga.imagem,
            email: vaga.email
        }));
        res.json(vagas);
    });
});

// Adicionar vaga
app.post('/vagas', (req, res) => {
    const { titulo, empresa, local, descricao, imagem, email } = req.body;
    db.run(
        'INSERT INTO jobs (title, description, empresa, local, imagem, email) VALUES (?, ?, ?, ?, ?, ?)',
        [titulo, descricao, empresa, local, imagem, email],
        function(err) {
            if (err) return res.status(500).send('Erro ao adicionar vaga');
            res.status(201).json({ id: this.lastID });
        }
    );
});

// Remover vaga por id
app.delete('/vagas/:id', (req, res) => {
    db.run('DELETE FROM jobs WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).send('Erro ao remover vaga');
        res.json({ ok: true });
    });
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