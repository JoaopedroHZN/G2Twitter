# 🐦 MicroTweet

> [cite_start]*"Em memória do Twitter antigo. Simples, rápido e direto ao ponto."* [cite: 10, 22]

[cite_start]Bem-vindo ao **MicroTweet**, uma rede social minimalista desenvolvida como projeto final (G2) para a disciplina de Desenvolvimento de Software para Web[cite: 1]. 

## 👨‍💻 Desenvolvedores
* [cite_start]**João Pedro** * **[Carlos Eduardo]** [cite: 40]

## 🚀 Tecnologias Utilizadas
[cite_start]A stack obrigatória [cite: 18, 19] foi seguida à risca para garantir a melhor performance:
* [cite_start]**Frontend:** React (inicializado com Vite) [cite: 19]
* [cite_start]**Backend:** Node.js com Express [cite: 19]
* [cite_start]**Banco de Dados:** SQLite (com tabelas de users, posts e favorites) [cite: 19, 33, 34, 35, 36]
* [cite_start]**Segurança:** Hashes de senha utilizando `bcrypt` [cite: 26]

## ✨ Features Implementadas
- [x] [cite_start]**Autenticação:** Criação de conta, Login e Logout (Requisito 4.1)[cite: 24, 25].
- [x] [cite_start]**Segurança Blindada:** Senhas NUNCA são salvas em texto puro[cite: 26].
- [x] [cite_start]**Feed Dinâmico:** Leitura de posts para visitantes e área de composição exclusiva para usuários logados (Requisito 4.2)[cite: 27, 28, 29, 30, 31].
- [x] [cite_start]**Feature Extra (Surpresa!):** Alternância instantânea entre **Tema Claro e Tema Escuro**, garantindo conforto visual para os corujões da timeline[cite: 44].

## 🌐 Deploy (Links da Aplicação)
O sistema está no ar! [cite_start]Você pode testar diretamente pelos links abaixo[cite: 15, 46]:
* **Frontend (Interface):** [g2-twitter-psh2gdujp-joaopedrohzns-projects.vercel.app]
* **Backend (API):** [https://g2twitter.onrender.com]

---

## 🛠️ Como rodar o projeto localmente

[cite_start]Caso queira rodar a aplicação em sua própria máquina, siga os passos abaixo[cite: 41]:

### 1. Preparando o terreno
Faça o clone deste repositório e acesse a pasta raiz:
\`\`\`bash
git clone https://github.com/JoaopedroHZN/G2Twitter.git
cd microtweet
\`\`\`

### 2. Rodando o Backend (Obrigatório iniciar primeiro)
Abra um terminal, entre na pasta do servidor, instale as dependências e inicie:
\`\`\`bash
cd backend
npm install
npm start
\`\`\`
*Nota: O banco de dados SQLite (`microtweet.db`) será gerado automaticamente na primeira execução.*

### 3. Rodando o Frontend
Mantenha o terminal do backend aberto, abra um **novo terminal**, acesse a pasta da interface e inicie o Vite:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
A aplicação estará disponível no seu navegador em `http://localhost:5173`.

---

## 🤖 Uso de Inteligência Artificial
[cite_start]Conforme as instruções da prova [cite: 4, 6, 7][cite_start], este repositório contém uma pasta chamada `/prompts`[cite: 42]. [cite_start]Dentro dela, o arquivo `amostras.txt` documenta os principais prompts estruturados enviados via interface web de IA (chatbot) para auxiliar na construção da arquitetura e resolução de gargalos durante o desenvolvimento[cite: 42].
