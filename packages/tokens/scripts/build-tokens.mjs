// Build distribuível de @design-systems-orion/tokens (CSS puro): copia src/ -> dist/.
// Uso: node scripts/build-tokens.mjs  (a partir de packages/tokens/)
// O gate de marcas roda antes, encadeado no script `build` do package.json.
import { cp, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(pkgDir, "src");
const dist = resolve(pkgDir, "dist");
const brandsSrc = resolve(pkgDir, "brands.json");
const brandsDist = resolve(dist, "brands.json");

await rm(dist, { recursive: true, force: true });
await cp(src, dist, { recursive: true });
await cp(brandsSrc, brandsDist);
console.log("build-tokens OK — src/ e brands.json copiados para dist/");
