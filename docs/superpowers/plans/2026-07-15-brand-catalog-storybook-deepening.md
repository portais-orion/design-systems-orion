# Internal Brand Catalog and Storybook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir declarações espalhadas de marcas por um catálogo interno único que derive e valide tokens, exports e Storybook sem criar interface pública JavaScript.

**Architecture:** `packages/tokens/brands.json` será a interface declarativa. Um módulo puro em `scripts/lib/brand-catalog.mjs` esconderá schema, derivação, sincronização e diagnósticos; adapters finos cuidarão de disco e processo. Storybook consumirá o JSON diretamente, enquanto produtos continuarão consumindo somente CSS.

**Tech Stack:** Node.js 22 ESM, `node:test`, JSON, CSS, TypeScript/React, Storybook 10, pnpm 9, Biome.

## Global Constraints

- Respeitar ADR 0005: temas por CSS variables + `data-brand`; nunca prop de marca ou ThemeProvider JavaScript.
- Catálogo é interno e não pode aparecer no tarball de `@portais-orion/tokens`.
- Marca nova exige um tema CSS e uma entrada explícita no catálogo.
- IDs, labels, ordem e default atuais permanecem `supertrans`, `aurora`, `Supertrans`, `Aurora`, default `supertrans`.
- Subpaths públicos atuais permanecem idênticos.
- Escrita automatizada limitada a `packages/tokens/src/index.css` e `packages/tokens/package.json`.
- Nenhuma dependência runtime nova.
- Nenhuma alteração nos repositórios de produtos.
- Mudança comportamental usa TDD RED → GREEN → refactor.
- Sucesso final exige `pnpm check && pnpm typecheck && pnpm build`.

---

### Task 1: Build the pure brand-catalog module

**Files:**
- Create: `scripts/lib/brand-catalog.mjs`
- Create: `scripts/brand-catalog.test.mjs`

**Interfaces:**
- Consumes: plain catalog/state objects; no filesystem.
- Produces: `deriveBrandArtifacts(catalog)`, `validateBrandState(input)`, `synchronizeBrandArtifacts(input)`.

- [x] **Step 1: Write failing derivation tests**

Create table-driven tests using this canonical fixture:

```js
const catalog = {
  defaultBrand: "supertrans",
  brands: [
    { id: "supertrans", label: "Supertrans" },
    { id: "aurora", label: "Aurora" },
  ],
};

test("derives ordered theme imports, exports, toolbar, and default", () => {
  assert.deepEqual(deriveBrandArtifacts(catalog), {
    defaultBrand: "supertrans",
    toolbarItems: [
      { value: "supertrans", title: "Supertrans" },
      { value: "aurora", title: "Aurora" },
    ],
    themeImports: [
      '@import "./themes/supertrans.css";',
      '@import "./themes/aurora.css";',
    ],
    sourceThemeExports: {
      "./themes/supertrans.css": "./src/themes/supertrans.css",
      "./themes/aurora.css": "./src/themes/aurora.css",
    },
    distThemeExports: {
      "./themes/supertrans.css": "./dist/themes/supertrans.css",
      "./themes/aurora.css": "./dist/themes/aurora.css",
    },
  });
});
```

- [x] **Step 2: Run RED for missing module**

Run:

```powershell
node --test scripts/brand-catalog.test.mjs
```

Expected: FAIL because `scripts/lib/brand-catalog.mjs` does not exist.

- [x] **Step 3: Implement catalog parsing and derivation**

Implement internal checks for:

```js
const BRAND_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeLabel(value) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}
```

`deriveBrandArtifacts` must preserve catalog order and throw `TypeError` with deterministic messages when catalog shape cannot be derived safely.

- [x] **Step 4: Write failing validation tests**

Cover exact diagnostics for:

