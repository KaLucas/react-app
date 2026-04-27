# 🛠️ React App

> Sistema de administração desenvolvido com React, TypeScript e Material UI.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Contato](#contato)

---

## 💡 Sobre o Projeto

**React App** é um sistema de administração web moderno, construído com React e TypeScript. A aplicação oferece uma interface intuitiva para gerenciamento de dados, utilizando componentes ricos do Material UI, gerenciamento de estado com Redux Toolkit e navegação entre páginas com React Router.

> ⚠️ **Nota:** Este projeto faz parte do meu portfólio pessoal e tem como objetivo demonstrar organização de código, boas práticas e domínio das tecnologias utilizadas. Ele representa o básico do que sei fazer — e está longe de ser o limite do meu conhecimento.

---

## 🚀 Tecnologias

### Core

- **[React 19](https://reactjs.org/)** — Biblioteca para construção de interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** — Superset do JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** — Bundler e servidor de desenvolvimento ultrarrápido
- **[React Router DOM v7](https://reactrouter.com/)** — Roteamento declarativo para SPA

### UI & Estilo

- **[Material UI (MUI) v7](https://mui.com/)** — Biblioteca de componentes React baseada no Material Design
- **[MUI X Data Grid](https://mui.com/x/react-data-grid/)** — Componente de tabela avançada para dados
- **[MUI Icons](https://mui.com/material-ui/material-icons/)** — Ícones do Material Design
- **[Font Awesome](https://fontawesome.com/)** — Biblioteca de ícones adicionais
- **[Emotion](https://emotion.sh/)** — CSS-in-JS utilizado internamente pelo MUI

### Estado & Formulários

- **[Redux Toolkit](https://redux-toolkit.js.org/)** — Gerenciamento de estado global
- **[React Redux](https://react-redux.js.org/)** — Integração do Redux com React
- **[React Hook Form](https://react-hook-form.com/)** — Gerenciamento de formulários performático

### Utilitários

- **[date-fns](https://date-fns.org/)** — Manipulação e formatação de datas

### Qualidade de Código

- **[ESLint](https://eslint.org/)** — Linting e análise estática do código
- **[Prettier](https://prettier.io/)** — Formatação automática de código

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/KaLucas/react-app.git
```

### 2. Acesse a pasta do projeto

```bash
cd react-app
```

### 3. Instale as dependências

```bash
npm install
```

---

## ▶️ Como Usar

### Iniciando o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação abrirá automaticamente em [http://localhost:5173](http://localhost:5173) no seu navegador.

### Gerando build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`, prontos para deploy.

### Pré-visualizando o build de produção

```bash
npm run preview
```

---

## 📁 Estrutura de Pastas

```
react-app/
├── public/                  # Arquivos estáticos públicos
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/               # Páginas da aplicação (rotas)
│   ├── store/               # Configuração do Redux (slices, store)
│   ├── hooks/               # Custom hooks
│   ├── types/               # Definições de tipos TypeScript
│   ├── assets/              # Imagens e recursos estáticos
│   ├── App.tsx              # Componente raiz e configuração de rotas
│   └── main.tsx             # Ponto de entrada da aplicação
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── prettier.config.cjs
└── package.json
```

---

## 📜 Scripts Disponíveis

| Comando           | Descrição                                          |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento na porta 5173 |
| `npm run build`   | Compila o TypeScript e gera o build de produção    |
| `npm run preview` | Pré-visualiza o build de produção localmente       |
| `npm run lint`    | Executa o ESLint para análise estática do código   |

---

## 📬 Contato

**Karina Lucas** — [GitHub](https://github.com/KaLucas)

Link do projeto: [https://github.com/KaLucas/react-app](https://github.com/KaLucas/react-app)

---

<p align="center">Feito com ❤️ por <a href="https://github.com/KaLucas">KaLucas</a></p>
