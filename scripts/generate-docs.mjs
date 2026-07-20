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
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import docgen from "react-docgen-typescript";
import ts from "typescript";

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

function pascalCase(str) {
	return str
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
}

function escapeCell(value) {
	return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

/*
 * Extrai as stories exportadas via AST. A versão anterior usava regex com
 * `{[^}]+}`, que parava na primeira chave e por isso ignorava toda story com
 * objeto aninhado ou render() multi-linha — 51 das 61 páginas caíam no
 * fallback "Consulte o Storybook".
 */
function extractStories(storySource) {
	if (!storySource) return [];

	const sourceFile = ts.createSourceFile(
		"stories.tsx",
		storySource,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TSX,
	);

	const stories = [];

	for (const statement of sourceFile.statements) {
		if (!ts.isVariableStatement(statement)) continue;
		const isExported = statement.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
		if (!isExported) continue;

		for (const decl of statement.declarationList.declarations) {
			if (!ts.isIdentifier(decl.name)) continue;
			if (!decl.initializer || !ts.isObjectLiteralExpression(decl.initializer)) continue;

			const name = decl.name.text;
			if (name === "meta") continue;

			let args = null;
			let render = null;

			for (const prop of decl.initializer.properties) {
				if (!prop.name || !ts.isIdentifier(prop.name)) continue;
				if (prop.name.text === "args" && ts.isPropertyAssignment(prop)) {
					args = prop.initializer.getText(sourceFile);
				}
				if (prop.name.text === "render") {
					render = prop.getText(sourceFile);
				}
			}

			stories.push({ name, args, render });
		}
	}

	return stories;
}

/*
 * Monta o trecho de código exibido na aba "Code" — um arquivo standalone e
 * copiável (imports reais + função exportada), no mesmo espírito do shadcn/ui
 * ("CalendarDemo" com `import { Calendar } from "@/components/ui/calendar"`
 * no topo, não só o JSX solto). Passos:
 *
 *  1. Resolve o corpo real da story (`findRenderInfo`) — inclusive quando o
 *     `render` só referencia um helper local (`() => <Demo />`): nesse caso
 *     puxa a definição inteira do helper, não a chamada vazia.
 *  2. Envolve numa função exportada quando o corpo ainda não é uma (stories
 *     com `render: () => (<jsx/>)` ou com `args`).
 *  3. Inlina outros helpers locais referenciados como tag JSX dentro do
 *     corpo resolvido — isso é o que faz um exemplo de página (page-examples,
 *     preview `block`) sair com a composição inteira, não só o layout raiz.
 *  4. Monta os imports de verdade: resolve imports relativos (`../data-table`,
 *     `./confirm-dialog`) para o subpath público (`@portais-orion/blocks/...`)
 *     e reaproveita como estão os imports externos (`@portais-orion/ui`,
 *     `lucide-react`, `react`) que o corpo final realmente usa.
 *  5. `fn()` (placeholder de mock do Storybook) vira `() => {}`: código de
 *     exemplo não deveria pedir `storybook/test` para colar num projeto real.
 *  6. Prefixa `"use client"` quando o corpo usa hooks.
 */
function storyCodeSnippet(story, compName, storySource, pkg, name, exportNames) {
	const sourceFile = ts.createSourceFile(
		"stories.tsx",
		storySource,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TSX,
	);

	const localHelpers = collectLocalHelpers(sourceFile);
	const topImports = collectTopLevelImports(sourceFile);

	const demoName = `${compName}${story.name === "Default" ? "Demo" : story.name}`;

	let fnText = null;

	if (story.render) {
		const info = findRenderInfo(sourceFile, story.name);
		if (info?.kind === "ref" && localHelpers.has(info.refName)) {
			fnText = ensureExported(localHelpers.get(info.refName));
		} else if (info?.kind === "named-function") {
			fnText = ensureExported(info.text);
		} else if (info?.kind === "block") {
			fnText = `export function ${demoName}() ${info.text}`;
		} else if (info?.kind === "jsx") {
			fnText = `export function ${demoName}() {\n\treturn (\n${indentBlock(info.text, 2)}\n\t);\n}`;
		}
	}

	if (!fnText && story.args) {
		const jsx = parseArgsToJsx(story.args, compName);
		if (jsx) {
			fnText = `export function ${demoName}() {\n\treturn (\n${indentBlock(jsx, 2)}\n\t);\n}`;
		}
	}

	if (!fnText) {
		fnText = `export function ${demoName}() {\n\treturn <${compName} />;\n}`;
	}

	// Placeholder de mock do Storybook — não faz sentido em código de exemplo.
	fnText = fnText.replace(/\bfn\(\)/g, "() => {}");

	fnText = inlineReferencedHelpers(fnText, localHelpers, new Set([demoName]));

	const importLines = buildImportLines(fnText, topImports, pkg, name, compName, exportNames);
	// `(<T>)?` cobre hooks com generic explícito (`useState<Date | null>(...)`).
	const usesHooks = /\buse[A-Z]\w*\b\s*(?:<[^>]*>)?\s*\(/.test(fnText);
	const header = usesHooks ? '"use client";\n\n' : "";
	const importBlock = importLines.length ? `${importLines.join("\n")}\n\n` : "";

	return `${header}${importBlock}${fnText}`;
}

/** Indenta cada linha não vazia de `text` com `tabs` tabs — para embutir JSX dedentado dentro do wrapper `export function`. */
function indentBlock(text, tabs) {
	const pad = "\t".repeat(tabs);
	return text
		.split("\n")
		.map((line) => (line.trim() ? pad + line : line))
		.join("\n");
}

/** Prefixa `export` se o texto (função ou const) ainda não começar com ele. */
function ensureExported(text) {
	const trimmed = text.trim();
	if (/^export\b/.test(trimmed)) return trimmed;
	if (/^(function|const|async function)\b/.test(trimmed)) return `export ${trimmed}`;
	return trimmed;
}

/*
 * Helpers locais (não exportados) declarados no arquivo de stories: os
 * "Demo"/"Lista"/"Formulario" que o `render` referencia ou que compõem o
 * exemplo. Cobre `function Nome(...) {...}` e `const Nome = (...) => {...}`.
 */
function collectLocalHelpers(sourceFile) {
	const helpers = new Map();

	for (const stmt of sourceFile.statements) {
		if (ts.isFunctionDeclaration(stmt) && stmt.name && !isExportedStmt(stmt)) {
			helpers.set(stmt.name.text, stmt.getText(sourceFile));
			continue;
		}
		if (ts.isVariableStatement(stmt) && !isExportedStmt(stmt)) {
			for (const decl of stmt.declarationList.declarations) {
				if (
					ts.isIdentifier(decl.name) &&
					decl.initializer &&
					(ts.isArrowFunction(decl.initializer) || ts.isFunctionExpression(decl.initializer))
				) {
					helpers.set(decl.name.text, stmt.getText(sourceFile));
				}
			}
		}
	}

	return helpers;
}

function isExportedStmt(node) {
	return node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

/*
 * Imports de topo do arquivo de stories, para decidir quais entram no
 * snippet final. `names` são os identificadores que, se aparecerem no corpo
 * resolvido, fazem este import ser incluído (default/namespace/named, com
 * alias `as` respeitado).
 */
function collectTopLevelImports(sourceFile) {
	const imports = [];

	for (const stmt of sourceFile.statements) {
		if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier)) continue;
		const specifier = stmt.moduleSpecifier.text;
		const names = [];
		const clause = stmt.importClause;
		if (clause?.name) names.push(clause.name.text);
		if (clause?.namedBindings) {
			if (ts.isNamespaceImport(clause.namedBindings)) {
				names.push(clause.namedBindings.name.text);
			} else if (ts.isNamedImports(clause.namedBindings)) {
				for (const el of clause.namedBindings.elements) names.push(el.name.text);
			}
		}
		imports.push({
			specifier,
			names,
			isRelative: specifier.startsWith("."),
			text: stmt.getText(sourceFile),
		});
	}

	return imports;
}

/*
 * Localiza a propriedade `render` da story e classifica seu formato:
 *  - "ref"            -> `() => <Nome />`, referência a um helper local
 *  - "named-function" -> `render: function Nome() {...}` (nome próprio)
 *  - "block"           -> `render: () => { ...; return <jsx/>; }`
 *  - "jsx"             -> `render: () => (<jsx/>)` ou `() => <jsx/>`
 */
function findRenderInfo(sourceFile, storyName) {
	let result = null;

	const visit = (node) => {
		if (result) return;
		if (
			ts.isVariableDeclaration(node) &&
			ts.isIdentifier(node.name) &&
			node.name.text === storyName &&
			node.initializer &&
			ts.isObjectLiteralExpression(node.initializer)
		) {
			for (const prop of node.initializer.properties) {
				if (
					!ts.isPropertyAssignment(prop) ||
					!prop.name ||
					!ts.isIdentifier(prop.name) ||
					prop.name.text !== "render"
				) {
					continue;
				}
				const initializer = prop.initializer;
				if (!ts.isArrowFunction(initializer) && !ts.isFunctionExpression(initializer)) continue;

				if (ts.isFunctionExpression(initializer) && initializer.name) {
					result = { kind: "named-function", text: initializer.getText(sourceFile) };
					continue;
				}

				const body = initializer.body;

				if (ts.isBlock(body)) {
					result = { kind: "block", text: dedent(body.getText(sourceFile)) };
					continue;
				}

				// Corpo de expressão direta: pode ser `<Nome />` (referência) ou JSX de verdade.
				let expr = body;
				if (ts.isParenthesizedExpression(expr)) expr = expr.expression;

				if (
					(ts.isJsxSelfClosingElement(expr) &&
						ts.isIdentifier(expr.tagName) &&
						expr.attributes.properties.length === 0) ||
					(ts.isJsxElement(expr) &&
						ts.isIdentifier(expr.openingElement.tagName) &&
						expr.openingElement.attributes.properties.length === 0 &&
						expr.children.length === 0)
				) {
					const tagName = ts.isJsxSelfClosingElement(expr)
						? expr.tagName.text
						: expr.openingElement.tagName.text;
					result = { kind: "ref", refName: tagName };
					continue;
				}

				result = { kind: "jsx", text: dedent(expr.getText(sourceFile)) };
			}
		}
		ts.forEachChild(node, visit);
	};

	visit(sourceFile);
	return result;
}

/*
 * Um exemplo de página (`page-examples`) monta o layout raiz a partir de
 * outros helpers locais no mesmo arquivo (`Cabecalho`, `Tabela`...). Sem
 * inliná-los, o snippet mostraria `<Cabecalho />` sem a definição — inútil
 * para copiar. Uma passada extra cobre helper-que-usa-helper.
 */
function inlineReferencedHelpers(code, localHelpers, alreadyIncluded) {
	let result = code;
	for (let pass = 0; pass < 2; pass++) {
		let changed = false;
		for (const [helperName, helperText] of localHelpers) {
			if (alreadyIncluded.has(helperName)) continue;
			const usedAsJsxTag = new RegExp(`<${helperName}[\\s/>]`).test(result);
			if (!usedAsJsxTag) continue;
			result = `${helperText}\n\n${result}`;
			alreadyIncluded.add(helperName);
			changed = true;
		}
		if (!changed) break;
	}
	return result;
}

/*
 * Resolve o subpath público de um import relativo do arquivo de stories:
 * `../data-table` ou `./confirm-dialog` -> `data-table`/`confirm-dialog`.
 * A convenção do repo é uma pasta por componente com o mesmo nome do
 * arquivo, então o basename do especificador já é o slug do subpath.
 */
function relativeSpecifierToSubpath(specifier) {
	return path.basename(specifier).replace(/\.tsx?$/, "");
}

/*
 * Monta as linhas de import do snippet final: o componente da própria
 * página primeiro (via subpath público, nunca o caminho relativo do
 * monorepo), depois qualquer outro import do arquivo de stories cujo nome
 * realmente aparece no código resolvido (ícones, outros blocks/ui, react).
 * `storybook/test` e `@storybook/react` nunca entram — são só do Storybook.
 */
function buildImportLines(code, topImports, pkg, name, compName, exportNames) {
	const lines = [];
	const seenSpecifiers = new Set();
	const usesWholeWord = (word) => new RegExp(`\\b${word}\\b`).test(code);

	const ownNames = (exportNames?.length ? exportNames : [compName]).filter(usesWholeWord);
	if (ownNames.length > 0) {
		const specifier = `@portais-orion/${pkg}/${name}`;
		lines.push(formatImport(ownNames, specifier));
		seenSpecifiers.add(specifier);
	}

	// Agrupa nomes usados por subpath resolvido, para imports relativos que
	// apontem para o mesmo componente (ex.: dois named imports de "../foo").
	const relativeGroups = new Map();

	for (const imp of topImports) {
		if (imp.specifier === "storybook/test" || imp.specifier === "@storybook/react") continue;

		const used = imp.names.filter(usesWholeWord);
		if (used.length === 0) continue;

		if (!imp.isRelative) {
			if (seenSpecifiers.has(imp.specifier)) continue;
			lines.push(imp.text);
			seenSpecifiers.add(imp.specifier);
			continue;
		}

		const subpath = relativeSpecifierToSubpath(imp.specifier);
		if (subpath === name) continue; // já coberto pelo import do próprio componente acima
		const specifier = `@portais-orion/${pkg}/${subpath}`;
		const existing = relativeGroups.get(specifier) ?? new Set();
		for (const n of used) existing.add(n);
		relativeGroups.set(specifier, existing);
	}

	for (const [specifier, names] of relativeGroups) {
		if (seenSpecifiers.has(specifier)) continue;
		lines.push(formatImport([...names], specifier));
		seenSpecifiers.add(specifier);
	}

	return lines;
}

function dedent(text) {
	const lines = text.split("\n");
	const indents = lines
		.slice(1)
		.filter((l) => l.trim())
		.map((l) => l.match(/^\s*/)[0].length);
	if (indents.length === 0) return text;
	const min = Math.min(...indents);
	return lines
		.map((line, i) => (i === 0 ? line : line.slice(min)))
		.join("\n")
		.trim();
}

/*
 * Converte o objeto `args` de uma story em JSX legível:
 *   { children: "Button", variant: "default" }
 *   -> <Button variant="default">Button</Button>
 */
function parseArgsToJsx(argsText, compName) {
	const sourceFile = ts.createSourceFile(
		"args.ts",
		`const a = ${argsText}`,
		ts.ScriptTarget.Latest,
		true,
	);

	const decl = sourceFile.statements[0]?.declarationList?.declarations?.[0];
	if (!decl?.initializer || !ts.isObjectLiteralExpression(decl.initializer)) return null;

	let children = null;
	const attrs = [];

	for (const prop of decl.initializer.properties) {
		if (!ts.isPropertyAssignment(prop) || !prop.name) continue;
		const key = ts.isIdentifier(prop.name)
			? prop.name.text
			: ts.isStringLiteral(prop.name)
				? prop.name.text
				: null;
		if (!key) continue;

		const init = prop.initializer;

		if (key === "children") {
			children = ts.isStringLiteral(init) ? init.text : `{${init.getText(sourceFile)}}`;
			continue;
		}

		if (ts.isStringLiteral(init)) {
			attrs.push(`${key}="${init.text}"`);
		} else if (init.kind === ts.SyntaxKind.TrueKeyword) {
			attrs.push(key);
		} else {
			attrs.push(`${key}={${init.getText(sourceFile)}}`);
		}
	}

	const attrText = attrs.length ? ` ${attrs.join(" ")}` : "";
	return children === null
		? `<${compName}${attrText} />`
		: `<${compName}${attrText}>${children}</${compName}>`;
}

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

/*
 * Nomes exportados pelo componente, para o snippet de import por subpath. O
 * `<name>/index.ts` é sempre um `export *`, então a lista real sai do módulo
 * fonte. Só PascalCase entra: `buttonVariants` e afins são detalhe de
 * implementação e poluiriam o exemplo.
 */
function extractExportNames(sourceContent, compName) {
	const fallback = compName ? [compName] : [];
	if (!sourceContent) return fallback;

	const sourceFile = ts.createSourceFile(
		"component.tsx",
		sourceContent,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TSX,
	);

	const isExported = (node) =>
		node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword);

	const names = new Set();
	for (const stmt of sourceFile.statements) {
		if (ts.isFunctionDeclaration(stmt) && isExported(stmt) && stmt.name) {
			names.add(stmt.name.text);
		} else if (ts.isVariableStatement(stmt) && isExported(stmt)) {
			for (const decl of stmt.declarationList.declarations) {
				if (ts.isIdentifier(decl.name)) names.add(decl.name.text);
			}
		} else if (
			ts.isExportDeclaration(stmt) &&
			!stmt.isTypeOnly &&
			stmt.exportClause &&
			ts.isNamedExports(stmt.exportClause)
		) {
			for (const el of stmt.exportClause.elements) {
				if (!el.isTypeOnly) names.add(el.name.text);
			}
		}
	}

	const components = [...names].filter((name) => /^[A-Z]/.test(name));
	if (components.length === 0) return fallback;

	// O componente homônimo da página vem primeiro; o resto mantém a ordem do arquivo.
	components.sort((a, b) => (a === compName ? -1 : b === compName ? 1 : 0));
	return components;
}

