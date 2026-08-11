/*
 * Gera content/docs/{ui,blocks}/*.mdx a partir das fontes dos pacotes.
 *
 * Fontes de verdade, por seção da página:
 *   - props    -> react-docgen-typescript sobre <name>.tsx (resolve tipos de
 *                 verdade: variantes cva e heranças; props vindas de
 *                 node_modules são filtradas para não poluir a tabela)
 *   - exemplos -> AST TypeScript de <name>.stories.tsx (o mesmo arquivo que o
 *                 Storybook consome, então docs e Storybook não divergem)
 *   - preview  -> as stories são renderizadas de verdade via registry.generated.ts
 *
 * Reescreve os .mdx por inteiro a cada execução: edite este arquivo, não o MDX.
 *
 * Este arquivo é o adapter de filesystem: lê fontes, roda o docgen e escreve.
 * A extração por AST, o snippet copiável e a renderização das páginas vivem em
 * `lib/docs.mjs`, puros e testáveis sem tocar em `apps/docs`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import docgen from "react-docgen-typescript";
import ts from "typescript";

import {
	extractExportNames,
	extractStories,
	pascalCase,
	renderComponentPage,
	renderMeta,
	renderRegistry,
	storyCodeSnippet,
	toPropRows,
} from "./lib/docs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const docsAppDir = path.join(root, "apps", "docs");
const docsContentDir = path.join(docsAppDir, "content", "docs");

/*
 * Categorias por componente. Definem o agrupamento da sidebar (via meta.json) e
 * o texto de abertura da página. Um componente novo só aparece nos docs depois
 * de listado aqui — o gerador não varre o filesystem de propósito, para que
 * incluir um componente nos docs seja uma decisão explícita.
 */
const uiCategories = {
	accordion: "Exibição de dados",
	alert: "Feedback",
	"alert-dialog": "Feedback",
	avatar: "Exibição de dados",
	badge: "Exibição de dados",
	button: "Ações",
	card: "Exibição de dados",
	checkbox: "Formulários",
	combobox: "Formulários",
	dialog: "Feedback",
	"dropdown-menu": "Navegação",
	input: "Formulários",
	label: "Formulários",
	"multi-select": "Formulários",
	popover: "Exibição de dados",
	progress: "Feedback",
	"radio-group": "Formulários",
	"scroll-area": "Layout",
	select: "Formulários",
	separator: "Layout",
	sheet: "Feedback",
	skeleton: "Feedback",
	spinner: "Feedback",
	switch: "Formulários",
	table: "Exibição de dados",
	tabs: "Navegação",
	textarea: "Formulários",
	tooltip: "Feedback",
};

const blocksCategories = {
	"activity-timeline": "Exibição de dados",
	"app-shell": "Layout",
	"attachment-list": "Exibição de dados",
	breadcrumbs: "Navegação",
	"code-badge": "Utilitários",
	"comparison-diff-view": "Exibição de dados",
	"confirm-dialog": "Feedback",
	"content-card": "Exibição de dados",
	"crud-modal-frame": "Utilitários",
	"crud-modal-header": "Utilitários",
	"dashboard-page-layout": "Layout",
	"data-table": "Tabelas",
	"detail-page-layout": "Layout",
	"dynamic-field-list-rows": "Formulários",
	"empty-state": "Feedback",
	"entity-assignment-panel": "Formulários",
	"error-state": "Feedback",
	"field-group": "Formulários",
	"file-dropzone": "Formulários",
	"file-list-item": "Formulários",
	"filter-pill": "Tabelas",
	"filterable-tree-list": "Navegação",
	"filters-card": "Tabelas",
	"form-actions": "Formulários",
	"form-field": "Formulários",
	"form-message": "Formulários",
	"form-page-layout": "Layout",
	"form-section": "Formulários",
	"gantt-chart": "Exibição de dados",
	"impact-analysis-dialog": "Feedback",
	"impersonation-banner": "Feedback",
	"inline-confirm-action": "Ações",
	"json-diff-dialog": "Feedback",
	"kanban-board": "Exibição de dados",
	"kiosk-mode-toggle": "Ações",
	"launcher-card": "Exibição de dados",
	"list-page-layout": "Layout",
	"loading-overlay": "Feedback",
	"metric-gauge-card": "Exibição de dados",
	"missing-prerequisites-state": "Feedback",
	"module-icon": "Utilitários",
	"month-calendar": "Exibição de dados",
	"nested-toggle-accordion-list": "Formulários",
	"onboarding-dialog": "Feedback",
	// `navigation` fica de fora de propósito: é um módulo de tipos e utilitários
	// (NavigationItem, RenderLink, filterNavigation), não um componente — a
	// página gerada só prometia um preview e uma API que não existem.
	"page-examples": "Layout",
	"page-header": "Layout",
	"page-layout": "Layout",
	pagination: "Tabelas",
	"permission-gate": "Utilitários",
	"presence-avatar-stack": "Exibição de dados",
	"search-bar": "Tabelas",
	"section-header": "Layout",
	sidebar: "Navegação",
	"status-cards": "Exibição de dados",
	"status-dot": "Feedback",
	"table-skeleton-rows": "Tabelas",
	"table-toggle": "Tabelas",
	"view-edit-field": "Formulários",
};

