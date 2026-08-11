import assert from "node:assert/strict";
import { test } from "node:test";

import { type BlocksCopy, defaultBlocksCopy, mergeCopy } from "../src/copy/copy.ts";

test("sem override, o dicionário é o próprio default", () => {
	assert.equal(mergeCopy(defaultBlocksCopy), defaultBlocksCopy);
});

test("override parcial preserva o resto da seção", () => {
	const copy = mergeCopy(defaultBlocksCopy, { dataTable: { empty: "No records found" } });

	assert.equal(copy.dataTable.empty, "No records found");
	assert.equal(copy.dataTable.actionsColumn, defaultBlocksCopy.dataTable.actionsColumn);
});

test("override de uma seção não apaga as outras", () => {
	const copy = mergeCopy(defaultBlocksCopy, { filters: { title: "Filters" } });

	assert.equal(copy.filters.title, "Filters");
	assert.deepEqual(copy.sidebar, defaultBlocksCopy.sidebar);
	assert.deepEqual(copy.appShell, defaultBlocksCopy.appShell);
});

test("o merge não muta o default", () => {
	const antes = structuredClone(defaultBlocksCopy);
	mergeCopy(defaultBlocksCopy, { states: { back: "Back" } });

	assert.deepEqual(defaultBlocksCopy, antes);
});

test("toda seção do dicionário tem texto em todas as chaves", () => {
	for (const section of Object.keys(defaultBlocksCopy) as (keyof BlocksCopy)[]) {
		for (const [key, value] of Object.entries(defaultBlocksCopy[section])) {
			assert.equal(typeof value, "string", `${section}.${key}`);
			assert.ok(value.length > 0, `${section}.${key} vazio`);
		}
	}
});
