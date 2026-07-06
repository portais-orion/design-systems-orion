// Deriva os exports de dist a partir dos subpaths src existentes (sem mapa manual frágil).
// Aplica em publishConfig (dev continua usando exports->src; publish usa dist via pnpm publishConfig).
// Uso: node scripts/gen-dist-exports.mjs packages/ui/package.json
//      node scripts/gen-dist-exports.mjs packages/blocks/package.json
import { readFileSync, writeFileSync } from "node:fs";

const pkgPath = process.argv[2];
if (!pkgPath) {
	console.error("uso: node scripts/gen-dist-exports.mjs <caminho/para/package.json>");
	process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const isTs = (p) => typeof p === "string" && /\.(ts|tsx)$/.test(p);
const toJs = (p) => p.replace(/^\.\/src\//, "./dist/").replace(/\.(ts|tsx)$/, ".mjs");
const toDts = (p) => p.replace(/^\.\/src\//, "./dist/").replace(/\.(ts|tsx)$/, ".d.mts");

const distExports = {};
for (const [key, val] of Object.entries(pkg.exports ?? {})) {
	// TS subpaths -> { types, import } em dist; CSS/outros mantêm (tokens usa isto).
	distExports[key] = isTs(val) ? { types: toDts(val), import: toJs(val) } : val;
}

pkg.publishConfig = {
	...(pkg.publishConfig ?? {}),
	main: "./dist/index.mjs",
	module: "./dist/index.mjs",
	types: "./dist/index.d.mts",
	exports: distExports,
};
pkg.files = ["dist"];

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, "\t")}\n`);
console.log(`gen-dist-exports OK — publishConfig.exports (dist) gerado em ${pkgPath}`);
