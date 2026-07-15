import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import {
	synchronizePackageManifest,
	validatePackageManifest,
} from "./lib/package-distribution.mjs";

const usage =
	"uso: node scripts/gen-dist-exports.mjs [--check|--write] <package.json> [package.json ...]";

function parseArguments(args) {
	const first = args[0];
	if (!first) {
		throw new Error(usage);
	}

	if (first === "--check" || first === "--write") {
		if (args.length === 1) {
			throw new Error(usage);
		}
		return { mode: first.slice(2), packagePaths: args.slice(1) };
	}
	if (first.startsWith("--")) {
		throw new Error(`opção desconhecida: ${first}\n${usage}`);
	}
	return { mode: "write", packagePaths: args };
}

function collectSourceFiles(packageDirectory) {
	const sourceDirectory = join(packageDirectory, "src");
	const sourceFiles = new Set();
	const pending = [sourceDirectory];

	while (pending.length > 0) {
		const directory = pending.pop();
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const entryPath = join(directory, entry.name);
			if (entry.isDirectory()) {
				pending.push(entryPath);
			} else if (entry.isFile()) {
				sourceFiles.add(relative(packageDirectory, entryPath).replaceAll("\\", "/"));
			}
		}
	}

	return sourceFiles;
}

function processPackage(packagePath, mode) {
	const resolvedPackagePath = resolve(packagePath);
	const packageDirectory = dirname(resolvedPackagePath);
	const manifest = JSON.parse(readFileSync(resolvedPackagePath, "utf8"));
	const currentManifest = mode === "write" ? synchronizePackageManifest(manifest) : manifest;

	if (mode === "write") {
		writeFileSync(resolvedPackagePath, `${JSON.stringify(currentManifest, null, "\t")}\n`);
	}

	return validatePackageManifest(currentManifest, collectSourceFiles(packageDirectory));
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

	const diagnostics = [];
	for (const packagePath of options.packagePaths) {
		try {
			diagnostics.push(...processPackage(packagePath, options.mode));
		} catch (error) {
			diagnostics.push(`${packagePath}: ${error.message}`);
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
		`gen-dist-exports OK — ${options.packagePaths.length} manifest(s) ${
			options.mode === "check" ? "sincronizado(s)" : "atualizado(s)"
		}`,
	);
}

main();
