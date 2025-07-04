# 📋 Task Manager

> Sistema de gerenciamento de tarefas moderno e intuitivo, desenvolvido com React e Vite.

## 📖 Sobre o Projeto

O Task Manager é uma aplicação web completa para gerenciamento de tarefas pessoais, permitindo que os usuários organizem suas atividades diárias de forma eficiente e visual. O sistema oferece uma interface moderna, com funcionalidades completas de CRUD (Create, Read, Update, Delete) para tarefas.

### ✨ Funcionalidades Principais

- 📝 **Criação de Tarefas**: Adicione novas tarefas com título, descrição e horário
- 📊 **Dashboard**: Visualize estatísticas das suas tarefas
- 🔄 **Gerenciamento de Status**: Controle o progresso das tarefas (não iniciada, em progresso, concluída)
- 🗑️ **Remoção de Tarefas**: Delete tarefas individuais ou todas de uma vez
- 🎨 **Animações Suaves**: Transições e animações para melhor experiência do usuário
- 🔔 **Notificações**: Feedback visual para todas as ações do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19.1.0** - Biblioteca JavaScript para construção de interfaces
- **Vite 7.0.1** - Bundler e servidor de desenvolvimento
- **React Router DOM 6.25.1** - Roteamento para aplicações React
- **Tailwind CSS 3.4.4** - Framework CSS utilitário
- **Tailwind Variants 0.2.1** - Variantes dinâmicas para Tailwind

### Gerenciamento de Estado

- **Tanstack Query 5.81.5** - Gerenciamento de estado servidor
- **React Hook Form 7.52.1** - Biblioteca para formulários

### UI/UX

- **React Transition Group 4.4.5** - Animações e transições
- **Sonner 2.0.5** - Notificações toast elegantes
- **Tailwind Variants** - Sistema de variantes para componentes

### Utilitários

- **Axios 1.7.7** - Cliente HTTP para requisições
- **UUID 10.0.0** - Geração de identificadores únicos
- **PropTypes 15.8.1** - Validação de props do React

### Backend

- **API REST** - Servidor backend separado ([task-manager-api](https://github.com/Kadockh/task-manager-api))
- **JSON Server** - Base da API para operações CRUD
- **Vercel** - Deploy da API em produção ([task-manager-api-alpha-ten.vercel.app](https://task-manager-api-alpha-ten.vercel.app))

### Ferramentas de Desenvolvimento

- **ESLint 8.57.1** - Linting de código JavaScript
- **Prettier 3.3.2** - Formatação de código
- **Husky 9.1.7** - Git hooks
- **Lint Staged 16.1.2** - Linting de arquivos staged

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.0.0 ou superior)
- **npm** (versão 9.0.0 ou superior) ou **yarn**
- **Git**

## 🚀 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/kadockh/task-manager.git
cd task-manager
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configuração da API

O projeto possui uma API REST separada. Você pode usar de duas formas:

#### Opção A: API em Produção (Recomendado)

A API já está deployada na Vercel e pode ser usada diretamente:

```env
VITE_API_URL=https://task-manager-api-alpha-ten.vercel.app
```

#### Opção B: API Local

Para desenvolvimento local, clone e execute o repositório da API:

```bash
# Clone a API em outro diretório
git clone https://github.com/Kadockh/task-manager-api.git
cd task-manager-api

# Instale as dependências
npm install

# Execute a API
npm start
```

### 4. Configuração de Variáveis de Ambiente

Crie um arquivo `.env.development` na raiz do projeto:

```env
# Para API em produção
VITE_API_URL=https://task-manager-api-alpha-ten.vercel.app

# Para API local (descomente se usar API local)
# VITE_API_URL=http://localhost:3000
```

### 5. Executar o Frontend

```bash
npm run dev
```

### 6. Acessar a Aplicação

- **Frontend**: [http://localhost:5173](http://localhost:5173) (ou [http://localhost:5174](http://localhost:5174) se a porta 5173 estiver em uso)
- **API Produção**: [https://task-manager-api-alpha-ten.vercel.app](https://task-manager-api-alpha-ten.vercel.app)
- **API Local**: [http://localhost:3000](http://localhost:3000) (se executando localmente)

## 📁 Estrutura do Projeto

### Frontend (Este repositório)

```
task-manager/
├── public/                 # Arquivos estáticos
├── src/
│   ├── _components/        # Componentes globais reutilizáveis
│   │   ├── AddTaskDialog.jsx
│   │   ├── ConfirmDeleteDialog.jsx
│   │   ├── Button.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Tasks.jsx
│   │   └── TaskDetails.jsx
│   ├── hooks/             # Hooks personalizados
│   │   └── data/          # Hooks para operações de dados
│   │       ├── use-get-tasks.js
│   │       ├── use-add-task.js
│   │       ├── use-delete-task.js
│   │       ├── use-delete-all-tasks.js
│   │       └── use-update-task.js
│   ├── keys/              # Chaves para queries e mutations
│   │   ├── queries.js
│   │   └── mutations.js
│   ├── lib/               # Configurações e utilitários
│   │   └── axios.js
│   ├── assets/            # Recursos estáticos (icons, images)
│   ├── main.jsx          # Ponto de entrada da aplicação
│   └── index.css         # Estilos globais
├── package.json          # Dependências e scripts
├── tailwind.config.js    # Configuração do Tailwind
├── vite.config.js        # Configuração do Vite
└── README.md            # Documentação do projeto
```

### Backend ([task-manager-api](https://github.com/Kadockh/task-manager-api))

```
task-manager-api/
├── api/                   # Endpoints da API
├── db.json               # Banco de dados simulado
├── package.json          # Dependências da API
├── vercel.json           # Configuração do Vercel
└── README.md            # Documentação da API
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção

# Qualidade de Código
npm run lint         # Executa o linting
npm run format       # Formata o código com Prettier

# Git Hooks
npm run prepare      # Configura os hooks do Husky
```

## 🔧 Configuração Adicional

### Variáveis de Ambiente

O arquivo `.env.development` já foi configurado na etapa anterior. Você pode ajustar conforme necessário:

```env
# Para API em produção (padrão)
VITE_API_URL=https://task-manager-api-alpha-ten.vercel.app

# Para desenvolvimento local
# VITE_API_URL=http://localhost:3000
```

### Personalização do Tailwind

O projeto utiliza uma paleta de cores personalizada. Verifique o arquivo `tailwind.config.js` para customizações:

```javascript
theme: {
  extend: {
    colors: {
      'brand-primary': '#3B82F6',
      'brand-secondary': '#10B981',
      // ... outras cores
    }
  }
}
```

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Deploy Recomendado

- **Frontend**: Vercel, Netlify, ou GitHub Pages
- **Backend**: A API já está deployada na Vercel ([task-manager-api-alpha-ten.vercel.app](https://task-manager-api-alpha-ten.vercel.app))

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Código

- Use **kebab-case** para nomes de arquivos e pastas
- Use **PascalCase** para componentes React
- Use **camelCase** para funções e variáveis
- Siga os princípios do **Clean Code** e **SOLID**
- Utilize **JSX** para componentes React
- Mantenha componentes pequenos e reutilizáveis

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Úteis

### Projeto

- [Repositório da API](https://github.com/Kadockh/task-manager-api)
- [API em Produção](https://task-manager-api-alpha-ten.vercel.app)

### Documentação

- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/)
- [Documentação do TanStack Query](https://tanstack.com/query/latest)

---

⭐ **Gostou do projeto?** Deixe uma estrela no repositório!
