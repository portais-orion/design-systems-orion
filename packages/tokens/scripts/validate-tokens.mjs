import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = resolve(pkgDir, "src");
const base = readFileSync(resolve(srcDir, "base.css"), "utf8");

const brands = ["supertrans", "aurora"];
const requiredIdentityTokens = [
	"primary",
	"primary-foreground",
	"primary-hover",
	"ring",
	"brand-primary",
	"brand-hover",
	"brand-accent",
	"sidebar",
	"sidebar-foreground",
	"sidebar-primary",
	"sidebar-primary-foreground",
	"sidebar-accent",
	"sidebar-accent-foreground",
	"sidebar-border",
	"sidebar-ring",
];

const failures = [];

for (const token of requiredIdentityTokens) {
	if (!base.includes(`--${token}:`)) failures.push(`base.css sem default neutro para --${token}`);
	if (!base.includes(`--color-${token}: var(--${token})`)) {
		failures.push(`base.css sem mapeamento @theme para --color-${token}`);
	}
}

for (const brand of brands) {
	const theme = readFileSync(resolve(srcDir, "themes", `${brand}.css`), "utf8");
	for (const selector of [
		":root:not([data-brand])",
		`:root[data-brand="${brand}"]`,
		`[data-brand="${brand}"]`,
	]) {
		if (!theme.includes(selector))
			failures.push(`${brand}.css sem seletor obrigatório ${selector}`);
	}
	for (const token of requiredIdentityTokens) {
		if (!theme.includes(`--${token}:`)) failures.push(`${brand}.css sem --${token}`);
	}
	if (/:root,\s*\[data-brand/.test(theme)) {
		failures.push(`${brand}.css usa seletor antigo :root, [data-brand]`);
	}
}

if (failures.length > 0) {
	console.error(`validate-tokens FALHOU — ${failures.length} problema(s).`);
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log("validate-tokens OK — temas completos e seletores corretos.");
