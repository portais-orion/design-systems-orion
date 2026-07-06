# Checklist â€” aceite de componente

- [ ] Sem domÃ­nio (entidade/rota/endpoint/permissÃ£o/texto de empresa)
- [ ] Sem hex, sem `orange-*`/`blue-*`/`primary-600`, sÃ³ tokens semÃ¢nticos
- [ ] Base UI (nÃ£o Radix); `render` (nÃ£o `asChild`)
- [ ] cva + cn; forwardRef; variants exportadas
- [ ] Estrutura `src/<nome>/{tsx,stories,index}` + barrel atualizado
- [ ] Story cobre variants, disabled e estados relevantes
- [ ] Renderiza corretamente em Supertrans E Aurora (toolbar)
- [ ] `pnpm check`, `pnpm typecheck`, `pnpm build:storybook` verdes
- [ ] Changeset criado
- [ ] `bg-white`/`text-gray-*` ausentes (usar tokens)
- [ ] Variants de domÃ­nio ausentes (nomes semÃ¢nticos apenas)
- [ ] Se usa Ã­cone em runtime: lucide-react estÃ¡ em dependencies
- [ ] Subpath export adicionado no package.json do @supertrans-transportes/ui
- [ ] (blocks) Tons usam o vocabulÃ¡rio padrÃ£o default/success/warning/danger/info/muted
- [ ] (blocks) ComentÃ¡rio de proveniÃªncia no topo do arquivo
- [ ] `pnpm check:pureza` verde
