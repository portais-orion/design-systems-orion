# Checklist — aceite de story

- [ ] Colocalizada com o componente (`*.stories.tsx` no mesmo dir)
- [ ] `title` segue hierarquia (`UI/<Nome>` ou `Orion/...`)
- [ ] Sem providers de app real (Auth, Query, Router)
- [ ] Controls para variants e disabled
- [ ] Verificada com toolbar em Supertrans e em Aurora
- [ ] `pnpm build:storybook` verde
- [ ] Painel Accessibility sem violações não justificadas (justificativa documentada quando houver)
- [ ] Story passa visualmente nas marcas Supertrans e Aurora (toolbar)
- [ ] Componente interativo tem story operável por teclado
- [ ] `pnpm test:storybook` verde (stories como testes)
- [ ] Mudança visual relevante validada no Storybook antes do merge
