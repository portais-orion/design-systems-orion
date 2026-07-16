import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { synchronizeBrandArtifacts, validateBrandState } from "./lib/brand-catalog.mjs";

const USAGE = "Usage: node scripts/brand-catalog.mjs --check|--write";
const RELATIVE_PATHS = {
	catalog: "packages/tokens/brands.json",
	themeDir: "packages/tokens/src/themes",
	baseCss: "packages/tokens/src/base.css",
	indexCss: "packages/tokens/src/index.css",
	manifest: "packages/tokens/package.json",
};

function failure(diagnostics, message) {
	return { exitCode: 1, diagnostics, message, writtenPaths: [] };
}

function resolveRepositoryPaths(rootDir) {
	if (typeof rootDir !== "string" || !path.isAbsolute(rootDir)) {
		return {
			diagnostic: {
				code: "path.root-not-absolute",
				path: "rootDir",
				actual: rootDir ?? null,
				expected: "absolute repository path",
			},
		};
	}

	const root = path.resolve(rootDir);
	const paths = {};
	for (const [name, relativePath] of Object.entries(RELATIVE_PATHS)) {
		const target = path.resolve(root, relativePath);
		const expected = path.join(root, ...relativePath.split("/"));
		const relative = path.relative(root, target);
		if (
			target !== expected ||
			relative === ".." ||
			relative.startsWith(`..${path.sep}`) ||
			path.isAbsolute(relative)
		) {
			return {
				diagnostic: {
					code: "path.outside-root",
					path: relativePath,
					actual: target,
					expected,
				},
			};
		}
		paths[name] = target;
	}
	return { paths };
}

function parseJson(content, filePath) {
	try {
		return { value: JSON.parse(content) };
	} catch (error) {
		return {
			diagnostic: {
				code: "json.invalid",
				path: filePath,
				actual: error.message,
				expected: "valid JSON",
			},
		};
	}
}

function directoryEntryName(entry) {
	if (typeof entry === "string") return entry;
	if (entry?.isFile?.()) return entry.name;
	return null;
}

async function loadBrandState(paths, readFileDependency, readDirDependency) {
	try {
		const [catalogContent, baseCss, indexCss, manifestContent, entries] = await Promise.all([
			readFileDependency(paths.catalog, "utf8"),
			readFileDependency(paths.baseCss, "utf8"),
			readFileDependency(paths.indexCss, "utf8"),
			readFileDependency(paths.manifest, "utf8"),
			readDirDependency(paths.themeDir, { withFileTypes: true }),
		]);
		const catalogResult = parseJson(catalogContent, RELATIVE_PATHS.catalog);
		if (catalogResult.diagnostic) return catalogResult;
		const manifestResult = parseJson(manifestContent, RELATIVE_PATHS.manifest);
		if (manifestResult.diagnostic) return manifestResult;

		const themes = {};
		for (const entry of entries) {
			const name = directoryEntryName(entry);
			if (!name || path.extname(name) !== ".css") continue;
			if (path.basename(name) !== name) {
				return {
					diagnostic: {
						code: "path.unsafe-theme-entry",
						path: RELATIVE_PATHS.themeDir,
						actual: name,
						expected: "CSS filename without path segments",
					},
				};
			}
			const brand = path.basename(name, ".css");
			themes[brand] = await readFileDependency(path.join(paths.themeDir, name), "utf8");
		}

		return {
			state: {
				catalog: catalogResult.value,
				themes,
				baseCss: String(baseCss),
				indexCss: String(indexCss),
				manifest: manifestResult.value,
			},
		};
	} catch (error) {
		return {
			diagnostic: {
				code: "io.failure",
				path: error.path ?? "repository",
				actual: error.message,
				expected: "readable brand catalog state",
			},
		};
	}
}

export async function runBrandCatalogCli({ mode, rootDir, readFile, writeFile, readDir }) {
	if (mode !== "--check" && mode !== "--write") {
		return { exitCode: 2, diagnostics: [], message: USAGE, writtenPaths: [] };
	}

	const resolved = resolveRepositoryPaths(rootDir);
	if (resolved.diagnostic) return failure([resolved.diagnostic]);
	const loaded = await loadBrandState(resolved.paths, readFile, readDir);
	if (loaded.diagnostic) return failure([loaded.diagnostic]);

	const diagnostics = validateBrandState(loaded.state);
	if (mode === "--check") {
		return {
			exitCode: diagnostics.length === 0 ? 0 : 1,
			diagnostics,
			message: diagnostics.length === 0 ? "Brand artifacts are synchronized." : undefined,
			writtenPaths: [],
		};
	}

	let synchronized;
	try {
		synchronized = synchronizeBrandArtifacts(loaded.state);
	} catch {
		return failure(diagnostics);
	}

	const serializedManifest = `${JSON.stringify(synchronized.manifest, null, "\t")}\n`;
	const writtenPaths = [];
	if (synchronized.indexCss !== loaded.state.indexCss) {
		await writeFile(resolved.paths.indexCss, synchronized.indexCss, "utf8");
		writtenPaths.push(resolved.paths.indexCss);
	}
	if (serializedManifest !== `${JSON.stringify(loaded.state.manifest, null, "\t")}\n`) {
		await writeFile(resolved.paths.manifest, serializedManifest, "utf8");
		writtenPaths.push(resolved.paths.manifest);
	}

	return {
		exitCode: 0,
		diagnostics: [],
		message:
			writtenPaths.length === 0
				? "Brand artifacts already synchronized; no changes."
				: `Updated ${writtenPaths.join(", ")}`,
		writtenPaths,
	};
}

function formatDiagnostic(diagnostic) {
	return ["code", "path", "actual", "expected"]
		.map((field) => `${field}=${JSON.stringify(diagnostic[field] ?? null)}`)
		.join(" ");
}

async function main() {
	const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
	const result = await runBrandCatalogCli({
		mode: process.argv[2],
		rootDir,
		readFile,
		writeFile,
		readDir: readdir,
	});
	for (const diagnostic of result.diagnostics) console.error(formatDiagnostic(diagnostic));
	if (result.message) {
		const output = result.exitCode === 0 ? console.log : console.error;
		output(result.message);
	}
	process.exitCode = result.exitCode;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
	await main();
}
