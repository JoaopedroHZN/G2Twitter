import React, { createContext, useState } from 'react';

// Cria o contexto
export const ThemeContext = createContext();

// Cria o Provider que vai abraçar a aplicação
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Começa no tema claro

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};