const fs = require('fs');
const db = require('./database');

const vagas = JSON.parse(fs.readFileSync('./vagas.json', 'utf8'));

function inserirVaga(vaga, cb) {
    db.run(
        'INSERT INTO jobs (title, description, empresa, local, imagem, email) VALUES (?, ?, ?, ?, ?, ?)',
        [
            vaga.titulo || '',
            vaga.descricao || '',
            vaga.empresa || '',
            vaga.local || '',
            vaga.imagem || '',
            vaga.email || ''
        ],
        cb
    );
}

let count = 0;
vagas.forEach(vaga => {
    inserirVaga(vaga, (err) => {
        if (err) {
            console.error('Erro ao migrar vaga:', vaga, err);
        } else {
            count++;
            if (count === vagas.length) {
                console.log('Migração concluída:', count, 'vagas migradas.');
                process.exit(0);
            }
        }
    });
});
