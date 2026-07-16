---
"@portais-orion/ui": patch
---

Corrige estados visuais de componentes migrados do Radix para Base UI:

- RadioGroup: indicador centralizado no círculo (Root agora é flex centrado — no Base UI o Indicator não preenche o Root automaticamente).
- Checkbox: estado marcado voltou a estilizar (seletores `data-[state=checked]` do Radix trocados por `data-[checked]` do Base UI).
- Select: popup não sobrepõe mais o trigger — `alignItemWithTrigger` desabilitado no modo padrão `popper`; a prop `position="item-aligned"` reativa o alinhamento.
- Combobox/MultiSelect: removido espaço vazio no topo do popup (`Empty` agora fica oculto quando há resultados).
- Dialog: removidos estilos mortos `data-[state=open]` no botão de fechar.
