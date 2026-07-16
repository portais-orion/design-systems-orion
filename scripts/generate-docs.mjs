import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const docsContentDir = path.join(root, "apps", "docs", "content", "docs");

const uiCategories = {
	accordion: "Data Display",
	alert: "Feedback",
	"alert-dialog": "Feedback",
	avatar: "Data Display",
	badge: "Data Display",
	button: "Layout",
	card: "Data Display",
	checkbox: "Forms",
	combobox: "Forms",
	dialog: "Feedback",
	"dropdown-menu": "Navigation",
	input: "Forms",
	label: "Forms",
	"multi-select": "Forms",
	popover: "Data Display",
	progress: "Feedback",
	"radio-group": "Forms",
	"scroll-area": "Layout",
	select: "Forms",
	separator: "Layout",
	sheet: "Feedback",
	skeleton: "Feedback",
	spinner: "Feedback",
	switch: "Forms",
	table: "Data Display",
	tabs: "Navigation",
	textarea: "Forms",
	tooltip: "Feedback"
};

const blocksCategories = {
	"app-shell": "Layout",
	breadcrumbs: "Navigation",
	"code-badge": "Utilities",
	"confirm-dialog": "Feedback",
	"content-card": "Data Display",
	"crud-modal-header": "Utilities",
	"dashboard-page-layout": "Layout",
	"data-table": "Tabelas",
	"detail-page-layout": "Layout",
	"empty-state": "Feedback",
	"error-state": "Feedback",
	"field-group": "Forms",
	"filter-pill": "Tabelas",
	"filters-card": "Tabelas",
	"form-actions": "Forms",
	"form-field": "Forms",
	"form-message": "Forms",
	"form-page-layout": "Layout",
	"form-section": "Forms",
	"launcher-card": "Data Display",
	"list-page-layout": "Layout",
	"loading-overlay": "Feedback",
	navigation: "Navigation",
	"page-examples": "Layout",
	"page-header": "Layout",
	"page-layout": "Layout",
	pagination: "Tabelas",
	"search-bar": "Tabelas",
	"section-header": "Layout",
	sidebar: "Navigation",
	"status-cards": "Data Display",
	"status-dot": "Feedback",
	"table-skeleton-rows": "Tabelas"
};

function capitalize(str) {
	return str.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

async function extractProps(sourceContent) {
	const propsMatch = sourceContent.match(/interface\s+\w+Props[^\{]*\{([\s\S]*?)\}/);
	if (!propsMatch) return [];
	
	const propsBlock = propsMatch[1];
	const props = [];
	const propLines = propsBlock.split("\n");
	
	for (let line of propLines) {
		line = line.trim();
		if (line.startsWith("/**") || line.startsWith("*") || line.startsWith("//") || line === "") continue;
		
		const propMatch = line.match(/^([a-zA-Z0-9_]+)(\??)\s*:\s*(.+);/);
		if (propMatch) {
			props.push({
				name: propMatch[1],
				required: propMatch[2] !== "?",
				type: propMatch[3]
			});
		}
	}
	return props;
}

async function extractExamples(storyContent, componentName) {
	const matches = [...storyContent.matchAll(/export const ([a-zA-Z0-9_]+)[^=]*=\s*{([^}]+)}/g)];
	if (matches.length > 0) {
		return matches.map(m => m[1]);
	}
	return ["Default"];
}

async function generateMdx(name, pkg, category) {
	const compName = capitalize(name);
	const srcDir = path.join(root, "packages", pkg, "src", name);
	
	let sourceContent = "";
	let storyContent = "";
	
	try {
		sourceContent = await readFile(path.join(srcDir, `${name}.tsx`), "utf8");
	} catch (e) {
		try {
			sourceContent = await readFile(path.join(srcDir, "index.tsx"), "utf8");
		} catch (e2) {}
	}
	
	try {
		storyContent = await readFile(path.join(srcDir, `${name}.stories.tsx`), "utf8");
	} catch (e) {}

	const props = await extractProps(sourceContent);
	const examples = await extractExamples(storyContent, compName);

	let mdx = [
		"---",
		`title: ${compName}`,
		`description: Componente da biblioteca ${pkg === "ui" ? "Base UI" : "Blocks"}.`,
		"---",
		"",
		`# ${compName}`,
		"",
		`Um componente da biblioteca \`@portais-orion/${pkg}\` agrupado em **${category}**.`,
		"",
		"## Instalação",
		"",
		"```bash",
		"# Como nosso ecossistema é um monorepo e importamos o package completo:",
		`pnpm add @portais-orion/${pkg}`,
		"```",
		"",
		"## Uso",
		"",
		"<Preview>",
		"  <div className=\"text-muted-foreground text-sm\">",
		"    Substitua este texto pela declaração real do componente com suas props obrigatórias.",
		"  </div>",
		"</Preview>",
		"",
		"```tsx",
		`import { ${compName} } from "@portais-orion/${pkg}";`,
		"",
		"export default function Example() {",
		"  return (",
		`    <${compName} {/* props */} />`,
		"  )",
		"}",
		"```",
		""
	].join("\n");

	// Add import at the top of MDX (after frontmatter)
	mdx = mdx.replace("---\n\n", `---\n\nimport { ${compName} } from "@portais-orion/${pkg}";\n\n`);


	if (props.length > 0) {
		mdx += `\n## API Reference\n\n| Prop | Type | Required |\n| --- | --- | --- |\n`;
		for (const p of props) {
			const typeClean = p.type.replace(/\|/g, "\\|").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			mdx += `| \`${p.name}\` | \`${typeClean}\` | ${p.required ? "✅" : "❌"} |\n`;
		}
	}

	if (examples.length > 0) {
		mdx += `\n## Exemplos\n`;
		for (const ex of examples) {
			mdx += `\n### ${ex}\n`;
			const argMatch = storyContent.match(new RegExp(`export const ${ex}[^=]*=\\s*{[^}]*args:\\s*({[^}]+})`));
			if (argMatch) {
				mdx += `\`\`\`tsx\n<${compName} {...${argMatch[1].replace(/\n/g, " ")}} />\n\`\`\`\n`;
			} else {
				mdx += `Consulte o Storybook para a variação \`${ex}\`.\n`;
			}
		}
	}

	return mdx;
}

async function run() {
	await mkdir(path.join(docsContentDir, "ui"), { recursive: true });
	await mkdir(path.join(docsContentDir, "blocks"), { recursive: true });

	await writeFile(path.join(docsContentDir, "ui", "meta.json"), JSON.stringify({ title: "Base UI" }, null, 2));
	await writeFile(path.join(docsContentDir, "blocks", "meta.json"), JSON.stringify({ title: "Blocks" }, null, 2));

	for (const [name, category] of Object.entries(uiCategories)) {
		console.log(`Gerando UI: ${name}`);
		const mdx = await generateMdx(name, "ui", category);
		await writeFile(path.join(docsContentDir, "ui", `${name}.mdx`), mdx);
	}

	for (const [name, category] of Object.entries(blocksCategories)) {
		console.log(`Gerando Block: ${name}`);
		const mdx = await generateMdx(name, "blocks", category);
		await writeFile(path.join(docsContentDir, "blocks", `${name}.mdx`), mdx);
	}
	
	console.log("Documentação gerada com sucesso!");
}

run().catch(console.error);
