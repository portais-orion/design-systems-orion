import { defineConfig } from "tsup";

/*
 * Build distribuível de @portais-orion/blocks (Sprint 10 hardening).
 * Deriva as entradas dos subpaths existentes (src/<bloco>/index.ts + src/index.ts).
 *
 * @portais-orion/ui NÃO é bundlado — resolve como dependência real no consumidor.
 * Nenhuma dependência de Next é introduzida.
 */
export default defineConfig({
	entry: ["src/index.ts", "src/*/index.ts"],
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
	external: ["react", "react-dom", "@portais-orion/ui", "@tanstack/react-table", "lucide-react"],
});
