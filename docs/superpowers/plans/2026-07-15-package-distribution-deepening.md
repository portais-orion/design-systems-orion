# Package Distribution Deepening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `package.json.exports` the single canonical interface for TypeScript package subpaths and derive build, publish, dist, and tarball verification from it without breaking existing imports.

**Architecture:** A pure in-process module in `scripts/lib/package-distribution.mjs` derives all distribution metadata and returns diagnostics. Thin filesystem/CLI adapters synchronize committed manifests, configure tsup, validate built output, and inspect pnpm-generated tarballs. UI and Blocks share this module; Tokens keeps its CSS adapter.

**Tech Stack:** Node.js 22 (`node:test`, ESM), pnpm 9, tsup 8, Turborepo 2, Changesets, GitHub Actions.

## Global Constraints

- Preserve every current public subpath; no breaking change.
- `package.json.exports` is the canonical public source catalog.
- `publishConfig.exports` remains generated and committed.
- `--check` never writes; `--write` changes only distribution-derived fields.
- Keep ESM `.mjs` and declaration `.d.mts` outputs.
- Keep Tokens as a CSS adapter; do not force it through tsup.
- Do not change scope, versions, registry, access, peer dependencies, or consumer repositories.
- Follow TDD: test must fail for the expected reason before production code.
- Preserve unrelated working-tree changes; user authorized committing all current work directly on `main` after gates pass.

---

## File Map

- Create `scripts/lib/package-distribution.mjs`: pure derivation and validation interface.
- Create `scripts/package-distribution.test.mjs`: Node tests at deep module interface.
- Modify `scripts/gen-dist-exports.mjs`: thin `--check`/`--write` filesystem adapter.
- Create `scripts/check-package-dist.mjs`: post-build filesystem adapter.
- Create `scripts/pack-packages.mjs`: pnpm pack + tarball inspection adapter.
- Modify `packages/ui/tsup.config.ts`: entries derived from canonical exports.
- Modify `packages/blocks/tsup.config.ts`: entries derived from canonical exports.
- Modify `packages/ui/turbo.json`: inherit root `dist/**` output.
- Modify `packages/blocks/turbo.json`: inherit root `dist/**` output.
- Modify `package.json`: test/check/build/pack scripts.
- Modify `.github/workflows/release-packages.yml`: build, pack inspection, publish gate.
- Modify `docs/architecture/package-distribution.md`: current operational flow.
- Modify `ai/prompts/release-portais-orion.md`: remove manual export generation.

## Deep Module Interface

```js
derivePackageDistribution(manifest)
// => {
//   entries: [{ subpath, source, importTarget, typesTarget }],
//   files: ["dist"],
//   publishConfig: { main, module, types, exports }
// }

synchronizePackageManifest(manifest)
// => new manifest; input remains unchanged

validatePackageManifest(manifest, sourceFiles)
// => string[] diagnostics

validateDistArtifacts(manifest, distFiles)
// => string[] diagnostics

validatePackedArtifact({ manifest, files })
// => string[] diagnostics
```

`sourceFiles`, `distFiles`, and tarball `files` use normalized package-relative paths with `/` separators.

---

### Task 1: Verify and checkpoint existing work

**Files:**
- Commit: all current tracked and untracked repository changes already authorized by user

**Interfaces:**
- Consumes: current `main` working tree
- Produces: clean checkpoint commit before distribution implementation

- [x] **Step 1: Inspect pending scope**

Run:

```powershell
git status --short
git diff --check
git diff --stat
```

Expected: no whitespace errors; pending files match user-authorized Núcleo work plus this plan.

- [x] **Step 2: Run mandatory baseline gates**

Run:

```powershell
pnpm check
pnpm typecheck
pnpm build
```

Expected: all three exit 0. If any command fails, stop checkpoint, diagnose failure, write failing regression test where behavior changes, then rerun all three.

- [x] **Step 3: Commit checkpoint**

```powershell
git add -A
git diff --cached --check
git commit -m "chore: checkpoint nucleo platform updates"
```

Expected: commit created on `main`; working tree clean.

---

### Task 2: Derive distribution from canonical exports

**Files:**
- Create: `scripts/package-distribution.test.mjs`
- Create: `scripts/lib/package-distribution.mjs`

**Interfaces:**
- Consumes: manifest object with string TypeScript targets under `exports`
- Produces: `derivePackageDistribution(manifest)` and `synchronizePackageManifest(manifest)`

- [x] **Step 1: Write failing derivation tests**

Create tests containing these assertions:

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  derivePackageDistribution,
  synchronizePackageManifest,
} from "./lib/package-distribution.mjs";