```js
[
  ["default desconhecido", { ...catalog, defaultBrand: "unknown" }, "catalog.defaultBrand"],
  ["id inválido", { defaultBrand: "Aurora", brands: [{ id: "Aurora", label: "Aurora" }] }, "catalog.brands[0].id"],
  ["id duplicado", { defaultBrand: "aurora", brands: [{ id: "aurora", label: "Aurora" }, { id: "aurora", label: "Outra" }] }, "catalog.brand.duplicate-id"],
  ["label duplicada normalizada", { defaultBrand: "a", brands: [{ id: "a", label: "Marca X" }, { id: "b", label: "  marca   x " }] }, "catalog.brand.duplicate-label"],
]
```

Also cover missing/orphan themes, each required selector, each required identity token, stale `index.css`, stale source exports, and stale publish exports. Diagnostics must expose `code`, `path`, `actual`, and `expected` where applicable.

- [x] **Step 5: Run RED for validation**

Run the focused test. Expected: derivation tests PASS; new validation tests FAIL.

- [x] **Step 6: Implement aggregated validation**

Use diagnostic shape:

```js
{
  code: "theme.missing-token",
  path: "packages/tokens/src/themes/aurora.css",
  brand: "aurora",
  actual: null,
  expected: "--sidebar-ring",
}
```

Required identity tokens are the 15 current variables from `validate-tokens.mjs`. Validation must not read disk, mutate input, throw for user-state errors, or stop after first failure.

- [x] **Step 7: Write failing synchronization tests**

Prove:

- only theme imports in `index.css` change;
- non-theme imports/comments remain byte-for-byte;
- only keys starting `./themes/` change in source and publish exports;
- all other manifest fields/exports remain deep-equal;
- invalid catalog prevents synchronization.

- [x] **Step 8: Implement pure synchronization**

Return:

```js
{
  indexCss: synchronizedIndexCss,
  manifest: synchronizedManifest,
}
```

Do not write files. Reject structural diagnostics, missing/orphan themes, incomplete themes, and invalid defaults before producing output. Derived-drift diagnostics are the only conditions synchronization may repair.

- [x] **Step 9: Run GREEN and commit**

Run:

```powershell
node --test scripts/brand-catalog.test.mjs
git diff --check
```

Expected: all focused tests PASS; diff check exit 0.

Commit:

```powershell
git add scripts/lib/brand-catalog.mjs scripts/brand-catalog.test.mjs
git commit -m "feat: derive internal brand catalog"
```

---

### Task 2: Add catalog and safe CLI adapter

**Files:**
- Create: `packages/tokens/brands.json`
- Create: `scripts/brand-catalog.mjs`
- Modify: `package.json`
- Test: `scripts/brand-catalog.test.mjs`

**Interfaces:**
- Consumes: pure functions from Task 1.
- Produces: `node scripts/brand-catalog.mjs --check|--write`; root scripts `check:brands` and `sync:brands`.

- [x] **Step 1: Add canonical catalog**

Create exactly:

```json
{
  "defaultBrand": "supertrans",
  "brands": [
    { "id": "supertrans", "label": "Supertrans" },
    { "id": "aurora", "label": "Aurora" }
  ]
}
```

- [x] **Step 2: Write failing adapter characterization**

Extract an adapter function accepting injected dependencies:

```js
runBrandCatalogCli({ mode, rootDir, readFile, writeFile, readDir })
```

Tests must prove:

- missing/unknown mode returns usage failure;
- `--check` aggregates diagnostics and writes nothing;
- `--write` refuses structural/theme failures;
- `--write` writes exactly absolute `index.css` and `package.json` paths under repo;
- attempts to resolve targets outside `rootDir` fail before writes;
- successful write preserves unrelated manifest content.

- [x] **Step 3: Run RED**

Run focused tests. Expected: adapter tests FAIL because CLI module/function is absent.

- [x] **Step 4: Implement adapter and executable entrypoint**

Use shell-free Node filesystem calls. Resolve fixed paths from `rootDir`; confirm each target equals the expected resolved path and remains beneath root. Serialize manifest with tab indentation plus trailing newline. Print every diagnostic as one line containing code/path/actual/expected.

- [x] **Step 5: Wire root scripts without duplicating check**

Set:

