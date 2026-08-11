import assert from "node:assert/strict";
import test from "node:test";

import {
	extractComponentDoc,
	extractExportNames,
	extractStories,
	formatImport,
	humanizeStoryName,
	pascalCase,
	renderComponentPage,
	renderMeta,
	renderPropsTable,
	renderRegistry,
	storyCodeSnippet,
	toPropRows,
} from "./lib/docs.mjs";

const STORY_SOURCE = `
import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";
import { Button } from "@design-systems-orion/ui";
import { StatusDot } from "../status-dot";
import { DataTable } from "./data-table";

const meta: Meta<typeof DataTable> = { title: "Blocks/DataTable", component: DataTable };
export default meta;
type Story = StoryObj<typeof DataTable>;

function Tabela() {
	return (
		<DataTable data={[]} columns={[]} keyExtractor={(r) => r.id}>
			<StatusDot tone="success" />
			<Button><Plus /> Novo</Button>
		</DataTable>
	);
}

export const Default: Story = {
	render: () => <Tabela />,
};

export const Vazia: Story = {
	args: { isLoading: false, className: "w-full" },
};
`;

test("extractStories lê as stories exportadas, menos o meta", () => {
	const stories = extractStories(STORY_SOURCE);
	assert.deepEqual(
		stories.map((story) => story.name),
		["Default", "Vazia"],
	);
	assert.ok(stories[0].render);
	assert.ok(stories[1].args);
});

test("extractStories devolve lista vazia sem fonte", () => {
	assert.deepEqual(extractStories(""), []);
});

test("o snippet resolve o helper local por trás do render", () => {
	const [defaultStory] = extractStories(STORY_SOURCE);
	const code = storyCodeSnippet(defaultStory, "DataTable", STORY_SOURCE, "blocks", "data-table", [
		"DataTable",
	]);

	assert.match(code, /export function Tabela\(\)/);
	assert.doesNotMatch(code, /<Tabela \/>;\s*$/);
});

