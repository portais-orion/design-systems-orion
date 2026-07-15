# Packages

Resumo dos packages do núcleo.

| Package | Camada | Papel |
|---|---:|---|
| `@supertrans-transportes/tokens` | 0 | Variáveis CSS, temas, mapeamento semântico |
| `@supertrans-transportes/ui` | 1 | Primitives headless estilizadas |
| `@supertrans-transportes/blocks` | 2 | Composições genéricas e chrome oficial |
| `@supertrans-transportes/tsconfig` | tooling | Base de TypeScript interna |
| `@supertrans-transportes/biome-config` | tooling | Configuração de lint/format interna |

Notas:
- `blocks` depende de `ui`
- `ui` depende de `tokens`
- tooling não é pacote consumível por produto