const manifest = {
  name: "@portais-orion/example",
  files: ["legacy"],
  exports: {
    ".": "./src/index.ts",
    "./button": "./src/button/index.tsx",
  },
  publishConfig: {
    access: "restricted",
    registry: "https://npm.pkg.github.com",
  },
};

test("derives tsup entries and dist targets from source exports", () => {
  const result = derivePackageDistribution(manifest);
  assert.deepEqual(result.entries, [
    {
      subpath: ".",
      source: "src/index.ts",
      importTarget: "./dist/index.mjs",
      typesTarget: "./dist/index.d.mts",
    },
    {
      subpath: "./button",
      source: "src/button/index.tsx",
      importTarget: "./dist/button/index.mjs",
      typesTarget: "./dist/button/index.d.mts",
    },
  ]);
  assert.deepEqual(result.publishConfig.exports["./button"], {
    types: "./dist/button/index.d.mts",
    import: "./dist/button/index.mjs",
  });
});

test("synchronizes only derived distribution fields", () => {
  const result = synchronizePackageManifest(manifest);
  assert.deepEqual(result.files, ["dist"]);
  assert.equal(result.publishConfig.access, "restricted");
  assert.equal(result.publishConfig.registry, "https://npm.pkg.github.com");
  assert.equal(result.publishConfig.main, "./dist/index.mjs");
  assert.equal(result.exports, manifest.exports);
  assert.notEqual(result, manifest);
});

test("rejects non-TypeScript source exports", () => {
  assert.throws(
    () => derivePackageDistribution({ name: "bad", exports: { ".": "./src/index.js" } }),
    /bad.*\.\/src\/index\.js.*\.ts|\.tsx/s,
  );
});
```

- [x] **Step 2: Verify RED**

Run:

```powershell
node --test scripts/package-distribution.test.mjs
```

Expected: FAIL because `scripts/lib/package-distribution.mjs` does not exist.

- [x] **Step 3: Implement minimal derivation**

Implement exported functions with these rules:

```js
const SOURCE_TARGET = /^\.\/src\/(.+)\.(ts|tsx)$/;

function toEntry(name, subpath, target) {
  const match = target.match(SOURCE_TARGET);
  if (!match) {
    throw new Error(`${name}: export ${subpath} aponta para ${target}; esperado ./src/*.ts ou .tsx`);
  }
  const relative = match[1];
  return {
    subpath,
    source: target.slice(2),
    importTarget: `./dist/${relative}.mjs`,
    typesTarget: `./dist/${relative}.d.mts`,
  };
}
```

`derivePackageDistribution` must preserve export insertion order. Root `main`, `module`, and `types` must use root entry targets. `synchronizePackageManifest` must shallow-copy nested objects and preserve non-derived `publishConfig` fields.

- [x] **Step 4: Verify GREEN**

Run:

```powershell
node --test scripts/package-distribution.test.mjs
```

Expected: 3 tests pass, 0 fail.

- [x] **Step 5: Commit**

```powershell
git add scripts/lib/package-distribution.mjs scripts/package-distribution.test.mjs
git commit -m "feat: derive package distribution metadata"
```

---

### Task 3: Validate and synchronize manifests through CLI

**Files:**
- Modify: `scripts/package-distribution.test.mjs`
- Modify: `scripts/lib/package-distribution.mjs`
- Modify: `scripts/gen-dist-exports.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: Task 2 derivation functions
- Produces: `validatePackageManifest(manifest, sourceFiles)`, CLI `--check`/`--write`, root `check:packages`

- [x] **Step 1: Write failing manifest validation tests**

Add:

```js
import { validatePackageManifest } from "./lib/package-distribution.mjs";

test("reports missing source and stale publish map", () => {
  const stale = {
    ...manifest,
    publishConfig: {
      ...manifest.publishConfig,
      exports: { ".": { types: "./old.d.ts", import: "./old.js" } },
    },
  };
  const diagnostics = validatePackageManifest(stale, new Set(["src/index.ts"]));
  assert.ok(diagnostics.some((item) => item.includes("src/button/index.tsx")));
  assert.ok(diagnostics.some((item) => item.includes("publishConfig.exports")));
});

test("accepts synchronized manifest with every source present", () => {
  const synced = synchronizePackageManifest(manifest);
  assert.deepEqual(
    validatePackageManifest(synced, new Set(["src/index.ts", "src/button/index.tsx"])),
    [],
  );
});
```

- [x] **Step 2: Verify RED**

Run `node --test scripts/package-distribution.test.mjs`.

