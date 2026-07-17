/*
 * Varredura do repositório para os gates de `pnpm check`.
 *
 * Os gates que leem código-fonte (check:pureza, check:integrity) compartilham
 * a mesma pergunta: "quais arquivos deste repositório são fonte?". A resposta
 * mora aqui — inclusive a lista de diretórios ignorados, que antes existia em
 * duas cópias divergentes.
 */
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

/*
 * Saída de build e caches: contêm código de terceiros, bundles minificados e
 * artefatos gerados que disparam as regras dos gates sem que haja nada a
 * corrigir no código-fonte. Um diretório novo de build entra aqui, uma vez.
 */
export const IGNORED_DIRS = new Set([
	".git",
	".next",
	".pnpm-store",
	".source",
	".tmp",
	".turbo",
	"coverage",
	"dist",
	"node_modules",
	"storybook-static",
]);

/** Caminho relativo à raiz, sempre com "/" — o formato que as regras usam. */
export function toRepositoryPath(rootDir, filePath) {
	return relative(rootDir, filePath).split(sep).join("/");
}

/** Extensão com ponto (".tsx"), ou "" quando o arquivo não tem uma. */
export function extensionOf(fileName) {
	const index = fileName.lastIndexOf(".");
	return index === -1 ? "" : fileName.slice(index);
}

/**
 * Percorre o repositório e produz { full, path, name } de cada arquivo que
 * `includeFile` aceitar. `includeFile({ path, name })` recebe o caminho
 * relativo normalizado e o nome do arquivo.
 */
export function* walkFiles(rootDir, { includeFile }) {
	const stack = [rootDir];
	while (stack.length > 0) {
		const dir = stack.pop();
		for (const name of readdirSync(dir)) {
			if (IGNORED_DIRS.has(name)) continue;
			const full = join(dir, name);
			if (statSync(full).isDirectory()) {
				stack.push(full);
				continue;
			}
			const path = toRepositoryPath(rootDir, full);
			if (includeFile({ path, name })) yield { full, path, name };
		}
	}
}