```json
{
  "check:brands": "node scripts/brand-catalog.mjs --check",
  "sync:brands": "node scripts/brand-catalog.mjs --write"
}
```

Replace the direct `check:storybook-brands` invocation in root `check` with `pnpm check:brands`. Keep old script temporarily until Task 4 migrates Storybook.

- [x] **Step 6: Run real check and write no-op**

Run:

```powershell
node scripts/brand-catalog.mjs --check
node scripts/brand-catalog.mjs --write
git diff -- packages/tokens/src/index.css packages/tokens/package.json
```

Expected: check exit 0; write reports no changes; diff empty because existing derivatives already match catalog.

- [x] **Step 7: Run tests and commit**

Run focused tests and `git diff --check`.

Commit:

```powershell
git add packages/tokens/brands.json scripts/brand-catalog.mjs scripts/brand-catalog.test.mjs package.json
git commit -m "feat: synchronize brand artifacts"
```

---

### Task 3: Replace hardcoded token validation

**Files:**
- Modify: `packages/tokens/scripts/validate-tokens.mjs`
- Modify: `packages/tokens/scripts/build-tokens.mjs` only if import path needs explicit adapter export
- Test: `scripts/brand-catalog.test.mjs`

**Interfaces:**
- Consumes: catalog JSON and `validateBrandState` from Task 1.
- Produces: current `pnpm check:tokens` behavior backed by catalog; token build fails on catalog/theme drift.

- [x] **Step 1: Characterize the existing executable contract**

Add an integration test that spawns `node packages/tokens/scripts/validate-tokens.mjs` in the real repository and asserts exit 0 plus the current `validate-tokens OK` prefix. The pure fixture tests from Tasks 1–2 already prove that a third catalog brand without CSS returns `theme.missing`; this step protects the executable contract during a behavior-preserving adapter refactor.

- [x] **Step 2: Run characterization before refactor**

Run focused tests. Expected: all pass before refactor; record this as characterization, not a RED exception for new behavior.

- [x] **Step 3: Refactor validator to thin adapter**

Remove hardcoded `brands` and token loops from `validate-tokens.mjs`. Reuse loader + pure validator. Preserve process contract:

```text
validate-tokens OK — catálogo, temas, imports e exports sincronizados.
```

On failure, print count and all deterministic diagnostics, then exit 1.

`build-tokens.mjs` must still validate before deleting/copying `dist`.

- [x] **Step 4: Run token and catalog gates**

Run:

```powershell
node --test scripts/brand-catalog.test.mjs
pnpm check:tokens
pnpm check:brands
```

Expected: all exit 0.

- [x] **Step 5: Commit**

```powershell
git add packages/tokens/scripts/validate-tokens.mjs packages/tokens/scripts/build-tokens.mjs scripts/brand-catalog.test.mjs
git commit -m "refactor: validate tokens from brand catalog"
```

Omit unchanged `build-tokens.mjs` from staging.

---

### Task 4: Move Storybook to the catalog

**Files:**
- Modify: `apps/storybook/.storybook/preview.tsx`
- Modify: `apps/storybook/stories/marcas.stories.tsx`
- Delete: `apps/storybook/src/brands.ts`
- Delete or replace: `scripts/check-storybook-brands.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `packages/tokens/brands.json`.
- Produces: toolbar, default brand and comparison driven by catalog order; no duplicated brand declarations.

- [x] **Step 1: Add failing source-integration assertions**

In `scripts/brand-catalog.test.mjs`, read Storybook sources and assert:

```js
assert.match(previewSource, /brands\.json/);
assert.match(comparisonSource, /brands\.json/);
assert.doesNotMatch(previewSource, /"supertrans"/);
assert.equal(existsSync("apps/storybook/src/brands.ts"), false);
```

Also assert no non-test source under `apps/storybook` declares `BRANDS` or `BRAND_LABELS`.

- [x] **Step 2: Run RED**

Run focused tests. Expected: FAIL on current imports/hardcoded fallback/existing `brands.ts`.

- [x] **Step 3: Implement typed local adapter over JSON**

In both Storybook files import catalog using the relative JSON path. In preview, derive:

```ts
const brandIds = new Set(catalog.brands.map(({ id }) => id));
const activeBrand =
  typeof context.globals.brand === "string" && brandIds.has(context.globals.brand)
    ? context.globals.brand
    : catalog.defaultBrand;
