# 🚀 Socket.IO + Better-Auth Integration Demo

Um projeto de demonstração que integra **Socket.IO** com **Better-Auth** em uma arquitetura moderna com Docker, mostrando comunicação em tempo real com autenticação robusta.

## 🎯 Objetivo

Este projeto demonstra a integração eficiente entre:
- **Socket.IO** para comunicação em tempo real
- **Better-Auth** para autenticação segura
- **Docker** para containerização completa
- **NestJS** como backend robusto
- **Next.js** como frontend moderno

## 🛠️ Stack Tecnológica

### Backend (API)
- **NestJS** - Framework Node.js para aplicações escaláveis
- **Socket.IO** - Comunicação em tempo real
- **Better-Auth** - Sistema de autenticação moderno
- **Prisma** - ORM para PostgreSQL
- **Fastify** - Servidor HTTP de alta performance
- **Redis** - Cache e sessões
- **PostgreSQL (Citus)** - Banco de dados principal

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **Socket.IO Client** - Cliente para comunicação em tempo real
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos

### DevOps & Ferramentas
- **Docker** - Containerização
- **Turbo** - Build system monorepo
- **Biome** - Linter e formatter
- **TypeScript** - Tipagem estática
- **PNPM** - Gerenciador de pacotes

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

### Execução com Docker (Recomendado)

1. **Configure as variáveis de ambiente:**
```bash
cp example.env.local docker/.env
```

2. **Execute o projeto:**
```bash
cd docker
docker-compose up -d
```

3. **Acesse a aplicação:**
- Frontend: http://127.0.1.1:3600
- Backend API: http://127.0.1.1:3003

### Desenvolvimento Local

1. **Instale as dependências:**
```bash
pnpm install
```

2. **Configure as variáveis:**
```bash
cp example.env.local .env.local
```

3. **Execute o desenvolvimento:**
```bash
pnpm dev
```

## 📁 Estrutura do Projeto

```
one/
├── apps/
│   ├── api/          # Backend NestJS
│   └── front/        # Frontend Next.js
├── docker/           # Configurações Docker
└── package.json      # Workspace root
```

## 🔧 Serviços Docker

- **Frontend**: Next.js na porta 3600
- **Backend**: NestJS na porta 3003
- **PostgreSQL**: Citus na porta 3303
- **Redis**: Cache na porta 3300

## 🎨 Funcionalidades

- ✅ Autenticação com Better-Auth
- ✅ Chat em tempo real com Socket.IO
- ✅ Interface moderna e responsiva
- ✅ Containerização completa
- ✅ Banco de dados PostgreSQL
- ✅ Cache Redis
- ✅ TypeScript em todo o projeto

## 🔒 Variáveis de Ambiente

Principais variáveis necessárias:
- `BETTER_AUTH_SECRET` - Chave secreta para autenticação
- `POSTGRES_PASSWORD` - Senha do PostgreSQL
- `REDIS_PASSWORD` - Senha do Redis
- `PORT_FRONTEND` / `PORT_BACKEND` - Portas dos serviços

## �� Scripts Úteis

```bash
# Desenvolvimento
pnpm dev              # Executa frontend e backend
pnpm build            # Build de todos os serviços
pnpm lint             # Lint do código
pnpm format           # Formatação com Prettier

# Docker
docker-compose up -d  # Inicia todos os serviços
docker-compose down   # Para todos os serviços
```

## 🤝 Contribuição

Este é um projeto de demonstração focado em mostrar a integração entre Socket.IO e Better-Auth de forma simples e eficiente.

---

**Desenvolvido para demonstrar habilidades em integração de tecnologias modernas com foco em simplicidade e eficiência.**
