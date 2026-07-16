#!/usr/bin/env node
/**
 * check:pureza — verificações automatizadas de vazamento nos packages compartilhados.
 * Cross-platform (Node), sem dependências externas.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const CODE_EXT = new Set([".ts", ".tsx", ".css", ".json"]);
// .next/.source são saída de build: contêm CSS de terceiros e código gerado que
// dispara as regras de pureza sem que haja nada a corrigir no código-fonte.
const SKIP_DIRS = new Set([
	"node_modules",
	".turbo",
	".git",
	".next",
	".source",
	"storybook-static",
	"dist",
]);

function walk(dir, files = []) {
	for (const name of readdirSync(dir)) {
		if (SKIP_DIRS.has(name)) continue;
		const full = join(dir, name);
		if (statSync(full).isDirectory()) walk(full, files);
		else if (CODE_EXT.has(name.slice(name.lastIndexOf(".")))) files.push(full);
	}
	return files;
}

const norm = (p) => relative(ROOT, p).split(sep).join("/");

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
		/["'][^"']*(portal-supertrans|Portal-Aurora|aurora-eadi)[^"']*["']/,
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

const files = walk(ROOT).map((f) => ({ full: f, path: norm(f) }));
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
