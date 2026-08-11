import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { validateDistArtifacts } from "./lib/package-distribution.mjs";
import { inventoryPackageFiles, listDistributablePackages } from "./lib/workspace.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const packages = listDistributablePackages(ROOT);
const diagnostics = [];

for (const pkg of packages) {
	const distFiles = inventoryPackageFiles(pkg.directory, "dist");
	diagnostics.push(...validateDistArtifacts(pkg.manifest, distFiles));
}

if (diagnostics.length > 0) {
	console.error(diagnostics.join("\n"));
	process.exitCode = 1;
} else {
	console.log(
		`Artefatos de distribuição validados: ${packages.map((pkg) => pkg.name).join(", ")}.`,
	);
}
