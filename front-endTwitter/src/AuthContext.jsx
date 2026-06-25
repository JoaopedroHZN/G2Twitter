import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Começa procurando se já tem alguém salvo no navegador
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('microtweet_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const api = axios.create({
        baseURL: 'http://localhost:3000/api'
    });

    // Função de Login
    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            setUser(response.data);
            localStorage.setItem('microtweet_user', JSON.stringify(response.data));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.error || "Erro ao logar" };
        }
    };

    // Função de Cadastro
    const cadastrar = async (name, email, password) => {
        try {
            const response = await api.post('/cadastro', { name, email, password });
            // Já loga o cara automaticamente após o cadastro
            setUser(response.data);
            localStorage.setItem('microtweet_user', JSON.stringify(response.data));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.error || "Erro ao cadastrar" };
        }
    };

    // Função de Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('microtweet_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, cadastrar, logout, api }}>
            {children}
        </AuthContext.Provider>
    );
};