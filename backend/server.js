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
// Rota de Listar Posts (Contando os favoritos dinamicamente)
app.get('/api/posts', (req, res) => {
    const sql = `
        SELECT posts.*, 
               (SELECT COUNT(*) FROM favorites WHERE favorites.post_id = posts.id) as likes
        FROM posts 
        ORDER BY id DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ==========================================
// ROTA 4: CRIAR POST - Requisito 4.2
// ==========================================
// 🔥 Rota de Listar Posts (Trazendo o nome do autor e os likes)
app.get('/api/posts', (req, res) => {
    const sql = `
        SELECT posts.*, 
               users.name AS author,
               (SELECT COUNT(*) FROM favorites WHERE favorites.post_id = posts.id) as likes
        FROM posts 
        LEFT JOIN users ON posts.user_id = users.id
        ORDER BY posts.id DESC
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Rota para curtir o post (adicione no seu backend)
// 🔥 2. Rota para Curtir / Descurtir (Usando a tabela favorites)
app.post('/api/posts/:id/like', (req, res) => {
    const postId = req.params.id;
    const { user_id } = req.body; 

    if (!user_id) return res.status(400).json({ error: "user_id é obrigatório" });

    // Primeiro, verifica se este usuário já curtiu este post
    const checkSql = `SELECT * FROM favorites WHERE user_id = ? AND post_id = ?`;
    
    db.get(checkSql, [user_id, postId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (row) {
            // Se achou o registro, significa que já curtiu. Então vamos DESCURTIR (Deletar)
            db.run(`DELETE FROM favorites WHERE user_id = ? AND post_id = ?`, [user_id, postId], () => {
                res.json({ message: "Post descurtido!" });
            });
        } else {
            // Se não achou, significa que não curtiu. Então vamos CURTIR (Inserir)
            db.run(`INSERT INTO favorites (user_id, post_id) VALUES (?, ?)`, [user_id, postId], () => {
                res.json({ message: "Post curtido!" });
            });
        }
    });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend do MicroTweet rodando na porta ${PORT}`);
});