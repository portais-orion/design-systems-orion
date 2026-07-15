import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const brandsFile = resolve(root, "apps/storybook/src/brands.ts");
const previewFile = resolve(root, "apps/storybook/.storybook/preview.tsx");
const comparisonStoryFile = resolve(root, "apps/storybook/stories/marcas.stories.tsx");
const themesDir = resolve(root, "packages/tokens/src/themes");

const brandsSource = readFileSync(brandsFile, "utf8");
const preview = readFileSync(previewFile, "utf8");
const comparisonStory = readFileSync(comparisonStoryFile, "utf8");

const match = brandsSource.match(/BRANDS\s*=\s*\[([^\]]+)\]\s*as const/s);
if (!match) {
	console.error(
		"check:storybook-brands FALHOU — BRANDS não encontrado em apps/storybook/src/brands.ts.",
	);
	process.exit(1);
}

const storybookBrands = [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((item) => item[1]);
const themeBrands = readdirSync(themesDir)
	.filter((name) => name.endsWith(".css"))
	.map((name) => name.replace(/\.css$/, ""))
	.sort();

const failures = [];
const uniqueStorybookBrands = [...new Set(storybookBrands)].sort();

if (storybookBrands.length !== uniqueStorybookBrands.length)
	failures.push("BRANDS contém marca duplicada");
if (JSON.stringify(uniqueStorybookBrands) !== JSON.stringify(themeBrands)) {
	failures.push(
		`BRANDS (${uniqueStorybookBrands.join(", ")}) não bate com themes/*.css (${themeBrands.join(", ")})`,
	);
}

for (const brand of uniqueStorybookBrands) {
	if (!brandsSource.includes(`${brand}:`)) failures.push(`BRAND_LABELS sem label para ${brand}`);
}

if (!preview.includes("BRANDS.map"))
	failures.push("preview.tsx não usa BRANDS para popular a toolbar");
if (!preview.includes("BRAND_LABELS")) failures.push("preview.tsx não usa BRAND_LABELS na toolbar");
if (!comparisonStory.includes("BRANDS.map")) {
	failures.push("marcas.stories.tsx não renderiza comparativo a partir de BRANDS");
}

if (failures.length > 0) {
	console.error(`check:storybook-brands FALHOU — ${failures.length} problema(s).`);
	for (const failure of failures) console.error(`- ${failure}`);
	process.exit(1);
}

console.log("check:storybook-brands OK — marcas do Storybook sincronizadas com themes/*.css.");