Expected: FAIL because `validatePackageManifest` is not exported.

- [x] **Step 3: Implement minimal validation**

Validation must aggregate diagnostics instead of stopping after first mismatch. Compare derived fields with deep equality through stable JSON serialization. Do not inspect unrelated manifest fields.

- [x] **Step 4: Verify GREEN**

Run `node --test scripts/package-distribution.test.mjs`.

Expected: 5 tests pass, 0 fail.

- [x] **Step 5: Replace CLI implementation**

CLI parsing rules:

```txt
node scripts/gen-dist-exports.mjs --check packages/ui/package.json packages/blocks/package.json
node scripts/gen-dist-exports.mjs --write packages/ui/package.json packages/blocks/package.json
node scripts/gen-dist-exports.mjs packages/ui/package.json
```

No-mode invocation equals `--write` for backward compatibility. `--check` reads package files and source inventory, prints all diagnostics, exits 1 on mismatch, and never writes. `--write` applies `synchronizePackageManifest`, writes tab-indented JSON plus final newline, then runs validation.

- [x] **Step 6: Add root gate and verify current manifests**

Add to root `package.json`:

```json
"test:distribution": "node --test scripts/package-distribution.test.mjs",
"check:packages": "node scripts/gen-dist-exports.mjs --check packages/ui/package.json packages/blocks/package.json"
```

Insert both into `check` before Biome.

Run:

```powershell
node scripts/gen-dist-exports.mjs --check packages/ui/package.json packages/blocks/package.json
```

Expected: exit 0. If stale, run `--write` once, inspect manifest diff, rerun `--check`.

- [x] **Step 7: Commit**

```powershell
git add scripts/gen-dist-exports.mjs scripts/lib/package-distribution.mjs scripts/package-distribution.test.mjs package.json packages/ui/package.json packages/blocks/package.json
git commit -m "feat: gate package export parity"
```

---

### Task 4: Derive tsup entries and restore Turbo outputs

**Files:**
- Modify: `packages/ui/tsup.config.ts`
- Modify: `packages/blocks/tsup.config.ts`
- Modify: `packages/ui/turbo.json`
- Modify: `packages/blocks/turbo.json`

**Interfaces:**
- Consumes: `derivePackageDistribution(manifest).entries`
- Produces: tsup entry arrays matching canonical exports; inherited `dist/**` cache outputs

- [x] **Step 1: Write real-catalog characterization test**

Add a test that reads real UI/Blocks manifests and asserts canonical entry arrays equal expected source targets, including root and latest three Blocks subpaths:

```js
import { readFileSync } from "node:fs";

test("real package catalogs expose their complete tsup entries", () => {
  for (const path of ["packages/ui/package.json", "packages/blocks/package.json"]) {
    const real = JSON.parse(readFileSync(path, "utf8"));
    const result = derivePackageDistribution(real);
    assert.equal(result.entries.length, Object.keys(real.exports).length);
    assert.ok(result.entries.every((entry) => entry.source.startsWith("src/")));
  }
});
```

- [x] **Step 2: Record approved configuration exception**

Run `node --test scripts/package-distribution.test.mjs`.

Expected: characterization passes. User explicitly authorized no textual implementation test for `tsup.config.ts`; behavior is verified by canonical derivation, build, and dist artifact gates.

- [x] **Step 3: Update tsup configs**

Each config reads its manifest with `readFileSync(new URL("./package.json", import.meta.url), "utf8")`, derives entries, and passes source paths to `defineConfig({ entry })`. Keep format, output extensions, DTS, externals, splitting, treeshake, and clean unchanged.

- [x] **Step 4: Remove local Turbo output overrides**

Replace both package `turbo.json` files with:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "extends": ["//"]
}
```

- [x] **Step 5: Verify GREEN and builds**

Run:

```powershell
node --test scripts/package-distribution.test.mjs
pnpm --filter @portais-orion/ui build
pnpm --filter @portais-orion/blocks build
```

Expected: tests pass; both builds exit 0 and create root plus every subpath output.

- [x] **Step 6: Commit**

```powershell
git add packages/ui/tsup.config.ts packages/blocks/tsup.config.ts packages/ui/turbo.json packages/blocks/turbo.json scripts/package-distribution.test.mjs
git commit -m "refactor: derive package build entries"
```

---

### Task 5: Validate built artifacts

**Files:**
- Modify: `scripts/package-distribution.test.mjs`
- Modify: `scripts/lib/package-distribution.mjs`
- Create: `scripts/check-package-dist.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: canonical manifest and normalized `dist` inventory
- Produces: `validateDistArtifacts(manifest, distFiles)` and post-build gate

