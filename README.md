# 🧮 Calculadora Animada

> Uma calculadora responsiva com animações suaves e alternância de tema claro/escuro.

🔗 **Demo ao vivo:** [https://devpedroluiz.github.io/calculadora/](https://devpedroluiz.github.io/calculadora/)

---

## ✨ Funcionalidades

- Operações básicas: adição `+`, subtração `-`, multiplicação `×`, divisão `÷` e módulo `%`
- Suporte completo a teclado
- Tema claro/escuro persistido (respeita a preferência do sistema operacional)
- Animações fluidas com Motion (Framer Motion)
- Tratamento de erros (divisão por zero)
- Interface glassmorphism com fundo mesh animado
- Layout responsivo e acessível (ARIA)

## 🛠️ Stack

| Tecnologia | Versão |
|---|---|
| React | 19 |
| TypeScript | ~5.8 |
| Vite | ^6.2 |
| Tailwind CSS | v4 |
| Motion (Framer) | ^12 |
| Lucide React | ^0.546 |

## 📁 Estrutura do Projeto

```
src/
├── App.tsx                  # Componente principal e lógica de estado
├── main.tsx                 # Entry point da aplicação
├── index.css                # Import do Tailwind CSS
├── vite-env.d.ts            # Tipos do Vite
├── components/
│   └── Button.tsx           # Botão reutilizável com variantes e animação
└── utils/
    └── calculate.ts         # Lógica de cálculo pura e testável
```

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js >= 20.0.0
- npm >= 8.0.0

### Instalação e execução

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

### Outros Scripts

```bash
# Build para produção
npm run build

# Preview do build
npm run preview

# Verificação de tipos TypeScript
npm run lint

# Remover o diretório dist
npm run clean
```

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
|---|---|
| `0–9` | Inserir dígito |
| `.` | Inserir decimal |
| `+` `-` `*` `/` `%` | Operações |
| `Enter` ou `=` | Calcular resultado |
| `Backspace` | Apagar último dígito |
| `Escape` | Limpar (AC) |

## 🎨 Detalhes de Design

- **Glassmorphism**: painel com `backdrop-blur`, bordas translúcidas e fundo com opacidade
- **Mesh Gradient**: gradientes radiais sobrepostos com `filter: blur` para profundidade
- **Animações**: entrada da calculadora com `scale + opacity`, troca de ícone do tema com rotação, transição do display a cada novo valor
- **Tema**: persistido via `localStorage`, com fallback para `prefers-color-scheme`

## 👤 Autor

**Pedro Luiz Gomes Teixeira**

- GitHub: [@DevPedroLuiz](https://github.com/DevPedroLuiz)

## 📄 Licença

Este projeto está licenciado sob a licença MIT — consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
