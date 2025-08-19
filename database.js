const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./jobconnect.db');

// Criação da tabela jobs com todos os campos necessários
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    empresa TEXT,
    local TEXT,
    imagem TEXT,
    email TEXT
  )`);
});

module.exports = db;