- [x] **Step 1: Write failing dist tests**

Add:

```js
import { validateDistArtifacts } from "./lib/package-distribution.mjs";

test("reports each missing runtime and declaration artifact", () => {
  const diagnostics = validateDistArtifacts(manifest, new Set(["dist/index.mjs"]));
  assert.ok(diagnostics.some((item) => item.includes("dist/index.d.mts")));
  assert.ok(diagnostics.some((item) => item.includes("dist/button/index.mjs")));
  assert.ok(diagnostics.some((item) => item.includes("dist/button/index.d.mts")));
});

test("accepts complete dist inventory", () => {
  const files = new Set([
    "dist/index.mjs",
    "dist/index.d.mts",
    "dist/button/index.mjs",
    "dist/button/index.d.mts",
  ]);
  assert.deepEqual(validateDistArtifacts(manifest, files), []);
});
```

- [x] **Step 2: Verify RED**

Run `node --test scripts/package-distribution.test.mjs`.

Expected: FAIL because `validateDistArtifacts` is absent.

- [x] **Step 3: Implement and wire post-build adapter**

`scripts/check-package-dist.mjs` must recursively inventory `dist` for UI and Blocks, normalize separators, aggregate diagnostics, print package-qualified errors, and exit 1 on any missing artifact.

Change root build script to:

```json
"build": "turbo build && node scripts/check-package-dist.mjs"
```

- [x] **Step 4: Verify GREEN**

Run:

```powershell
node --test scripts/package-distribution.test.mjs
pnpm build
```

Expected: tests pass; build and post-build gate exit 0.

- [x] **Step 5: Commit**

```powershell
git add scripts/lib/package-distribution.mjs scripts/package-distribution.test.mjs scripts/check-package-dist.mjs package.json
git commit -m "feat: validate package dist artifacts"
```

---

### Task 6: Pack with pnpm and inspect tarballs

**Files:**
- Modify: `scripts/package-distribution.test.mjs`
- Modify: `scripts/lib/package-distribution.mjs`
- Create: `scripts/pack-packages.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/release-packages.yml`

**Interfaces:**
- Consumes: extracted packed manifest and tarball inventory
- Produces: `validatePackedArtifact({ manifest, files })`; inspected `.tmp/packages/*.tgz`

- [x] **Step 1: Write failing packed-artifact tests**

Add tests:

```js
import { validatePackedArtifact } from "./lib/package-distribution.mjs";

const synchronized = synchronizePackageManifest(manifest);
const packed = {
  ...synchronized,
  main: synchronized.publishConfig.main,
  module: synchronized.publishConfig.module,
  types: synchronized.publishConfig.types,
  exports: synchronized.publishConfig.exports,
  dependencies: { internal: "1.2.3" },
};

test("accepts package.json plus dist files", () => {
  assert.deepEqual(
    validatePackedArtifact({
      manifest: packed,
      files: new Set([
        "package/package.json",
        "package/dist/index.mjs",
        "package/dist/index.d.mts",
        "package/dist/button/index.mjs",
        "package/dist/button/index.d.mts",
      ]),
    }),
    [],
  );
});

test("rejects source, credentials, unknown roots, and workspace dependencies", () => {
  const diagnostics = validatePackedArtifact({
    manifest: {
      ...packed,
      exports: { ".": "./src/index.ts" },
      dependencies: { internal: "workspace:*" },
    },
    files: new Set([
      "package/package.json",
      "package/src/index.ts",
      "package/.npmrc",
      "package/private.txt",
    ]),
  });
  for (const fragment of ["exports", "src", ".npmrc", "private.txt", "workspace:*"]) {
    assert.ok(diagnostics.some((item) => item.includes(fragment)));
  }
});
```

- [x] **Step 2: Verify RED**

Run `node --test scripts/package-distribution.test.mjs`.

Expected: FAIL because `validatePackedArtifact` is absent.

- [x] **Step 3: Implement tarball policy**

Allowed roots: `package/package.json`, optional `package/README*`, optional `package/LICENSE*`, and `package/dist/**`. Reject `.env*`, `.npmrc`, `src/**`, secrets by filename, unresolved `workspace:*` recursively in dependencies, optionalDependencies, and peerDependencies, and any packed `main`/`module`/`types`/`exports` target outside `./dist/`.

- [x] **Step 4: Implement pack adapter**

`scripts/pack-packages.mjs` must:

