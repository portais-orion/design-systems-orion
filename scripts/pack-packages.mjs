import { spawnSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { validatePackedArtifact } from "./lib/package-distribution.mjs";

const REPOSITORY_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const REPOSITORY_TEMP = resolve(REPOSITORY_ROOT, ".tmp");
const PACK_DIRECTORY = resolve(REPOSITORY_TEMP, "packages");
const PACKAGE_DIRECTORIES = ["packages/tokens", "packages/ui", "packages/blocks"];

function assertOwnedPackDirectory() {
	const expected = resolve(REPOSITORY_ROOT, ".tmp", "packages");
	const fromTemp = relative(REPOSITORY_TEMP, PACK_DIRECTORY);
	if (
		PACK_DIRECTORY !== expected ||
		fromTemp !== "packages" ||
		isAbsolute(fromTemp) ||
		fromTemp === ".." ||
		fromTemp.startsWith(`..${sep}`)
	) {
		throw new Error(`diretorio de pack nao pertence a .tmp do repositorio: ${PACK_DIRECTORY}`);
	}
	for (const path of [REPOSITORY_TEMP, PACK_DIRECTORY]) {
		if (existsSync(path) && lstatSync(path).isSymbolicLink()) {
			throw new Error(`recusando diretorio de pack simbolico: ${path}`);
		}
	}
}

function resetPackDirectory() {
	assertOwnedPackDirectory();
	rmSync(PACK_DIRECTORY, { recursive: true, force: true });
	mkdirSync(PACK_DIRECTORY, { recursive: true });
}

function run(command, args, cwd) {
	const result = spawnSync(command, args, {
		cwd,
		encoding: "utf8",
		windowsHide: true,
	});
	if (result.error) {
		throw result.error;
	}
	if (result.status !== 0) {
		const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
		throw new Error(
			`${command} ${args.join(" ")} falhou (exit ${result.status})${details ? `\n${details}` : ""}`,
		);
	}
	return result.stdout;
}

function archives() {
	return new Set(
		readdirSync(PACK_DIRECTORY)
			.filter((file) => file.endsWith(".tgz"))
			.map((file) => resolve(PACK_DIRECTORY, file)),
	);
}

function packPackages() {
	const diagnostics = [];
	const archivePaths = [];
	const pnpmScript = process.env.npm_execpath;
	if (!pnpmScript || !existsSync(pnpmScript)) {
		throw new Error("execute o adaptador pelo script pnpm pack:all");
	}

	for (const packageDirectory of PACKAGE_DIRECTORIES) {
		const before = archives();
		const cwd = resolve(REPOSITORY_ROOT, packageDirectory);
		try {
			run(process.execPath, [pnpmScript, "pack", "--pack-destination", PACK_DIRECTORY], cwd);
		} catch (error) {
			diagnostics.push(`${packageDirectory}: ${error.message}`);
			continue;
		}
		const created = [...archives()].filter((archive) => !before.has(archive));
		if (created.length !== 1) {
			diagnostics.push(
				`${packageDirectory}: esperado um novo tarball, encontrados ${created.length}`,
			);
			continue;
		}
		archivePaths.push(created[0]);
	}

	return { archivePaths, diagnostics };
}

function inspectArchive(archivePath) {
	const inventoryOutput = run("tar", ["-tf", archivePath], REPOSITORY_ROOT);
	const files = new Set(
		inventoryOutput
			.split(/\r?\n/)
			.map((file) => file.trim())
			.filter(Boolean),
	);
	const manifestOutput = run("tar", ["-xOf", archivePath, "package/package.json"], REPOSITORY_ROOT);
	const manifest = JSON.parse(manifestOutput);
	return {
		diagnostics: validatePackedArtifact({ manifest, files }),
		fileCount: files.size,
	};
}

function main() {
	resetPackDirectory();
	const { archivePaths, diagnostics } = packPackages();

	for (const archivePath of archivePaths) {
		try {
			const inspection = inspectArchive(archivePath);
			console.log(`${relative(REPOSITORY_ROOT, archivePath)}: ${inspection.fileCount} arquivos`);
			diagnostics.push(...inspection.diagnostics);
		} catch (error) {
			diagnostics.push(`${relative(REPOSITORY_ROOT, archivePath)}: ${error.message}`);
		}
	}

	if (archivePaths.length !== PACKAGE_DIRECTORIES.length) {
		diagnostics.push(
			`esperados ${PACKAGE_DIRECTORIES.length} tarballs inspecionados, encontrados ${archivePaths.length}`,
		);
	}

	if (diagnostics.length > 0) {
		console.error("Inspecao dos pacotes falhou:");
		for (const diagnostic of diagnostics) {
			console.error(`- ${diagnostic}`);
		}
		process.exitCode = 1;
	}
}

try {
	main();
} catch (error) {
	console.error(`Pack abortado com seguranca: ${error.message}`);
	process.exitCode = 1;
}
