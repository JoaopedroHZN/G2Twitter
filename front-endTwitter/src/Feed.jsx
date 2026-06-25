// Feed.jsx (Front-end)
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Lembre-se de instalar: npm install axios

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Simulação de usuário logado para poder postar agora
  const mockUserId = 1; 

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await axios.post('http://localhost:3001/posts', {
        content: newPost,
        user_id: mockUserId
      });
      setNewPost('');
      fetchPosts(); // Recarrega a lista após postar
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:3001/posts/${postId}/like`);
      fetchPosts(); // Atualiza a contagem de likes
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  return (
    <div className="feed-container">
      <h2>Página Inicial</h2>
      
      {/* Área de "O que estou pensando?" */}
      <div className="compose-box">
        <form onSubmit={handlePostSubmit}>
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="O que estou pensando?"
            maxLength={140}
          />
          <button type="submit">Postar</button>
        </form>
      </div>

      {/* Lista de Posts */}
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <p>{post.content}</p>
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>
                ❤️ {post.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}