// Import de uma linha só; quebra em várias quando a lista não cabe nos 90 colunas.
function formatImport(names, specifier) {
	const single = `import { ${names.join(", ")} } from "${specifier}";`;
	if (single.length <= 90) return single;
	return ["import {", ...names.map((name) => `\t${name},`), `} from "${specifier}";`].join("\n");
}

function extractProps(sourceFile) {
	if (!sourceFile) return [];
	let parsed = [];
	try {
		parsed = docgenParser.parse(sourceFile);
	} catch {
		return [];
	}

	const rows = [];
	for (const component of parsed) {
		for (const [name, prop] of Object.entries(component.props)) {
			rows.push({
				component: component.displayName,
				name,
				type: formatPropType(prop.type),
				required: prop.required,
				defaultValue: prop.defaultValue?.value ?? null,
				description: prop.description ?? "",
			});
		}
	}
	return rows;
}

/*
 * Descrição do componente, lida do JSDoc da declaração cujo nome é exatamente o
 * do componente. Feito por AST em vez de docgen de propósito: as raízes que são
 * alias de um primitivo (`const Dialog = DialogPrimitive.Root`) não recebem o
 * JSDoc local no docgen — ele devolve a descrição em inglês do Base UI, que
 * vazaria para um site em pt-BR.
 */
