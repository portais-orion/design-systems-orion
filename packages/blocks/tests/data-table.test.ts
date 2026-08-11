import assert from "node:assert/strict";
import { test } from "node:test";

import { columnId, nextSortOrder, resolveDataTableView } from "../src/data-table/data-table.logic.ts";

test("erro vence carregamento e lista vazia", () => {
	assert.equal(resolveDataTableView({ isError: true, isLoading: true, rowCount: 0 }), "error");
	assert.equal(resolveDataTableView({ isError: true, rowCount: 10 }), "error");
});

test("carregando vence lista vazia — o esqueleto ocupa o lugar", () => {
	assert.equal(resolveDataTableView({ isLoading: true, rowCount: 0 }), "loading");
});

test("sem registro e sem carregamento é vazio", () => {
	assert.equal(resolveDataTableView({ rowCount: 0 }), "empty");
});

test("com registro é linhas", () => {
	assert.equal(resolveDataTableView({ rowCount: 1 }), "rows");
});

test("columnId prefere o id explícito, depois a chave, depois a posição", () => {
	assert.equal(columnId({ id: "x", header: "H", accessorKey: "nome" }, 3), "x");
	assert.equal(columnId({ header: "H", accessorKey: "nome" }, 3), "nome");
	assert.equal(columnId({ header: "H" }, 3), "col-3");
});

test("nextSortOrder só inverte na coluna já ordenada em asc", () => {
	assert.equal(nextSortOrder({ sortBy: "nome", sortOrder: "asc" }, "nome"), "desc");
	assert.equal(nextSortOrder({ sortBy: "nome", sortOrder: "desc" }, "nome"), "asc");
	assert.equal(nextSortOrder({ sortBy: "outra", sortOrder: "asc" }, "nome"), "asc");
	assert.equal(nextSortOrder(undefined, "nome"), "asc");
});
