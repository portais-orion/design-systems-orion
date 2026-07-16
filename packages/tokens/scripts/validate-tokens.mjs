import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { runBrandCatalogCli } from "../../../scripts/brand-catalog.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const result = await runBrandCatalogCli({
	mode: "--check",
	rootDir,
	readFile,
	writeFile,
	readDir: readdir,
});

function formatDiagnostic(diagnostic) {
	return ["code", "path", "actual", "expected"]
		.map((field) => `${field}=${JSON.stringify(diagnostic[field] ?? null)}`)
		.join(" ");
}

if (result.exitCode !== 0) {
	console.error(`validate-tokens FALHOU — ${result.diagnostics.length} problema(s).`);
	for (const diagnostic of result.diagnostics) {
		console.error(`- ${formatDiagnostic(diagnostic)}`);
	}
	process.exit(1);
}

console.log("validate-tokens OK — catálogo, temas, imports e exports sincronizados.");
