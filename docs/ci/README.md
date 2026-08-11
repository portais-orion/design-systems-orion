# CI — referência para ativação futura

Ainda **não há CI ativo** neste repo (decisão: ativar quando houver infra/necessidade).
O único workflow ativo é `release-packages.yml` (publish manual, dry-run por padrão).

`ci.yml.example` é o workflow de gates pronto para quando for ativar: copie para
`.github/workflows/ci.yml`.

## Nota da execução de teste (2026-07-16)

O workflow foi executado uma vez em runner `ubuntu-latest` e o build do
`@design-systems-orion/blocks` falhou com `ERR_WORKER_OUT_OF_MEMORY` no worker de dts do tsup
(heap do runner de 7 GB não bastou para gerar declarações de 33 entradas de uma vez).
Local (Windows, mais RAM) passa. Ao ativar o CI, resolver com uma das opções:

- `NODE_OPTIONS: --max-old-space-size=6144` no step de build; ou
- limitar concorrência do turbo (`turbo build --concurrency=1`) para não buildar ui+blocks
  em paralelo; ou
- runner maior.
