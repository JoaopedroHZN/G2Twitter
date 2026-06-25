import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Auth from './Auth';
// Importe o Feed que o seu amigo já estilizou
import Feed from './Feed'; 

function App() {
  const { user } = useContext(AuthContext);

  // Se não tiver usuário logado, mostra a tela de Login/Cadastro
  // Se tiver, mostra o Feed da rede social
  return (
    <div>
      {user ? <Feed /> : <Auth />}
    </div>
  );
}

export default App;