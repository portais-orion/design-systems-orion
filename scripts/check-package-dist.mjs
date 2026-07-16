import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { validateDistArtifacts } from "./lib/package-distribution.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PACKAGE_PATHS = ["packages/ui", "packages/blocks"];

function inventoryDist(packagePath) {
	const packageRoot = join(ROOT, packagePath);
	const distRoot = join(packageRoot, "dist");
	const files = new Set();

	if (!existsSync(distRoot)) {
		return files;
	}

	function visit(directory) {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const absolutePath = join(directory, entry.name);
			if (entry.isDirectory()) {
				visit(absolutePath);
				continue;
			}
			if (entry.isFile()) {
				const relativePath = relative(packageRoot, absolutePath);
				files.add(relativePath.split(sep).join("/"));
			}
		}
	}

	visit(distRoot);
	return files;
}

const diagnostics = [];

for (const packagePath of PACKAGE_PATHS) {
	const packageRoot = join(ROOT, packagePath);
	const manifest = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
	const distFiles = inventoryDist(packagePath);
	diagnostics.push(...validateDistArtifacts(manifest, distFiles));
}

if (diagnostics.length > 0) {
	console.error(diagnostics.join("\n"));
	process.exitCode = 1;
} else {
	console.log("Artefatos de distribuição de UI e Blocks validados.");
}
