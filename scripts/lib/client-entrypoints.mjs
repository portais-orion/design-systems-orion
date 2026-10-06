import { readFileSync, unlinkSync, writeFileSync } from "node:fs";

/** Restore boundaries after tsup's tree-shaking removes module directives. */
export function preserveClientBoundaries(directory, entries) {
	for (const { importTarget } of entries) {
		const path = new URL(importTarget, directory);
		const source = readFileSync(path, "utf8");
		if (!source.startsWith('"use client";\n')) writeFileSync(path, `"use client";\n${source}`);
	}
}

/** Esbuild metadata preserves source boundaries without converting mixed barrels to client modules. */
export function preserveSourceClientBoundaries(directory) {
	const metadataPath = new URL("./dist/metafile-esm.json", directory);
	const { outputs } = JSON.parse(readFileSync(metadataPath, "utf8"));
	for (const [output, { inputs }] of Object.entries(outputs)) {
		if (!output.endsWith(".mjs")) continue;
		const client = Object.keys(inputs).some((input) => {
			if (!/\.[cm]?[jt]sx?$/.test(input)) return false;
			return /^\s*["']use client["']/.test(readFileSync(new URL(input, directory), "utf8"));
		});
		if (client) preserveClientBoundaries(directory, [{ importTarget: output }]);
	}
	// Build metadata is not part of the published runtime contract.
	unlinkSync(metadataPath);
}
