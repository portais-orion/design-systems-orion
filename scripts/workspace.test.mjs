import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
	inventoryPackageFiles,
	listDistributablePackages,
	listPublishablePackages,
	listWorkspacePackages,
} from "./lib/workspace.mjs";

function makeTree(files) {
	const root = mkdtempSync(path.join(tmpdir(), "workspace-"));
	for (const [relativePath, content] of Object.entries(files)) {
		const full = path.join(root, ...relativePath.split("/"));
		mkdirSync(path.dirname(full), { recursive: true });
		writeFileSync(full, typeof content === "string" ? content : JSON.stringify(content), "utf8");
	}
	return root;
}

const tsPackage = (name) => ({
	name,
	exports: { ".": "./src/index.ts", "./button": "./src/button/index.ts" },
});

function workspace() {
	return makeTree({
		"packages/ui/package.json": tsPackage("@orion/ui"),
		"packages/blocks/package.json": tsPackage("@orion/blocks"),
		"packages/tokens/package.json": {
			name: "@orion/tokens",
			exports: { "./base.css": "./src/base.css", "./brands.json": "./brands.json" },
		},
		"packages/tsconfig/package.json": { name: "@orion/tsconfig", private: true },
		"packages/ui/src/index.ts": "",
		"packages/ui/src/button/index.ts": "",
		"packages/ui/dist/index.mjs": "",
		"packages/ui/dist/button/index.mjs": "",
	});
}

test("lista todo pacote de packages/* em ordem estável", (t) => {
	const root = workspace();
	t.after(() => rmSync(root, { recursive: true, force: true }));

	assert.deepEqual(
		listWorkspacePackages(root).map((pkg) => pkg.name),
		["@orion/blocks", "@orion/tokens", "@orion/tsconfig", "@orion/ui"],
	);
});

test("pacote private fica fora dos publicáveis", (t) => {
	const root = workspace();
	t.after(() => rmSync(root, { recursive: true, force: true }));

	assert.deepEqual(
		listPublishablePackages(root).map((pkg) => pkg.name),
		["@orion/blocks", "@orion/tokens", "@orion/ui"],
	);
});

test("distribuíveis são só os que exportam fonte TypeScript", (t) => {
	const root = workspace();
	t.after(() => rmSync(root, { recursive: true, force: true }));

	assert.deepEqual(
		listDistributablePackages(root).map((pkg) => pkg.name),
		["@orion/blocks", "@orion/ui"],
	);
});

test("o inventário devolve caminhos relativos à raiz do pacote", (t) => {
	const root = workspace();
	t.after(() => rmSync(root, { recursive: true, force: true }));

	const ui = path.join(root, "packages", "ui");
	assert.deepEqual([...inventoryPackageFiles(ui, "src")].sort(), [
		"src/button/index.ts",
		"src/index.ts",
	]);
	assert.deepEqual([...inventoryPackageFiles(ui, "dist")].sort(), [
		"dist/button/index.mjs",
		"dist/index.mjs",
	]);
});

test("subdiretório ausente devolve inventário vazio, não erro", (t) => {
	const root = workspace();
	t.after(() => rmSync(root, { recursive: true, force: true }));

	const blocks = path.join(root, "packages", "blocks");
	assert.equal(inventoryPackageFiles(blocks, "dist").size, 0);
});

test("workspace sem diretório packages não quebra", (t) => {
	const root = makeTree({ "package.json": { name: "raiz" } });
	t.after(() => rmSync(root, { recursive: true, force: true }));

	assert.deepEqual(listWorkspacePackages(root), []);
});
