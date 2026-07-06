# Regras de componentes (@supertrans-transportes/ui)

Estrutura obrigatÃ³ria:
```
src/<nome>/
  <nome>.tsx           # implementaÃ§Ã£o
  <nome>.stories.tsx   # story (obrigatÃ³ria)
  index.ts             # export { X } from "./<nome>"
```
+ export no barrel `src/index.ts`.

âœ… Correto (padrÃ£o do repo â€” ver button.tsx):
```tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button";
const variants = cva("bg-primary text-primary-foreground ...", { variants: {...} });
<ButtonPrimitive render={<a href={href} />} />   // polimorfismo via render
```

âŒ Errado:
```tsx
import * as Dialog from "@radix-ui/react-dialog";  // Radix proibido (ADR 0004)
<Trigger asChild><button/></Trigger>               // asChild nÃ£o existe no Base UI
<DialogPrimitive.Content />                        // Ã© Popup no Base UI
className="bg-[#00526b]"                           // hex proibido
```

- API pÃºblica: props mÃ­nimas + variants cva; sem props booleanas de negÃ³cio (`showExportButton`).
- Exportar tambÃ©m as `variants` (ex.: `buttonVariants`) para extensÃ£o nos produtos.

## Aprendizados da Sprint 1

- Variants com semÃ¢ntica de domÃ­nio (ex.: `origin-profile`, `origin-group` no badge do Supertrans) NÃƒO sobem para o nÃºcleo â€” manter apenas variants semÃ¢nticas (`tinted`, `success`, `warning`).
- `bg-white` Ã© proibido em componente: usar `bg-background` (quebra dark mode e temas).
- Classes `animate-in/fade-in/zoom-in` vÃªm de `tw-animate-css`; o consumidor importa esse CSS (Storybook jÃ¡ importa). NÃ£o trocar por keyframes prÃ³prios.
- Ãcones em runtime (Check, X, ChevronDown...) fazem `lucide-react` ser dependency (nÃ£o devDependency) do @supertrans-transportes/ui.
- Mapa Radixâ†’Base UI usado nas recriaÃ§Ãµes: Contentâ†’Popup (+Positioner em menus), Overlayâ†’Backdrop, Subâ†’SubmenuRoot, SubTriggerâ†’SubmenuTrigger, Tabs Trigger/Contentâ†’Tab/Panel, estado `data-[state=checked]`â†’`data-[checked]`.

## Aprendizados da Sprint 4

- RadioGroup no Base UI = `RadioGroup` (root Ãºnico) + `Radio.Root`/`Radio.Indicator` (mÃ³dulo `radio` separado).
- Accordion: `type="single"` mapeia para `multiple={false}`; painel aberto expÃµe `data-panel-open` no trigger (use p/ girar o chevron).
- Progress: `value={null}` = indeterminate (primitivo cuida do ARIA).
- Spinner: com `label` â†’ `role="status"`; sem label â†’ `aria-hidden` (o contexto anuncia).
- Sheet reusa o Dialog primitivo com cva de `side` â€” nÃ£o criar drawer paralelo.

## Quality gate (Sprint 4.0)

- NÃ£o mascarar violaÃ§Ã£o de a11y sem justificativa documentada (biome-ignore/parameters com comentÃ¡rio).
- Toda story nova deve ser verificÃ¡vel pelo addon de acessibilidade e passar nas duas marcas.
- Fluxo completo de gates: docs/architecture/quality-gates.md.

- Stories novas com callbacks (onClick, onValueChange...) usam `fn()` de `storybook/test` nos args â€” Ã© o que faz o painel Actions registrar chamadas no SB10 (nÃ£o hÃ¡ mais actions implÃ­citas).

## Aprendizados da Sprint 4.1

- Base UI Combobox: `items` aceita `{value,label}` (LabeledItem, display/filtro automÃ¡ticos) e grupos `{label, items}`; grupos renderizam com `Group items` + `Collection`; multiple usa `Chips/Chip/ChipRemove` como campo (nunca chip-botÃ£o dentro de trigger-botÃ£o).
- Bridge de valores: API pÃºblica com strings; objetos option como item interno + `isItemEqualToValue` por `value`.
- Play functions: conteÃºdo em Portal nÃ£o estÃ¡ no canvas â€” use `within(canvasElement.ownerDocument.body)` para buscar o popup.
- Combobox/MultiSelect compartilham helpers em `src/_internal/options.ts` â€” internos, fora do barrel.
