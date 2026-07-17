#!/usr/bin/env node
/**
 * check:pureza — verificações automatizadas de vazamento nos packages compartilhados.
 * Cross-platform (Node), sem dependências externas.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { brandRepositoryNames } from "./lib/brand-catalog.mjs";
import { extensionOf, walkFiles } from "./lib/repo-scan.mjs";

const ROOT = process.cwd();
const CODE_EXT = new Set([".ts", ".tsx", ".css", ".json"]);

const catalog = JSON.parse(readFileSync(join(ROOT, "packages/tokens/brands.json"), "utf8"));
// Os nomes dos repositórios de produto saem do catálogo de marcas: marca nova
// entra em brands.json e o gate passa a vigiá-la sem editar este arquivo.
const portalRepositories = brandRepositoryNames(catalog);
const portalImport = new RegExp(`["'][^"']*(${portalRepositories.join("|")})[^"']*["']`);

// Comentários são ignorados nas regras de conteúdo — comentários de
// proveniência ("Origem: portal-supertrans ...") são documentação desejada.
const isComment = (line) => /^\s*(\*|\/\/|\/\*)/.test(line);

/** [nome, regex, arquivos-alvo (fn), exceção (fn no path normalizado)] */
const RULES = [
	[
		"hex color fora de tokens/themes",
		/#[0-9a-fA-F]{3,8}\b/,
		(p) => /^(packages|apps)\/.*\.(tsx|ts|css)$/.test(p),
		(p) => p.startsWith("packages/tokens/src/themes/"),
	],
	["dependência/import @radix-ui", /@radix-ui/, (p) => /^(packages|apps)\//.test(p), () => false],
	[
		"classe de marca (orange-*, blue-*, primary-600, brand-*)",
		/\b(orange-\d|blue-\d|primary-600|bg-brand-primary|text-brand-primary)\b/,
		(p) => /^packages\/(ui|blocks)\/src\/.*\.(tsx|ts)$/.test(p),
		() => false,
	],
	[
		"import dos portais",
		portalImport,
		(p) => /^(packages|apps)\/.*\.(tsx|ts)$/.test(p),
		() => false,
	],
	[
		"import de next/* em package compartilhado",
		/from\s+["']next(\/|["'])/,
		(p) => /^packages\/(ui|blocks|tokens)\/src\//.test(p),
		() => false,
	],
	[
		"data-fetching em package compartilhado (axios/tanstack/fetch)",
		/(from\s+["']axios["']|@tanstack\/react-query|\bfetch\s*\()/,
		(p) => /^packages\/(ui|blocks|tokens)\/src\//.test(p),
		() => false,
	],
];

const files = [...walkFiles(ROOT, { includeFile: ({ name }) => CODE_EXT.has(extensionOf(name)) })];
let violations = 0;

for (const [name, regex, applies, isException] of RULES) {
	for (const { full, path } of files) {
		if (!applies(path) || isException(path)) continue;
		const lines = readFileSync(full, "utf8").split("\n");
		lines.forEach((line, i) => {
			if (!isComment(line) && regex.test(line)) {
				violations++;
				console.error(`✗ [${name}] ${path}:${i + 1}\n    ${line.trim().slice(0, 120)}`);
			}
		});
	}
}

if (violations > 0) {
	console.error(`\ncheck:pureza FALHOU — ${violations} violação(ões).`);
	process.exit(1);
}
console.log("check:pureza OK — nenhum vazamento encontrado.");
