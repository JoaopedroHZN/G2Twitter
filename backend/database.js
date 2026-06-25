const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./microtweet.db', (err) => {
  if (err) console.error('Erro ao conectar ao banco:', err.message);
  else console.log('Conectado ao banco SQLite com sucesso!');
});

db.serialize(() => {
  // 1. Tabela de Usuários (Senha com Hash)
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )`);

  // 2. Tabela de Posts
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // 3. Tabela de Favoritos (Curtidas)
  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    user_id INTEGER,
    post_id INTEGER,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
  )`);
});

module.exports = db;