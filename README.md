# Calculadora Animada

Calculadora responsiva com animações suaves e alternância de tema claro/escuro.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion (Framer)

## Estrutura

```
src/
├── App.tsx                  # Componente principal
├── main.tsx                 # Entry point
├── index.css                # Tailwind import
├── components/
│   └── Button.tsx           # Botão reutilizável tipado
└── utils/
    └── calculate.ts         # Lógica de cálculo pura e testável
```

## Como rodar

```bash
npm install
npm run dev
```

Acesse em: http://localhost:3000

## Funcionalidades

- Operações: `+` `-` `×` `÷` `%`
- Suporte completo a teclado
- Tema claro/escuro persistido (respeita preferência do sistema)
- Animações com Motion
- Tratamento de erro (divisão por zero)
