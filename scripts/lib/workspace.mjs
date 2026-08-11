/*
 * Inventário do workspace: quais pacotes existem, quais são publicáveis e
 * quais arquivos cada um tem.
 *
 * Os gates de distribuição respondiam a essas perguntas cada um por conta
 * própria: `check-package-dist` e `gen-dist-exports` mantinham o próprio
 * `readdirSync` recursivo, e a lista de pacotes publicáveis estava escrita em
 * três lugares que já divergiam (`pack-packages` incluía tokens, os outros
 * dois não — foi assim que o brands.json ficou fora do tarball). Aqui a
 * resposta é derivada dos manifests: pacote novo entra uma vez, no disco.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const PACKAGES_DIRECTORY = "packages";

/** Caminho de repositório, sempre com "/" — o formato que os diagnósticos usam. */
function toPosix(path) {
	return path.split(sep).join("/");
}

export function readManifest(manifestPath) {
	return JSON.parse(readFileSync(manifestPath, "utf8"));
}

/**
 * Todo pacote de `packages/*` com package.json, em ordem estável.
 * `{ name, directory, path, manifestPath, manifest }` — `path` é relativo à raiz.
 */
export function listWorkspacePackages(rootDir) {
	const packagesRoot = join(rootDir, PACKAGES_DIRECTORY);
	if (!existsSync(packagesRoot)) return [];

	return readdirSync(packagesRoot, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort()
		.flatMap((name) => {
			const directory = join(packagesRoot, name);
			const manifestPath = join(directory, "package.json");
			if (!existsSync(manifestPath)) return [];
			const manifest = readManifest(manifestPath);
			return [
				{
					name: manifest.name ?? name,
					directory,
					path: `${PACKAGES_DIRECTORY}/${name}`,
					manifestPath,
					manifest,
				},
			];
		});
}

/**
 * Pacotes que vão para o registry: os que não são `private`. É a mesma
 * pergunta que o `pnpm publish` faz, então a lista não pode divergir dele.
 */
export function listPublishablePackages(rootDir) {
	return listWorkspacePackages(rootDir).filter((pkg) => pkg.manifest.private !== true);
}

const TYPESCRIPT_SOURCE_EXPORT = /^\.\/src\/.+\.(?:ts|tsx)$/;

/**
 * Pacotes publicáveis cujos exports são todos fonte TypeScript — os que o
 * `gen-dist-exports`/`check-package-dist` sabem derivar (tsup emite .mjs +
 * .d.mts para cada entrada). `tokens` publica CSS e fica de fora: quem valida
 * a distribuição dele é o `brand-catalog`.
 */
export function listDistributablePackages(rootDir) {
	return listPublishablePackages(rootDir).filter((pkg) => {
		const targets = Object.values(pkg.manifest.exports ?? {});
		return (
			targets.length > 0 &&
			targets.every((target) => typeof target === "string" && TYPESCRIPT_SOURCE_EXPORT.test(target))
		);
	});
}

/**
 * Arquivos de `<packageDirectory>/<subdirectory>`, com caminho relativo à raiz
 * do pacote (ex.: "dist/index.mjs", "src/button/button.tsx"). Subdiretório
 * ausente devolve um inventário vazio, não um erro — `dist/` só existe depois
 * do build.
 */
export function inventoryPackageFiles(packageDirectory, subdirectory) {
	const files = new Set();
	const root = join(packageDirectory, subdirectory);
	if (!existsSync(root)) return files;

	const pending = [root];
	while (pending.length > 0) {
		const directory = pending.pop();
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const entryPath = join(directory, entry.name);
			if (entry.isDirectory()) {
				pending.push(entryPath);
				continue;
			}
			if (entry.isFile()) {
				files.add(toPosix(relative(packageDirectory, entryPath)));
			}
		}
	}

	return files;
}