```

Toolbar uses `catalog.brands.map(({ id, label }) => ({ value: id, title: label }))`. `initialGlobals.brand` uses `catalog.defaultBrand`. Comparison maps `catalog.brands` and uses `brand.id`/`brand.label`.

- [x] **Step 4: Remove textual checker duplication**

Delete `apps/storybook/src/brands.ts`. Delete `scripts/check-storybook-brands.mjs` when all its behavior is covered by catalog validation and source-integration tests. Remove `check:storybook-brands` from root scripts; `check:brands` remains canonical.

- [x] **Step 5: Verify Storybook integration**

Run:

```powershell
node --test scripts/brand-catalog.test.mjs
pnpm check:brands
pnpm --filter @nucleo/storybook typecheck
pnpm build:storybook
```

Expected: tests/gates exit 0; static Storybook build succeeds with both catalog entries.

- [x] **Step 6: Commit**

```powershell
git add apps/storybook/.storybook/preview.tsx apps/storybook/stories/marcas.stories.tsx apps/storybook/src/brands.ts scripts/check-storybook-brands.mjs scripts/brand-catalog.test.mjs package.json
git commit -m "refactor: drive Storybook brands from catalog"
```

---

### Task 5: Align docs and verify release artifact

**Files:**
- Modify: `ai/workflows/add-brand-theme.md`
- Modify: `ai/context/04-token-rules.md`
- Modify: `docs/architecture/theming.md`
- Modify: `docs/architecture/storybook.md`
- Modify: `docs/superpowers/specs/2026-07-15-brand-catalog-storybook-deepening-design.md`
- Verify: `packages/tokens/package.json`, tarball inventory, all Task 1–4 files

**Interfaces:**
- Consumes: final CLI commands and catalog behavior.
- Produces: current operational narrative; fresh evidence; spec status `implementado e verificado`.

- [x] **Step 1: Update operational documentation**

Document exact add-brand flow:

```powershell
# editar packages/tokens/brands.json + criar themes/<id>.css
pnpm sync:brands
pnpm check:brands
pnpm check:tokens
pnpm build:storybook
```

State catalog is internal, products still import one CSS theme, and derived `index.css`/manifest fields must not be hand-edited.

- [x] **Step 2: Run focused and repository gates**

Run:

```powershell
node --test scripts/brand-catalog.test.mjs
pnpm check
pnpm typecheck
pnpm build
```

Expected: all exit 0.

- [x] **Step 3: Verify public compatibility and internal-only catalog**

Compare current token export keys with `2ae074b:packages/tokens/package.json`. Expected: exact key/value equality for `exports` and `publishConfig.exports`.

Run:

```powershell
pnpm pack:all
```

Inspect Tokens inventory. Expected: `package/dist/base.css`, `package/dist/index.css`, both theme CSS files; no `brands.json`, scripts, or source files.

No changeset is created because IDs, CSS, versions, exports and all published bytes remain compatible; this deepening changes only internal authoring and validation.

- [x] **Step 4: Mark spec verified and review status**

Change spec status to `implementado e verificado`. Run:

```powershell
git diff --check
git status --short
```

Expected: only planned documentation/spec changes remain unstaged.

- [x] **Step 5: Commit**

```powershell
git add ai/workflows/add-brand-theme.md ai/context/04-token-rules.md docs/architecture/theming.md docs/architecture/storybook.md docs/superpowers/specs/2026-07-15-brand-catalog-storybook-deepening-design.md
git commit -m "docs: align internal brand catalog workflow"
```

- [x] **Step 6: Final review evidence**

Record base/head SHAs, focused test count, repository gates, Storybook build, token export parity, tarball inventory, `git status --short`, and reviewer verdict. No push or publish.
