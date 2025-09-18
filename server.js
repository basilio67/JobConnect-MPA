const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./database');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para garantir CORS
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Listar vagas
app.get('/vagas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jobs');
        const vagas = result.rows.map(vaga => ({
            id: vaga.id,
            titulo: vaga.title,
            empresa: vaga.empresa,
            local: vaga.local,
            descricao: vaga.description,
            imagem: vaga.imagem,
            email: vaga.email
        }));
        res.json(vagas);
    } catch (err) {
        res.status(500).send('Erro ao buscar vagas');
    }
});

// Adicionar vaga
app.post('/vagas', async (req, res) => {
    const { titulo, empresa, local, descricao, imagem, email } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO jobs (title, description, empresa, local, imagem, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [titulo, descricao, empresa, local, imagem, email]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        res.status(500).send('Erro ao adicionar vaga');
    }
});

// Remover vaga por id
app.delete('/vagas/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM jobs WHERE id = $1', [req.params.id]);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).send('Erro ao remover vaga');
    }
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Atualize a rota raiz para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
app.use(cors({
    origin:"https://jobconnect-mpa.onrender.com"
}));

app.get("/", (req, res) =>{
    res.send("CORS funcionando");
});

