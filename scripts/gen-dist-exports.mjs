import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
	synchronizePackageManifest,
	validatePackageManifest,
} from "./lib/package-distribution.mjs";
import {
	inventoryPackageFiles,
	listDistributablePackages,
	readManifest,
} from "./lib/workspace.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const usage =
	"uso: node scripts/gen-dist-exports.mjs [--check|--write] [package.json ...]\n" +
	"sem caminhos, percorre os pacotes distribuíveis do workspace";

function parseArguments(args) {
	const first = args[0];
	if (first === "--check" || first === "--write") {
		return { mode: first.slice(2), packagePaths: args.slice(1) };
	}
	if (first?.startsWith("--")) {
		throw new Error(`opção desconhecida: ${first}\n${usage}`);
	}
	return { mode: "write", packagePaths: args };
}

/** Sem caminhos explícitos, os pacotes saem do inventário do workspace. */
function resolvePackagePaths(packagePaths) {
	if (packagePaths.length > 0) {
		return packagePaths.map((packagePath) => resolve(packagePath));
	}
	return listDistributablePackages(ROOT).map((pkg) => pkg.manifestPath);
}

function processPackage(manifestPath, mode) {
	const packageDirectory = dirname(manifestPath);
	const manifest = readManifest(manifestPath);
	const currentManifest = mode === "write" ? synchronizePackageManifest(manifest) : manifest;

	if (mode === "write") {
		writeFileSync(manifestPath, `${JSON.stringify(currentManifest, null, "\t")}\n`);
	}

	return validatePackageManifest(currentManifest, inventoryPackageFiles(packageDirectory, "src"));
}

function main() {
	let options;
	try {
		options = parseArguments(process.argv.slice(2));
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
		return;
	}

	const manifestPaths = resolvePackagePaths(options.packagePaths);
	if (manifestPaths.length === 0) {
		console.error(`nenhum pacote distribuível encontrado\n${usage}`);
		process.exitCode = 1;
		return;
	}

	const diagnostics = [];
	for (const manifestPath of manifestPaths) {
		try {
			diagnostics.push(...processPackage(manifestPath, options.mode));
		} catch (error) {
			diagnostics.push(`${manifestPath}: ${error.message}`);
		}
	}

	if (diagnostics.length > 0) {
		for (const diagnostic of diagnostics) {
			console.error(diagnostic);
		}
		process.exitCode = 1;
		return;
	}

	console.log(
		`gen-dist-exports OK — ${manifestPaths.length} manifest(s) ${
			options.mode === "check" ? "sincronizado(s)" : "atualizado(s)"
		}`,
	);
}

main();
