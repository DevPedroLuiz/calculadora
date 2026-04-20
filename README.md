# 🧮 Calculadora Animada

Uma calculadora moderna e responsiva com animações suaves, alternância de temas claro/escuro e suporte a teclado — desenvolvida com React, Tailwind CSS e Framer Motion.

![Calculadora Animada](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

---

## ✨ Funcionalidades

- **Operações básicas** — adição, subtração, multiplicação, divisão e módulo (%)
- **Tema claro/escuro** — alternância com animação suave e ícones animados (Sol/Lua)
- **Animações fluidas** — botões com feedback visual via Framer Motion
- **Suporte a teclado** — operação completa via teclado (números, operadores, Enter, Backspace, Escape)
- **Encadeamento de operações** — calcula resultados intermediários ao trocar de operador
- **Deleção caractere a caractere** — botão de apagar com ícone dedicado
- **Tratamento de erros** — exibe mensagem de erro para divisão por zero
- **Design glassmorphism** — fundo com gradiente mesh e efeito blur

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | ^19.0.0 | Interface e gerenciamento de estado |
| TypeScript | ~5.8.2 | Tipagem estática |
| Tailwind CSS | ^4.1.14 | Estilização utilitária |
| Framer Motion (`motion`) | ^12.23.24 | Animações de botões e transições |
| Lucide React | ^0.546.0 | Ícones (Sol, Lua, Delete) |
| Vite | ^6.2.0 | Bundler e servidor de desenvolvimento |

---

## 🚀 Como executar localmente

**Pré-requisitos:** Node.js 18+

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositório>
   cd <nome-do-projeto>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env.local
   ```
   Edite `.env.local` com suas configurações:
   ```
   GEMINI_API_KEY="sua_chave_aqui"
   APP_URL="http://localhost:3000"
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

---

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
|---|---|
| `0–9` | Inserir dígito |
| `.` | Inserir ponto decimal |
| `+` `-` `*` `/` | Operadores aritméticos |
| `%` | Módulo |
| `Enter` ou `=` | Calcular resultado |
| `Backspace` | Apagar último caractere |
| `Escape` | Limpar tudo (AC) |

---

## 📁 Estrutura do Projeto

```
├── src/
│   ├── App.tsx        # Componente principal com toda a lógica da calculadora
│   ├── main.tsx       # Ponto de entrada da aplicação
│   └── index.css      # Estilos globais e importação do Tailwind
├── index.html         # Template HTML
├── vite.config.ts     # Configuração do Vite
├── tsconfig.json      # Configuração do TypeScript
├── package.json       # Dependências e scripts
└── .env.example       # Exemplo de variáveis de ambiente
```

---

## 📦 Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento na porta 3000 |
| `npm run build` | Gera a build de produção em `dist/` |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Verifica erros de tipagem com `tsc --noEmit` |
| `npm run clean` | Remove a pasta `dist/` |

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais e pessoais.
