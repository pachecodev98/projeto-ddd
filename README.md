# Sistema de Biblioteca - API NestJS com DDD

Este projeto implementa uma API RESTful para gerenciamento de biblioteca utilizando NestJS e Domain-Driven Design. O sistema permite gerenciar livros, usuários e empréstimos com autenticação JWT e controle de acesso baseado em funções.

## Tecnologias Utilizadas

- NestJS
- TypeScript
- Prisma ORM
- MySQL
- JWT (JSON Web Tokens)
- Bcrypt para criptografia de senhas
- Class-validator para validação de dados

## Pré-requisitos

- Node.js (versão 16.x ou superior)
- MySQL
- NPM ou Yarn

## Instalação

```bash
# Clonar o repositório
git clone <url-do-repositório>

# Instalar dependências
npm install

```

## Configuração

1. Crie um arquivo `.env` baseado no arquivo `example.env`:

```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="sua_chave_secreta_aqui"
```

2. Execute as migrações do Prisma para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

3. (Opcional) Execute o seed para popular o banco com dados iniciais:

```bash
npx prisma db seed
```

## Executando o Projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

O servidor estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

O projeto segue uma arquitetura de Domain-Driven Design (DDD) com os seguintes módulos:

- **Auth**: Autenticação e autorização
- **Users**: Gerenciamento de usuários
- **Books**: Gerenciamento de livros

## Módulos e Funcionalidades

### Autenticação (Auth)

- Login com e-mail e senha
- Proteção de rotas com JWT
- Controle de acesso baseado em funções (RBAC)

### Usuários (Users)

- Cadastro, atualização e remoção de usuários
- Diferentes funções: ADMIN, TEACHER, COORDINATOR, STUDENT
- Senhas criptografadas com bcrypt

### Livros (Books)

- Cadastro, atualização, consulta e remoção de livros
- Controle de disponibilidade
- Categorização

### Empréstimos (Loans)

- Registro de empréstimos de livros
- Controle de datas (empréstimo, devolução prevista e efetiva)
- Associação entre livros e usuários

## API Endpoints

### Autenticação
- `POST /auth/register` - Registra um novo usuario
- `POST /auth/login` - Autenticar usuário

### Usuários
- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Obter detalhes de um usuário

### Livros
- `GET /books` - Listar todos os livros
- `GET /books/:id` - Obter detalhes de um livro
- `POST /books` - Criar um novo livro (requer função ADMIN ou TEACHER)
- `PATCH /books/:id` - Atualizar um livro (requer função ADMIN ou TEACHER)
- `DELETE /books/:id` - Remover um livro (requer função ADMIN)

## Segurança

O sistema implementa diversos níveis de segurança:

- Autenticação via JWT
- Controle de acesso por função (RBAC)
- Senhas criptografadas
- Validação de entrada de dados