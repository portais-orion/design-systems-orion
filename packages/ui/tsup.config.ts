import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";
import { preserveSourceClientBoundaries } from "../../scripts/lib/client-entrypoints.mjs";
import { derivePackageDistribution } from "../../scripts/lib/package-distribution.mjs";

const manifest = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const entry = derivePackageDistribution(manifest).entries.map(({ source }) => source);

/*
 * Build distribuível de @design-systems-orion/ui (Sprint 10 hardening).
 * Deriva as entradas dos subpaths existentes (src/<componente>/index.ts + src/index.ts),
 * preservando a estrutura em dist/ — sem mapeamento manual frágil.
 *
 * Peers/externals NÃO são bundlados (tree-shaking preservado no consumidor).
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
	treeshake: false,
	metafile: true,
	sourcemap: false,
	external: [
		"@design-systems-orion/motion",
		"react",
		"react-dom",
		"@base-ui/react",
		"lucide-react",
		"class-variance-authority",
		"tailwind-merge",
		"clsx",
	],
	async onSuccess() {
		preserveSourceClientBoundaries(new URL(".", import.meta.url));
	},
});
