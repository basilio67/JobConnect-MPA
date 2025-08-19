const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Use disco persistente em produção (Render)
const dbPath = process.env.RENDER ? '/data/jobconnect.db' : './jobconnect.db';

// Garante que o diretório /data existe em produção
if (process.env.RENDER) {
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

const db = new sqlite3.Database(dbPath);

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