function extractComponentDoc(sourceContent, compName) {
	if (!sourceContent) return "";

	const sourceFile = ts.createSourceFile(
		"component.tsx",
		sourceContent,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TSX,
	);

	const readDoc = (node) => {
		const docs = node.jsDoc;
		if (!docs || docs.length === 0) return "";
		const comment = docs[docs.length - 1].comment;
		if (!comment) return "";
		return (typeof comment === "string" ? comment : comment.map((c) => c.text).join("")).trim();
	};

	let found = "";

	const visit = (node) => {
		if (found) return;
		if (
			ts.isVariableStatement(node) &&
			node.declarationList.declarations.some(
				(d) => ts.isIdentifier(d.name) && d.name.text === compName,
			)
		) {
			found = readDoc(node);
		}
		if (ts.isFunctionDeclaration(node) && node.name && node.name.text === compName) {
			found = readDoc(node);
		}
		if (!found) ts.forEachChild(node, visit);
	};

	visit(sourceFile);
	return found;
}

/*
 * docgen reporta uniões de literais como name:"enum" + value:[...]. O nome cru
 * ("enum") não diz nada ao leitor; o que importa são os valores aceitos.
 */
function formatPropType(type) {
	if (!type) return "unknown";
	if (type.name === "enum" && Array.isArray(type.value)) {
		const values = type.value.map((v) => v.value).filter((v) => v !== "undefined");
		if (values.length > 0) return values.join(" | ");
	}
	return type.name;
}

