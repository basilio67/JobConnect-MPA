const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Configure sua conexão PostgreSQL (Neon)
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_0YNGe7EmFnxa@ep-steep-tree-agxr745k-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false } // Necessário para Neon
});

// Criação da tabela jobs se não existir
pool.query(`
  CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    empresa TEXT,
    local TEXT,
    imagem TEXT,
    email TEXT
  )
`).catch(console.error);

module.exports = pool;