test("o snippet importa por subpath público, nunca pelo caminho relativo", () => {
	const [defaultStory] = extractStories(STORY_SOURCE);
	const code = storyCodeSnippet(defaultStory, "DataTable", STORY_SOURCE, "blocks", "data-table", [
		"DataTable",
	]);

	assert.match(code, /from "@design-systems-orion\/blocks\/data-table"/);
	assert.match(code, /from "@design-systems-orion\/blocks\/status-dot"/);
	assert.doesNotMatch(code, /from "\.\.?\//);
});

test("o snippet não arrasta as ferramentas do Storybook", () => {
	const [defaultStory] = extractStories(STORY_SOURCE);
	const code = storyCodeSnippet(defaultStory, "DataTable", STORY_SOURCE, "blocks", "data-table", [
		"DataTable",
	]);

	assert.doesNotMatch(code, /@storybook\/react|storybook\/test/);
});

test("story só com args vira JSX com as props", () => {
	const story = extractStories(STORY_SOURCE)[1];
	const code = storyCodeSnippet(story, "DataTable", STORY_SOURCE, "blocks", "data-table", [
		"DataTable",
	]);

	assert.match(code, /<DataTable isLoading=\{false\} className="w-full" \/>/);
});

test("fn() do Storybook vira uma função vazia no exemplo", () => {
	const source = `
export const ComAcao = {
	render: () => <Button onClick={fn()}>Salvar</Button>,
};
`;
	const [story] = extractStories(source);
	const code = storyCodeSnippet(story, "Button", source, "ui", "button", ["Button"]);
	assert.doesNotMatch(code, /\bfn\(\)/);
	assert.match(code, /onClick=\{\(\) => \{\}\}/);
});

test('o snippet marca "use client" quando o exemplo usa hooks', () => {
	const source = `
export const Controlado = {
	render: function Demo() {
		const [open, setOpen] = React.useState(false);
		return <Dialog open={open} onOpenChange={setOpen} />;
	},
};
`;
	const [story] = extractStories(source);
	const code = storyCodeSnippet(story, "Dialog", source, "ui", "dialog", ["Dialog"]);
	assert.match(code, /^"use client";/);
});

test("extractExportNames devolve só componentes, o homônimo primeiro", () => {
	const source = `
export const buttonVariants = cva("");
export function Badge() {}
export function Button() {}
`;
	assert.deepEqual(extractExportNames(source, "Button"), ["Button", "Badge"]);
});

test("extractExportNames cai no nome do componente sem fonte", () => {
	assert.deepEqual(extractExportNames("", "Button"), ["Button"]);
});

test("extractComponentDoc lê o JSDoc da declaração homônima", () => {
	const source = `
/** Não é este. */
function outra() {}

/** Etiqueta compacta para status. */
export function Badge() {}
`;
	assert.equal(extractComponentDoc(source, "Badge"), "Etiqueta compacta para status.");
});

test("formatImport quebra em várias linhas quando não cabe", () => {
	assert.equal(formatImport(["Button"], "pkg"), 'import { Button } from "pkg";');
	const longo = formatImport(
		["ComponenteUm", "ComponenteDois", "ComponenteTres", "ComponenteQuatro"],
		"@design-systems-orion/blocks/algum-bloco",
	);
	assert.match(longo, /^import \{\n/);
	assert.ok(longo.split("\n").every((line) => line.length <= 90));
});

test("toPropRows achata o docgen em linhas de tabela", () => {
	const rows = toPropRows([
		{
			displayName: "Badge",
			props: {
				variant: {
					type: { name: "enum", value: [{ value: '"default"' }, { value: "undefined" }] },
					required: false,
					defaultValue: { value: "default" },
					description: "Tom da etiqueta.",
				},
			},
		},
	]);

	assert.deepEqual(rows, [
		{
			component: "Badge",
			name: "variant",
			type: '"default"',
			required: false,
			defaultValue: "default",
			description: "Tom da etiqueta.",
		},
	]);
});

test("a tabela de props marca obrigatórias e some sem props", () => {
	const semProps = renderPropsTable([], "Badge", "ui");
	assert.match(semProps, /não declara props próprias/);

	const tabela = renderPropsTable(
		[
			{
				component: "Badge",
				name: "children",
				type: "ReactNode",
				required: true,
				defaultValue: null,
				description: "",
			},
		],
		"Badge",
		"ui",
	);
	assert.match(tabela, /\| `children`\\\* \|/);
	assert.match(tabela, /Prop obrigatória/);
});

test("renderMeta agrupa na ordem das categorias", () => {
	const meta = JSON.parse(
		renderMeta(
			"Blocks",
			["zebra", "alfa", "meio"],
			{ zebra: "Layout", alfa: "Layout", meio: "Ações" },
			["Ações", "Layout"],
		),
	);

	assert.deepEqual(meta.pages, ["---Ações---", "meio", "---Layout---", "alfa", "zebra"]);
});

test("renderMeta pula categoria sem componente", () => {
	const meta = JSON.parse(renderMeta("UI", ["a"], { a: "Ações" }, ["Ações", "Tabelas"]));
	assert.deepEqual(meta.pages, ["---Ações---", "a"]);
});

test("a página traz instalação, import e preview da primeira story", () => {
	const page = renderComponentPage({
		name: "data-table",
		pkg: "blocks",
		category: "Tabelas",
		sourceContent: "/** Tabela de listagem. Com paginação. */\nexport function DataTable() {}",
		storySource: STORY_SOURCE,
		props: [],
		packageLabel: "Blocks",
	});

	assert.match(page, /^---\ntitle: DataTable\n/);
	assert.match(page, /description: "Tabela de listagem\."/);
	assert.match(page, /pnpm add @design-systems-orion\/blocks/);
	assert.match(page, /<ComponentPreview name="blocks\/data-table" story="Default" \/>/);
	assert.match(page, /## Exemplos/);
});

test("galeria não promete instalação nem API", () => {
	const page = renderComponentPage({
		name: "page-examples",
		pkg: "blocks",
		category: "Layout",
		storySource: STORY_SOURCE,
		packageLabel: "Blocks",
		isGallery: true,
	});

	assert.doesNotMatch(page, /## Instalação|## API Reference/);
	assert.match(page, /<ComponentPreview name="blocks\/page-examples" story="Default" \/>/);
});

test("sem JSDoc a descrição cai no texto padrão da categoria", () => {
	const page = renderComponentPage({
		name: "badge",
		pkg: "ui",
		category: "Exibição de dados",
		sourceContent: "export function Badge() {}",
		packageLabel: "Base UI",
	});

	assert.match(page, /Componente de exibição de dados da biblioteca Base UI\./);
});

test("o registry mapeia entrada por pacote/nome com o código de cada story", () => {
	const registry = renderRegistry([
		{ pkg: "ui", name: "badge", stories: [{ name: "Default", code: "export function X() {}" }] },
	]);

	assert.match(
		registry,
		/import \* as s0 from '\.\.\/\.\.\/\.\.\/\.\.\/packages\/ui\/src\/badge\/badge.stories';/,
	);
	assert.match(registry, /"ui\/badge": \{/);
	assert.match(registry, /"Default": "export function X\(\) \{\}"/);
});

test("pascalCase e humanizeStoryName seguem a convenção das páginas", () => {
	assert.equal(pascalCase("data-table"), "DataTable");
	assert.equal(humanizeStoryName("WithIcon"), "With icon");
	assert.equal(humanizeStoryName("SupertransInspiredExample"), "Supertrans inspired example");
});
