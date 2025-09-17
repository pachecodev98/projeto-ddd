Sistema de Biblioteca - API NestJS com DDD
Checklist de funcionalidades:

Criação do projeto Nest, deps e ValidationPipe global. ✅ 
Prisma + schema com User (enum UserRole), Book (boolean available) e etc. ✅ 
Migrations (migrate dev) e PrismaService global. ✅ 
Auth JWT (login/register), JwtStrategy, JwtAuthGuard, RolesGuard + @Roles. ✅ 
CRUD de livros com proteção por roles e atualização de disponibilidade. ✅ 
Fluxo de empréstimo/devolução com transações (atualiza available). ✅ 
Rotas obrigatórias e collection Postman com variáveis {{base_url}} e {{jwt}}. ✅ 
Seed de admin, README e checklist de entrega. ✅

Segue url pro download da collection

https://f1db1697a064bb1ff88337831cf79987.cdn.bubble.io/f1757637267816x455882313045237200/Projeto-DDD.postman_collection.json?_gl=1*trqjbj*_gcl_au*MjAzOTAyNzkwOC4xNzUzNDY1MTk0*_ga*MTc4MTkyNDczNS4xNzUzNDY1MTg1*_ga_BFPVR2DEE2*czE3NTc1OTgwNjUkbzM0JGcxJHQxNzU3NjM3MjYyJGo5JGwwJGgw

Tecnologias Utilizadas
NestJS
TypeScript
Prisma ORM
MySQL
JWT (JSON Web Tokens)
Bcrypt para criptografia de senhas
Class-validator para validação de dados
Pré-requisitos
Node.js (versão 16.x ou superior)
MySQL
NPM ou Yarn
Instalação
# Clonar o repositório
git clone <url-do-repositório>

# Instalar dependências
npm install
Configuração
Crie um arquivo .env baseado no arquivo example.env:
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="sua_chave_secreta_aqui"
Execute as migrações do Prisma para criar as tabelas no banco de dados:
npx prisma migrate dev
Executando o Projeto
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
O servidor estará disponível em http://localhost:3000.

Estrutura do Projeto
O projeto segue uma arquitetura de Domain-Driven Design (DDD) com os seguintes módulos:

Auth: Autenticação e autorização
Users: Gerenciamento de usuários
Books: Gerenciamento de livros
Módulos e Funcionalidades
Autenticação (Auth)
Login com e-mail e senha
Proteção de rotas com JWT
Controle de acesso baseado em funções (RBAC)
Usuários (Users)
Cadastro, atualização e remoção de usuários
Diferentes funções: ADMIN, TEACHER, COORDINATOR, STUDENT
Senhas criptografadas com bcrypt
Livros (Books)
Cadastro, atualização, consulta e remoção de livros
Controle de disponibilidade
Categorização
Sistema de empréstimo via endpoint de atualização (disponibilidade)
API Endpoints
Autenticação
POST /auth/register - Registra um novo usuario
POST /auth/login - Autenticar usuário
Usuários
GET /users - Listar todos os usuários
GET /users/:id - Obter detalhes de um usuário
Livros
GET /books - Listar todos os livros
GET /books/:id - Obter detalhes de um livro
POST /books - Criar um novo livro (requer função ADMIN ou TEACHER)
PATCH /books/:id - Atualizar um livro (requer função ADMIN ou TEACHER)
DELETE /books/:id - Remover um livro (requer função ADMIN)