function renderPropsTable(props, compName, pkg) {
	if (props.length === 0) {
		return [
			"## API Reference",
			"",
			`\`${compName}\` não declara props próprias: repassa as props do primitivo`,
			"de Base UI que envolve, mais `className`. Consulte a [documentação do Base UI](https://base-ui.com/react/overview/quick-start)",
			"para a lista completa.",
			"",
		].join("\n");
	}

	// Agrupa por subcomponente (ex.: Card, CardHeader, CardTitle no mesmo arquivo).
	const byComponent = new Map();
	for (const prop of props) {
		if (!byComponent.has(prop.component)) byComponent.set(prop.component, []);
		byComponent.get(prop.component).push(prop);
	}

	const parts = ["## API Reference", ""];

	for (const [component, rows] of byComponent) {
		if (byComponent.size > 1) parts.push(`### ${component}`, "");

		// A coluna Descrição só existe se algum prop tiver JSDoc; senão seria uma
		// coluna inteira de travessões.
		const hasDocs = rows.some((row) => row.description.trim());
		const header = hasDocs ? "| Prop | Tipo | Padrão | Descrição |" : "| Prop | Tipo | Padrão |";
		const divider = hasDocs ? "| --- | --- | --- | --- |" : "| --- | --- | --- |";
		parts.push(header, divider);

		for (const row of rows) {
			const name = row.required ? `\`${row.name}\`\\*` : `\`${row.name}\``;
			const type = `\`${escapeCell(row.type)}\``;
			const def = row.defaultValue ? `\`${escapeCell(String(row.defaultValue))}\`` : "—";
			if (hasDocs) {
				parts.push(`| ${name} | ${type} | ${def} | ${escapeCell(row.description) || "—"} |`);
			} else {
				parts.push(`| ${name} | ${type} | ${def} |`);
			}
		}
		parts.push("");

		if (rows.some((row) => row.required)) {
			parts.push("\\* Prop obrigatória.", "");
		}
	}

	parts.push(`Além destas, \`${compName}\` aceita as props do elemento/primitivo que envolve.`, "");

	return parts.join("\n");
}

