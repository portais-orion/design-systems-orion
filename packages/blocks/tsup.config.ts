import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";
import { derivePackageDistribution } from "../../scripts/lib/package-distribution.mjs";

const manifest = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const entry = derivePackageDistribution(manifest).entries.map(({ source }) => source);

/*
 * Build distribuível de @design-systems-orion/blocks (Sprint 10 hardening).
 * Deriva as entradas dos subpaths existentes (src/<bloco>/index.ts + src/index.ts).
 *
 * @design-systems-orion/ui NÃO é bundlado — resolve como dependência real no consumidor.
 * Nenhuma dependência de Next é introduzida.
 */
export default defineConfig({
	entry,
	format: ["esm"],
	// Emite .mjs + .d.mts (casa com scripts/gen-dist-exports.mjs).
	outExtension() {
		return { js: ".mjs" };
	},
	dts: true,
	outDir: "dist",
	clean: true,
	splitting: true,
	treeshake: true,
	sourcemap: false,
	external: [
		"react",
		"react-dom",
		"@design-systems-orion/ui",
		"@tanstack/react-table",
		"lucide-react",
	],
});
