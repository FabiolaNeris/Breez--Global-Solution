# 🌤️ BREEZ - Monitoramento, previsibilidade, alerta, rotas de segurança e pontos de apoio em eventos climáticos extremos

Este é um aplicativo mobile para

- Receber recomendações de cuidados (hidratação, horários seguros para atividades ao ar livre).

- Planejar sua saída para os pontos mais frescos da cidade.

- Colaborar em uma rede de voluntários e órgãos públicos para atender emergências.


## 🚀 Funcionalidades

- Login e cadastro com autenticação
- Permissão de localização
- Temperatura do seu lugar atual
- Cadastro e visualização de rotas para planejar sua saída
- Tela de perfil com informações pessoais

## 🛠 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [Expo](https://expo.dev/)
- [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [Firebase](https://firebase.google.com/) (Firestore Database, Auth)
- [Styled-components](https://styled-components.com/) – Estilização
- [OpenWeather - API ](https://openweathermap.org/city/3470353)
## 📦 Instalação

### Pré-requisitos

- Node.js
- Yarn ou npm
- Expo CLI (se estiver usando Expo)  
  ```bash
  npm install -g expo-cli

### 1 - Clone o repositório
- Repositório  
  ```bash
  git clone https://github.com/FabiolaNeris/Breez--Global-Solution.git

### 2 - Instale as dependências
- Dependências
  ```bash
  yarn install
  #ou
  npm install

### 3 - Configure o Firebase:

- Crie um projeto no Firebase
- Ative o Firestore Database
- Copie suas credenciais do Firebase e crie um arquivo firebaseConfig.js:

### 4 - Gere uma chave de API no OpenWeather

- Gere uma chave de API na sua conta OpenWeather
- Substitua o valor da variável API_KEY pela chave gerada

### 5 - Inicie o app
Npm start

### Importante:
O aplicativo foi testado e renderizado na web, por estar na versão expo 53 que atualmente é incompatível com a autenticação do firebase.

Recomendamos fortemente que a aplicação seja testada na web, para isso, antes de rodar o projeto instale a seguinte dependência:
  - Web
    ```bash
    npx expo install react-dom react-native-web @expo/metro-runtime

## Estrutura de diretórios
- Projeto
  ```bash
    📦 Projeto
    ├── 📁 app                     # Páginas e rotas com Expo Router
    |   ├── 📁 editar-rota         # Pasta para rota de edição do item rota por id
    |   |   ├── 📄 [id].tsx           # Página de edição do item selecionado por ID
    │   ├── 📄 _layout.tsx            # Layout de navegação com condição por página
    │   ├── 📄 index.tsx              # Tela inicial Login
    │   ├── 📄 home.tsx               # Tela principal após login/cadastro
    │   ├── 📄 cadastrarUsuario.tsx   # Tela de cadastro de usuário
    │   ├── 📄 perfil.tsx             # Tela de perfil do usuário
    │   └── 📄 rotas.tsx              # Tela de cadastro de locais para mapeamento de rotas          
    ├── 📁 components              # Componentes reutilizáveis da interface
    │   ├── 📄 bottomTabBar.tsx       # Barra de navegação inferior personalizada
    │   ├── 📄 header.tsx             # Cabeçalho customizado
    │   └── 📄 itemRota.tsx           # Card visual individual para exibir locais cadastrados
    ├── 📁 services                # Integrações e utilitários externos
    │   └── 📄 firebaseConfig.tsx     # Configuração do Firebase (Firestore, Auth)
    ├── 📁 assets                  # Imagens, ícones, fontes e outros recursos estáticos
    ├── 📄 app.json / app.config.js  # Configurações do projeto Expo
    └── 📄 package.json              # Dependências e scripts do projeto

 ## Desenvolvido por
Fabiola Falcão **RM552715** TURMA 2TDSPC

Rafael Novaes **RM 553934** TURMA 2TDSPC

Carlos Henrique Nascimento **RM 553597** TURMA 2TDSPR
