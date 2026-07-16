# Regras frontend

- React 19, função + hooks; `forwardRef` em todo componente que envolve elemento nativo/primitivo.
- TypeScript strict; proibido `any` implícito e atalhos que não escalam.
- Tailwind v4: classes utilitárias + tokens; proibido CSS module/styled-components/inline style para o que Tailwind resolve.
- Imports entre packages sempre pelo nome (`@portais-orion/ui`), nunca caminho relativo cruzando packages.
- Acessibilidade: estados `focus-visible`, `disabled`, `aria-*` nos variants (ver button.tsx); ícones-somente exigem `aria-label`.
- Sem `console.log` em código de package.
