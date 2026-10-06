import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";
import { preserveClientBoundaries } from "../../scripts/lib/client-entrypoints.mjs";
import { derivePackageDistribution } from "../../scripts/lib/package-distribution.mjs";

const manifest = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const distribution = derivePackageDistribution(manifest);

export default defineConfig({
	entry: distribution.entries.map(({ source }) => source),
	format: ["esm"],
	outExtension: () => ({ js: ".mjs", dts: ".d.mts" }),
	dts: true,
	outDir: "dist",
	clean: true,
	splitting: true,
	treeshake: true,
	external: ["react", "react-dom", "motion", "animejs", "@design-systems-orion/tokens"],
	async onSuccess() {
		// tsup removes module directives; preserve the client entry boundaries
		// while keeping the root policy resolver usable from server modules.
		preserveClientBoundaries(
			new URL(".", import.meta.url),
			distribution.entries.filter(({ subpath }) => subpath !== "."),
		);
	},
});
