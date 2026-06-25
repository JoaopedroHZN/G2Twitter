import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import './Feed.css'; // 🔥 Importando o visual!

export default function Feed() {
    const { user, logout } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    // Função para buscar os posts no nosso Backend Node
    const carregarPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
        }
    };

    // Executa assim que a tela abre
    useEffect(() => {
        carregarPosts();
    }, []);

    // Função disparada ao clicar em "Postar"
    const handlePostar = async () => {
        if (!content.trim()) return;

        try {
            await axios.post('http://localhost:3000/api/posts', {
                user_id: user.id,
                content: content
            });
            setContent(''); // Limpa o campo de texto
            carregarPosts(); // Recarrega a lista para mostrar o post novo na hora
        } catch (error) {
            console.error("Erro ao publicar:", error);
        }
    };

    return (
        <div className="feed-container">
            {/* Cabeçalho */}
            <header className="feed-header">
                <h2>🐦 MicroTweet</h2>
                <div className="user-info">
                    <span>Olá, <strong>{user?.name}</strong>!</span>
                    <button onClick={logout} className="logout-btn">Sair</button>
                </div>
            </header>

            {/* Caixa de Nova Postagem */}
            <div className="compose-box">
                <textarea 
                    placeholder="O que está acontecendo?" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={140}
                />
                <div className="compose-actions">
                    <span className="char-count">{140 - content.length}</span>
                    <button onClick={handlePostar} className="post-btn">Postar</button>
                </div>
            </div>

            {/* Lista de Posts */}
            <div className="posts-list">
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <div className="post-avatar">{post.author.charAt(0).toUpperCase()}</div>
                        <div className="post-content">
                            <div className="post-author">
                                <strong>{post.author}</strong>
                            </div>
                            <p className="post-text">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}