# 0010 — Preview/impressão de documentos: dependências novas propostas (não implementado)

## Status
Proposto — aguardando decisão. Não implementado.

## Contexto
O audit completo do Supertrans (2026-07-20, `portal-supertrans/docs/nucleo-crud-visual-gaps.md`)
identificou dois padrões bespoke relacionados a documentos:

- `document-viewer-modal` — preview universal de PDF/DOCX/XLSX dentro de um modal
  (`DocumentPreviewDialog`).
- `ContainerInspectionPDFLayout` — layout A4 fixo com botão "Exportar PDF"
  (`PrintableDocumentLayout`).

Nenhum dos dois pode ser resolvido com o que o Orion já tem (`packages/ui`, `packages/blocks`)
porque ambos exigem renderizar formatos de arquivo binários no navegador — isso não é possível
com CSS/Tailwind/Base UI puros.

## Decisão proposta
Adicionar ao Orion (`packages/blocks`, ou um novo `packages/blocks-documents` se o bundle
inflar demais o pacote principal):

- **`DocumentPreviewDialog`** — usaria `mammoth` (DOCX → HTML), uma lib de leitura de XLSX
  (`xlsx`/SheetJS, já usada no `docx`/`xlsx` skill do outro contexto do produto) e um viewer de
  PDF (`react-pdf` ou `pdfjs-dist` diretamente). O componente recebe a URL/blob do arquivo e o
  tipo MIME via props — sem fetch, sem domínio, só renderização.
- **`PrintableDocumentLayout`** — usaria `react-to-print` para orquestrar a impressão/export de
  um layout A4 já montado pelo consumidor via `children`.

## Alternativas consideradas
1. **Não centralizar, manter bespoke em cada portal** — rejeitado; o padrão já se repete em pelo
   menos 2 lugares no Supertrans e tende a aparecer em outros portais (relatórios, notas fiscais).
2. **Usar apenas `<iframe>` nativo para PDF e link de download para DOCX/XLSX** (zero dependência)
   — mitiga risco de bundle mas degrada a experiência (sem preview real de DOCX/XLSX). Candidato a
   ADR alternativo se o peso das libs for considerado inaceitável.
3. **Isolar em pacote separado `@portais-orion/blocks-documents`** — evita que consumidores que não
   usam preview de documentos paguem o custo de bundle das libs pesadas. Recomendado se a decisão
   for seguir com a opção 1 do texto acima.

## Consequências se aprovado
- Primeira vez que o Orion adiciona dependências de terceiros pesadas (`mammoth`, viewer de PDF,
  parser de XLSX) — quebra a premissa atual de "zero dependência externa além de Base UI/Tailwind/cva".
- Aumenta superfície de manutenção (upgrades de libs de parsing de arquivo, que historicamente têm
  breaking changes frequentes).
- Exige decidir se entra em `packages/blocks` (import único, bundle maior para todos) ou em pacote
  próprio (import isolado, mais um pacote para versionar/publicar).

## Pendências antes de implementar
- Confirmar com o time se o peso de bundle é aceitável ou se a opção "pacote separado" é
  obrigatória.
- Validar licenças das libs candidatas (`mammoth` é BSD, `pdfjs-dist` é Apache-2.0 — compatíveis
  com o restante do Orion, mas confirmar antes de fixar).