1. Empty only repository-owned `.tmp/packages` after resolving and verifying path stays under repo `.tmp`.
2. Run pnpm pack for Tokens, UI, and Blocks with destination `.tmp/packages`.
3. List each archive with `tar -tf`.
4. Read `package/package.json` with `tar -xOf`.
5. Validate inventory and packed manifest.
6. Print archive path and file count; exit 1 on any diagnostic.

Change root script:

```json
"pack:all": "node scripts/pack-packages.mjs"
```

- [x] **Step 5: Update release workflow**

Quality gates remain `pnpm check`, `pnpm typecheck`, `pnpm build`. Run `pnpm pack:all` for both dry-run and publish paths before `pnpm publish:packages`. Remove separate `pnpm check:pureza` once root `check` includes it. Never publish if pack inspection fails.

- [x] **Step 6: Verify GREEN**

Run:

```powershell
node --test scripts/package-distribution.test.mjs
pnpm build
pnpm pack:all
```

Expected: tests/build pass; three inspected tarballs under `.tmp/packages`; no source, credential, unknown root, or `workspace:*` diagnostic.

- [x] **Step 7: Commit**

```powershell
git add scripts/lib/package-distribution.mjs scripts/package-distribution.test.mjs scripts/pack-packages.mjs package.json .github/workflows/release-packages.yml
git commit -m "feat: inspect package tarballs before release"
```

---

### Task 7: Align operational documentation

**Files:**
- Modify: `docs/architecture/package-distribution.md`
- Modify: `ai/prompts/release-portais-orion.md`
- Modify: `docs/superpowers/specs/2026-07-15-package-distribution-deepening-design.md`

**Interfaces:**
- Consumes: final commands and behavior from Tasks 2–6
- Produces: one current operational narrative; spec status implemented

- [x] **Step 1: Update architecture documentation**

Document exact pipeline:

```txt
package.json.exports
  -> package-distribution deep module
  -> tsup entries + committed publishConfig.exports
  -> dist verification
  -> pnpm tarball + inspection
  -> publish
```

State UI/Blocks use tsup adapter; Tokens uses CSS adapter. Remove source-based/pending-transfer statements contradicted by current manifests.

- [x] **Step 2: Update release prompt**

Delete manual `gen-dist-exports` step. Replace with:

```powershell
pnpm check
pnpm typecheck
pnpm build
pnpm pack:all
```

Keep external publish/consumer steps, token safety, and no-Aurora constraints.

- [x] **Step 3: Mark spec in progress**

Change spec status to `em implementação`. Completion status belongs to Task 8 after fresh gates.

- [x] **Step 4: Run documentation checks**

Run:

```powershell
pnpm check:integrity
pnpm check:packages
git diff --check
```

Expected: all exit 0.

- [x] **Step 5: Commit**

```powershell
git add docs/architecture/package-distribution.md ai/prompts/release-portais-orion.md docs/superpowers/specs/2026-07-15-package-distribution-deepening-design.md
git commit -m "docs: align package distribution workflow"
```

---

### Task 8: Final verification and integration evidence

**Files:**
- Verify: all files from Tasks 1–7
- Modify only if a gate exposes a regression; add failing test first for behavior changes

**Interfaces:**
- Consumes: completed distribution deepening
- Produces: fresh evidence for completion; clean `main`

- [x] **Step 1: Run focused tests**

```powershell
node --test scripts/package-distribution.test.mjs
```

Expected: all tests pass, 0 fail.

- [x] **Step 2: Run mandatory repository gates**

```powershell
pnpm check
pnpm typecheck
pnpm build
```

Expected: all exit 0.

- [x] **Step 3: Run package artifact gate**

```powershell
pnpm pack:all
```

Expected: Tokens, UI, and Blocks tarballs inspected successfully.

- [x] **Step 4: Mark verified spec complete**

Change spec status from `em implementação` to `implementado e verificado` now that fresh focused, repository, and artifact gates passed.

- [x] **Step 5: Verify public subpaths unchanged**

Compare current subpath keys against commit `450d523`:

```powershell
git show 450d523:packages/ui/package.json
git show 450d523:packages/blocks/package.json
```

Expected: `exports` key sets match exactly; only derived distribution fields changed.

- [x] **Step 6: Review final diff and status**

```powershell
git diff --check
git status --short
git log --oneline -8
```

Expected: no unstaged implementation changes; commits on `main`; no merge needed because work started and finished on `main` per user instruction.

- [x] **Step 7: Commit verified spec status or final fixes**

```powershell
git add -A
git diff --cached --check
git commit -m "fix: complete package distribution gates"
```

Skip only when working tree already clean.