/*
 * Entradas que não são um componente instalável, e sim uma galeria de stories
 * compondo vários blocks numa página inteira. Rendem só os previews: não têm
 * export próprio, então "pnpm add" e API Reference seriam mentira.
 */
const galleryOnly = new Set(["page-examples"]);

// Ordem das categorias na sidebar: do mais básico ao mais composto.
const categoryOrder = [
	"Ações",
	"Formulários",
	"Exibição de dados",
	"Navegação",
	"Feedback",
	"Layout",
	"Tabelas",
	"Utilitários",
];

const packageLabels = { ui: "Base UI", blocks: "Blocks" };

const docgenParser = docgen.withCompilerOptions(
	{ jsx: ts.JsxEmit.React, esModuleInterop: true, skipLibCheck: true },
	{
		savePropValueAsString: true,
		shouldExtractLiteralValuesFromEnum: true,
		shouldRemoveUndefinedFromOptional: true,
		propFilter: (prop) => {
			if (!prop.declarations || prop.declarations.length === 0) return true;
			// Props herdadas de Base UI / React ficam de fora: são dezenas de
			// atributos HTML que afogam as props que o componente realmente define.
			return prop.declarations.some((d) => !d.fileName.includes("node_modules"));
		},
	},
);

/** Lê o módulo fonte do componente: `<name>.tsx` ou, no fallback, `index.tsx`. */
async function readSource(pkg, name) {
	const srcDir = path.join(root, "packages", pkg, "src", name);
	for (const file of [`${name}.tsx`, "index.tsx"]) {
		try {
			return {
				content: await readFile(path.join(srcDir, file), "utf8"),
				file: path.join(srcDir, file),
			};
		} catch {}
	}
	return { content: "", file: null };
}

async function readStorySource(pkg, name) {
	const storyPath = path.join(root, "packages", pkg, "src", name, `${name}.stories.tsx`);
	try {
		return await readFile(storyPath, "utf8");
	} catch {
		return "";
	}
}

/** O docgen precisa do arquivo no disco (monta um programa TypeScript). */
function readProps(sourceFile) {
	if (!sourceFile) return [];
	try {
		return toPropRows(docgenParser.parse(sourceFile));
	} catch {
		return [];
	}
}

async function run() {
	const registryEntries = [];

	for (const [pkg, categories] of [
		["ui", uiCategories],
		["blocks", blocksCategories],
	]) {
		const dir = path.join(docsContentDir, pkg);
		await mkdir(dir, { recursive: true });

		const names = Object.keys(categories);

		await writeFile(
			path.join(dir, "meta.json"),
			`${renderMeta(packageLabels[pkg], names, categories, categoryOrder)}\n`,
		);

		for (const name of names) {
			const { content: sourceContent, file: sourceFile } = await readSource(pkg, name);
			const storySource = await readStorySource(pkg, name);

			const mdx = renderComponentPage({
				name,
				pkg,
				category: categories[name],
				sourceContent,
				storySource,
				props: readProps(sourceFile),
				packageLabel: packageLabels[pkg],
				isGallery: galleryOnly.has(name),
			});
			await writeFile(path.join(dir, `${name}.mdx`), `${mdx}\n`);

			const stories = extractStories(storySource);
			if (stories.length > 0) {
				const compName = pascalCase(name);
				const exportNames = extractExportNames(sourceContent, compName);
				registryEntries.push({
					pkg,
					name,
					stories: stories.map((story) => ({
						name: story.name,
						code: storyCodeSnippet(story, compName, storySource, pkg, name, exportNames),
					})),
				});
			}
			console.log(`  ${pkg}/${name} — ${stories.length} story(ies)`);
		}
	}

	await writeFile(
		path.join(docsAppDir, "src", "components", "registry.generated.ts"),
		renderRegistry(registryEntries),
	);

	console.log(`\nDocumentação gerada: ${registryEntries.length} componentes no registry.`);
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