async function generateMdx(name, pkg, category) {
	const compName = pascalCase(name);
	const srcDir = path.join(root, "packages", pkg, "src", name);
	const { content: sourceContent, file: sourceFile } = await readSource(pkg, name);

	let storySource = "";
	try {
		storySource = await readFile(path.join(srcDir, `${name}.stories.tsx`), "utf8");
	} catch {}

	const stories = extractStories(storySource);
	const props = extractProps(sourceFile);
	const doc = extractComponentDoc(sourceContent, compName);
	const exportNames = extractExportNames(sourceContent, compName);
	const registryKey = `${pkg}/${name}`;

	const primary = stories[0];
	const rest = stories.slice(1);

	/*
	 * O JSDoc é quebrado em várias linhas para caber no editor; aqui vira
	 * parágrafo corrido. A primeira frase vira a description (o Fumadocs já a
	 * exibe como subtítulo) e o corpo recebe só o restante, para o leitor não
	 * ler a mesma frase duas vezes seguidas.
	 */
	const docText = doc.replace(/\s+/g, " ").trim();
	const firstSentence = docText.match(/^.*?\.(?=\s|$)/)?.[0] ?? docText;
	const docRest = docText.slice(firstSentence.length).trim();
	const description = docText
		? firstSentence
		: `Componente de ${category.toLowerCase()} da biblioteca ${packageLabels[pkg]}.`;

	const isGallery = galleryOnly.has(name);

	const lines = [
		"---",
		`title: ${compName}`,
		// JSON.stringify: as descrições contêm ":" e "`", que quebrariam o YAML cru.
		`description: ${JSON.stringify(
			isGallery ? "Páginas de exemplo compostas com os blocks." : description,
		)}`,
		"---",
		"",
	];

	if (isGallery) {
		lines.push(
			"Páginas completas montadas a partir dos blocks, para servir de ponto de partida.",
			"Não há um componente `PageExamples` para importar: cada exemplo é uma composição —",
			"abra o código de cada um para ver as peças usadas.",
			"",
		);
	} else {
		if (docRest) lines.push(docRest, "");

		lines.push(
			`Disponível em \`@portais-orion/${pkg}\`, na categoria **${category}**.`,
			"",
			"## Instalação",
			"",
			"```bash",
			"# Primitives e blocks são packages separados: instale só o que for usar.",
			...(pkg === "blocks"
				? ["# Os blocks compõem as primitives, então este já traz @portais-orion/ui junto."]
				: []),
			`pnpm add @portais-orion/${pkg}`,
			"```",
			"",
			"## Import",
			"",
			"```tsx",
			formatImport(exportNames, `@portais-orion/${pkg}/${name}`),
			"```",
			"",
			`O import por subpath traz só \`${name}\`. Importar de \`@portais-orion/${pkg}\` também`,
			"funciona e dá no mesmo bundle — os packages são `sideEffects: false`.",
			"",
		);

		// Sem story não há o que renderizar: a seção inteira sai, em vez de virar um heading vazio.
		if (primary) {
			lines.push(
				"## Uso",
				"",
				`<ComponentPreview name="${registryKey}" story="${primary.name}" />`,
				"",
			);
		}

		lines.push(renderPropsTable(props, compName, pkg));
	}

	const examples = isGallery ? stories : rest;
	if (examples.length > 0) {
		lines.push("## Exemplos", "");
		for (const story of examples) {
			lines.push(`### ${humanizeStoryName(story.name)}`, "");
			lines.push(`<ComponentPreview name="${registryKey}" story="${story.name}" />`, "");
		}
	}

	lines.push(
		"## Storybook",
		"",
		`Todas as variações de \`${compName}\`, com controles interativos, vivem no`,
		"[Storybook](http://localhost:6006) do monorepo.",
		"",
	);

	return lines.join("\n");
}

