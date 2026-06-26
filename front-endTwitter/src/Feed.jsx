import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';
import axios from 'axios';
import './Feed.css';

export default function Feed() {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext); 

    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    const carregarPosts = async () => {
        try {
            const response = await axios.get('https://g2twitter.onrender.com/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error("Erro ao carregar posts:", error);
        }
    };

    useEffect(() => {
        carregarPosts();
    }, []);

    const handlePostar = async () => {
        if (!content.trim()) return;

        try {
            await axios.post('http://localhost:3000/api/posts/', {
                user_id: user.id,
                content: content
            });
            setContent(''); 
            carregarPosts(); 
        } catch (error) {
            console.error("Erro ao publicar:", error);
        }
    };

    // 🔥 NOVA FUNÇÃO: Disparada ao clicar no botão de curtir
    const handleCurtir = async (postId) => {
        try {
            await axios.post(`http://localhost:3000/api/posts/${postId}/like`, {
                user_id: user.id // Agora estamos enviando o ID do usuário que clicou!
            });
            carregarPosts(); // Recarrega para mostrar a nova contagem
        } catch (error) {
            console.error("Erro ao curtir:", error);
        }
    };

    return (
        <div className={`app-wrapper ${theme}`}>
            <div className="feed-container">
                <header className="feed-header">
                    <h2>🐦 MicroTweet</h2>
                    <div className="user-info">
                        <button onClick={toggleTheme} className="theme-toggle-btn" style={{ marginRight: '15px' }}>
                            {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
                        </button>
                        <span>Olá, <strong>{user?.name}</strong>!</span>
                        <button onClick={logout} className="logout-btn">Sair</button>
                    </div>
                </header>

                <div className="compose-box">
                    <textarea 
                        placeholder="O que está acontecendo?" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={140}
                    />
                    <div className="compose-actions">
                        <span className="char-count">Maximo de letras {140 - content.length}</span>
                        <button onClick={handlePostar} className="post-btn">Postar</button>
                    </div>
                </div>

                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post.id} className="post-card">
                            <div className="post-avatar">{post.author?.charAt(0).toUpperCase()}</div>
                            <div className="post-content">
                                <div className="post-author">
                                    <strong>{post.author}</strong>
                                </div>
                                <p className="post-text">{post.content}</p>
                                
                                {/* 🔥 NOVO BOTÃO: Ações do Post (Curtir) */}
                                <div className="post-actions">
                                    <button onClick={() => handleCurtir(post.id)} className="like-btn">
                                        ❤️ {post.likes || 0}
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}