const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Obrigatório para a prova (HASH)
const db = require('./database'); // Importa nossa conexão do banco

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// ROTA 1: CADASTRO (Com Hash de Senha) - Requisito 4.1
// ==========================================
app.post('/api/cadastro', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Criptografa a senha antes de salvar (nunca em texto puro)
        const hash = await bcrypt.hash(password, 10);
        
        db.run(`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`,
            [name, email, hash],
            function(err) {
                if (err) return res.status(400).json({ error: "E-mail já cadastrado!" });
                res.status(201).json({ id: this.lastID, name, email });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// ==========================================
// ROTA 2: LOGIN - Requisito 4.1
// ==========================================
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err) return res.status(500).json({ error: "Erro no banco de dados" });
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        // Compara a senha digitada com o Hash do banco
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ error: "Senha incorreta!" });

        // Devolve os dados para o React salvar no Context/LocalStorage
        res.json({ id: user.id, name: user.name, email: user.email });
    });
});

// ==========================================
// ROTA 3: LISTAR POSTS (Global) - Requisito 4.2
// ==========================================
app.get('/api/posts', (req, res) => {
    const query = `
        SELECT posts.id, posts.content, posts.created_at, users.name as author, users.id as author_id
        FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar posts" });
        res.json(rows);
    });
});

// ==========================================
// ROTA 4: CRIAR POST - Requisito 4.2
// ==========================================
app.post('/api/posts', (req, res) => {
    const { user_id, content } = req.body;
    
    if (!user_id || !content) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    db.run(`INSERT INTO posts (user_id, content) VALUES (?, ?)`, [user_id, content], function(err) {
        if (err) return res.status(500).json({ error: "Erro ao publicar tweet" });
        res.status(201).json({ id: this.lastID, user_id, content });
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend do MicroTweet rodando na porta ${PORT}`);
});