// "WithIcon" -> "With icon"; "SupertransInspiredExample" -> "Supertrans inspired example"
function humanizeStoryName(name) {
	const spaced = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
	return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/*
 * O registry importa as stories de verdade, para que <ComponentPreview>
 * renderize o componente em vez de um placeholder. Gerado junto com o MDX para
 * não sair de sincronia com as categorias acima.
 */
function renderRegistry(entries) {
	const lines = [
		"// GERADO por scripts/generate-docs.mjs — não edite à mão.",
		"import type * as React from 'react';",
		"import type { StoryObj } from '@storybook/react';",
		"",
	];

	entries.forEach((entry, index) => {
		lines.push(
			`import * as s${index} from '../../../../packages/${entry.pkg}/src/${entry.name}/${entry.name}.stories';`,
		);
	});

	lines.push(
		"",
		"export type RegistryEntry = {",
		"  // O componente-alvo vive no meta (default export), não na story:",
		"  // stories sem render() precisam dele para renderizar os args.",
		"  meta: { component?: React.ComponentType<Record<string, unknown>> };",
		"  stories: Record<string, StoryObj>;",
		"  code: Record<string, string>;",
		"};",
		"",
		"export const registry: Record<string, RegistryEntry> = {",
	);

	entries.forEach((entry, index) => {
		const codeEntries = entry.stories
			.map((story) => `      ${JSON.stringify(story.name)}: ${JSON.stringify(story.code)},`)
			.join("\n");
		lines.push(`  ${JSON.stringify(`${entry.pkg}/${entry.name}`)}: {`);
		lines.push(`    meta: s${index}.default as RegistryEntry['meta'],`);
		lines.push(`    stories: s${index} as unknown as Record<string, StoryObj>,`);
		lines.push("    code: {");
		if (codeEntries) lines.push(codeEntries);
		lines.push("    },");
		lines.push("  },");
	});

	lines.push("};", "");
	return lines.join("\n");
}

function renderMeta(title, names, categories) {
	// Fumadocs usa "---Nome---" para separadores de grupo na sidebar.
	const pages = [];
	for (const category of categoryOrder) {
		const inCategory = names.filter((n) => categories[n] === category).sort();
		if (inCategory.length === 0) continue;
		pages.push(`---${category}---`);
		pages.push(...inCategory);
	}
	return JSON.stringify({ title, pages }, null, 2);
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
			`${renderMeta(packageLabels[pkg], names, categories)}\n`,
		);

		for (const name of names) {
			const mdx = await generateMdx(name, pkg, categories[name]);
			await writeFile(path.join(dir, `${name}.mdx`), `${mdx}\n`);

			const srcDir = path.join(root, "packages", pkg, "src", name);
			let storySource = "";
			try {
				storySource = await readFile(path.join(srcDir, `${name}.stories.tsx`), "utf8");
			} catch {}
			const stories = extractStories(storySource);
			if (stories.length > 0) {
				const compName = pascalCase(name);
				const { content: ownSourceContent } = await readSource(pkg, name);
				const exportNames = extractExportNames(ownSourceContent, compName);
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
