# 💰 Cost Manager

Um sistema de gerenciamento de projetos e orçamentos desenvolvido com React + Node.js + MariaDB.

## 📋 Características

- ✅ Gerenciamento completo de projetos
- ✅ Controle de orçamentos por projeto
- ✅ Categorização de projetos
- ✅ Interface moderna e responsiva
- ✅ API RESTful
- ✅ Banco de dados com MariaDB

## 🛠️ Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para UI
- **React Router v6** - Navegação entre páginas
- **CSS Modules** - Estilos isolados por componente

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MariaDB** - Banco de dados relacional

## 📁 Estrutura do Projeto

```
costst/
├── public/                 # Arquivos estáticos
│   ├── index.html         # Página HTML principal
│   └── favicon.ico        # Ícone do site
├── src/                   # Código fonte React
│   ├── components/
│   │   ├── form/          # Componentes de formulário
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   └── SubmitButton.jsx
│   │   ├── layout/        # Componentes de layout
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── PageInfo.jsx
│   │   │   └── Container.jsx
│   │   ├── pages/         # Páginas da aplicação
│   │   │   ├── Home.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── NewProject.jsx
│   │   │   ├── EditProject.jsx
│   │   │   ├── Company.jsx
│   │   │   └── Contact.jsx
│   │   └── project/       # Componentes específicos
│   │       └── ProjectForm.jsx
│   ├── img/               # Imagens e ícones
│   ├── App.js             # Componente raiz
│   ├── index.js           # Ponto de entrada
│   └── index.css          # Estilos globais
├── database.sql           # Schema do banco de dados
├── db.js                  # Conexão com MariaDB
├── server.js              # Servidor Express
└── package.json           # Dependências do projeto
```

## 🚀 Instalação

### 1. Configurar o Banco de Dados
Execute o arquivo `database.sql` no MariaDB:

```bash
mariadb < database.sql
```

Ou importe manualmente no seu cliente MariaDB.

### 2. Instalar Dependências
```bash
npm install
```

### 3. Iniciar o Servidor Backend
```bash
node server.js
```
O servidor rodará em `http://localhost:5000`

### 4. Iniciar o Frontend (novo terminal)
```bash
npm start
```
A aplicação abrirá em `http://localhost:3000`

## 📊 Banco de Dados

### Tabelas Principais

#### `categories`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
category_name VARCHAR(100) NOT NULL
```

#### `projects`
```sql
id           INT PRIMARY KEY AUTO_INCREMENT
project_name VARCHAR(100) NOT NULL
budget       DECIMAL(10, 2) NOT NULL
category_id  INT NOT NULL (FK para categories.id)
```

## 🔌 API Endpoints

### Categorias
- `GET /categories` - Listar todas as categorias

### Projetos
- `GET /projects` - Listar todos os projetos
- `GET /projects/:id` - Obter projeto por ID
- `POST /projects` - Criar novo projeto
  - Body: `{ project_name, budget, category_id }`
- `PUT /projects/:id` - Atualizar projeto
  - Body: `{ project_name, budget, category_id }`
- `DELETE /projects/:id` - Deletar projeto

## 🎨 Componentes Principais

### Form Components
- **Input** - Campo de entrada com validação (texto, moeda)
- **Select** - Dropdown para seleção de categorias
- **SubmitButton** - Botão de envio de formulário

### Layout Components
- **Navbar** - Barra de navegação superior
- **Footer** - Rodapé da aplicação
- **Container** - Contenedor responsivo
- **Loading** - Indicador de carregamento
- **EmptyState** - Estado vazio com mensagem
- **PageInfo** - Layout genérico de página

### Pages
- **Home** - Página inicial
- **Projects** - Lista de projetos em grid
- **NewProject** - Criar novo projeto
- **EditProject** - Editar projeto existente
- **Company** - Informações da empresa
- **Contact** - Página de contato

## ✨ Funcionalidades Principais

### Gerenciamento de Projetos
- Criar novos projetos com nome e orçamento
- Visualizar todos os projetos em grid de 3 colunas
- Editar projetos existentes
- Deletar projetos (com confirmação)
- Categorizar projetos

### Validações
- Nome do projeto: mínimo 3 caracteres
- Orçamento: deve ser maior que 0
- Categoria: obrigatória
- Campos de texto: sem números/caracteres especiais

### UX/UI
- Loading screens com spinner animado
- Empty states informativos
- Navegação fluida entre páginas
- Design responsivo com CSS Modules
- Efeitos hover e animações suaves
- Cores e design moderno

## 🔧 Configuração

### Variáveis de Ambiente
Você pode configurar no arquivo `db.js`:
```javascript
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco'
})
```

## 📝 Como Usar

### Criar um Projeto
1. Clique em "Novo Projeto"
2. Preencha o nome (mín. 3 caracteres)
3. Defina o orçamento (maior que 0)
4. Selecione uma categoria
5. Clique em "Criar Projeto"

### Editar um Projeto
1. Vá para "Projetos"
2. Clique no botão "Editar" do projeto
3. Modifique os campos desejados
4. Clique em "Editar Projeto"

### Deletar um Projeto
1. Vá para "Projetos"
2. Clique no botão "Deletar"
3. Confirme a exclusão

## 🎯 Próximos Passos (Possíveis Melhorias)

- [ ] Adicionar autenticação de usuários
- [ ] Histórico de alterações nos projetos
- [ ] Relatórios e gráficos de orçamento
- [ ] Filtros avançados nos projetos
- [ ] Dark mode
- [ ] Exportar dados em PDF/Excel
- [ ] Notificações por email

## 📄 Licença

Este projeto é de uso livre.

## 👨‍💻 Autor

Desenvolvido com ❤️

---

**Última atualização:** Dezembro de 2025 
