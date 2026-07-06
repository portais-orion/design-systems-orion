# Regras frontend

- React 19, funÃ§Ã£o + hooks; `forwardRef` em todo componente que envolve elemento nativo/primitivo.
- TypeScript strict; proibido `any` implÃ­cito e atalhos que nÃ£o escalam.
- Tailwind v4: classes utilitÃ¡rias + tokens; proibido CSS module/styled-components/inline style para o que Tailwind resolve.
- Imports entre packages sempre pelo nome (`@supertrans-transportes/ui`), nunca caminho relativo cruzando packages.
- Acessibilidade: estados `focus-visible`, `disabled`, `aria-*` nos variants (ver button.tsx); Ã­cones-somente exigem `aria-label`.
- Sem `console.log` em cÃ³digo de package.
