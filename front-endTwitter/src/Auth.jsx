import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Auth.css'; // Vamos criar um CSS rapidinho pra ele ficar bonito

export default function Auth() {
    const { login, cadastrar } = useContext(AuthContext);
    
    // Controle de estado para alternar entre Login e Cadastro
    const [isLogin, setIsLogin] = useState(true);
    
    // Estados dos inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores

        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await cadastrar(name, email, password);
        }

        if (!result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-logo">🐦 MicroTweet</h1>
                <h2>{isLogin ? 'Entrar no MicroTweet' : 'Criar sua conta'}</h2>
                
                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <input 
                            type="text" 
                            placeholder="Seu Nome" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    )}
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    
                    <button type="submit" className="auth-button">
                        {isLogin ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>

                <p className="auth-toggle">
                    {isLogin ? 'Ainda não tem conta? ' : 'Já tem uma conta? '}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Cadastre-se' : 'Faça login'}
                    </span>
                </p>
            </div>
        </div>
    );
}