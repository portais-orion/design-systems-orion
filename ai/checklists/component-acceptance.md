# Checklist — aceite de componente

- [ ] Sem domínio (entidade/rota/endpoint/permissão/texto de empresa)
- [ ] Sem hex, sem `orange-*`/`blue-*`/`primary-600`, só tokens semânticos
- [ ] Base UI (não Radix); `render` (não `asChild`)
- [ ] cva + cn; forwardRef; variants exportadas
- [ ] Estrutura `src/<nome>/{tsx,stories,index}` + barrel atualizado
- [ ] Story cobre variants, disabled e estados relevantes
- [ ] Renderiza corretamente em Supertrans E Aurora (toolbar)
- [ ] `pnpm check`, `pnpm typecheck`, `pnpm build:storybook` verdes
- [ ] Changeset criado
- [ ] `bg-white`/`text-gray-*` ausentes (usar tokens)
- [ ] Variants de domínio ausentes (nomes semânticos apenas)
- [ ] Se usa ícone em runtime: lucide-react está em dependencies
- [ ] Subpath export adicionado no package.json do @supertrans-transportes/ui
- [ ] (blocks) Tons usam o vocabulário padrão default/success/warning/danger/info/muted
- [ ] (blocks) Comentário de proveniência no topo do arquivo
- [ ] `pnpm check:pureza` verde
