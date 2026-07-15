# Regras de componentes (@supertrans-transportes/ui)

Estrutura obrigatória:
```
src/<nome>/
  <nome>.tsx           # implementação
  <nome>.stories.tsx   # story (obrigatória)
  index.ts             # export { X } from "./<nome>"
```
+ export no barrel `src/index.ts`.

✅ Correto (padrão do repo — ver button.tsx):
```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button";
const variants = cva("bg-primary text-primary-foreground ...", { variants: {...} });
<ButtonPrimitive render={<a href={href} />} />   // polimorfismo via render
```

❌ Errado:
```tsx
import * as Dialog from "@radix-ui/react-dialog";  // Radix proibido (ADR 0004)
<Trigger asChild><button/></Trigger>               // asChild não existe no Base UI
<DialogPrimitive.Content />                        // é Popup no Base UI
className="bg-[#00526b]"                           // hex proibido
```

- API pública: props mínimas + variants cva; sem props booleanas de negócio (`showExportButton`).
- Exportar também as `variants` (ex.: `buttonVariants`) para extensão nos produtos.

## Aprendizados da Sprint 1

- Variants com semântica de domínio (ex.: `origin-profile`, `origin-group` no badge do Supertrans) NÃO sobem para o núcleo — manter apenas variants semânticas (`tinted`, `success`, `warning`).
- `bg-white` é proibido em componente: usar `bg-background` (quebra dark mode e temas).
- Classes `animate-in/fade-in/zoom-in` vêm de `tw-animate-css`; o consumidor importa esse CSS (Storybook já importa). Não trocar por keyframes próprios.
- Ícones em runtime (Check, X, ChevronDown...) fazem `lucide-react` ser dependency (não devDependency) do @supertrans-transportes/ui.
- Mapa Radix→Base UI usado nas recriações: Content→Popup (+Positioner em menus), Overlay→Backdrop, Sub→SubmenuRoot, SubTrigger→SubmenuTrigger, Tabs Trigger/Content→Tab/Panel, estado `data-[state=checked]`→`data-[checked]`.

## Aprendizados da Sprint 4

- RadioGroup no Base UI = `RadioGroup` (root único) + `Radio.Root`/`Radio.Indicator` (módulo `radio` separado).
- Accordion: `type="single"` mapeia para `multiple={false}`; painel aberto expõe `data-panel-open` no trigger (use p/ girar o chevron).
- Progress: `value={null}` = indeterminate (primitivo cuida do ARIA).
- Spinner: com `label` → `role="status"`; sem label → `aria-hidden` (o contexto anuncia).
- Sheet reusa o Dialog primitivo com cva de `side` — não criar drawer paralelo.

## Quality gate (Sprint 4.0)

- Não mascarar violação de a11y sem justificativa documentada (biome-ignore/parameters com comentário).
- Toda story nova deve ser verificável pelo addon de acessibilidade e passar nas duas marcas.
- Fluxo completo de gates: docs/architecture/quality-gates.md.

- Stories novas com callbacks (onClick, onValueChange...) usam `fn()` de `storybook/test` nos args — é o que faz o painel Actions registrar chamadas no SB10 (não há mais actions implícitas).

## Aprendizados da Sprint 4.1

- Base UI Combobox: `items` aceita `{value,label}` (LabeledItem, display/filtro automáticos) e grupos `{label, items}`; grupos renderizam com `Group items` + `Collection`; multiple usa `Chips/Chip/ChipRemove` como campo (nunca chip-botão dentro de trigger-botão).
- Bridge de valores: API pública com strings; objetos option como item interno + `isItemEqualToValue` por `value`.
- Play functions: conteúdo em Portal não está no canvas — use `within(canvasElement.ownerDocument.body)` para buscar o popup.
- Combobox/MultiSelect compartilham helpers em `src/_internal/options.ts` — internos, fora do barrel.
