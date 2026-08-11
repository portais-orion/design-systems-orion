import assert from "node:assert/strict";
import { test } from "node:test";

import {
	type NavigationItem,
	containsActiveItem,
	filterNavigation,
} from "../src/navigation/navigation.types.ts";

const item = (id: string, extra: Partial<NavigationItem> = {}): NavigationItem => ({
	id,
	label: id,
	...extra,
});

test("filterNavigation sem resolvedor devolve a árvore intacta", () => {
	const items = [item("a"), item("b")];
	assert.equal(filterNavigation(items), items);
});

test("filterNavigation remove item negado", () => {
	const items = [item("a"), item("b")];
	const result = filterNavigation(items, (i) => i.id !== "b");
	assert.deepEqual(
		result.map((i) => i.id),
		["a"],
	);
});

test("filterNavigation filtra filhos recursivamente", () => {
	const items = [item("pai", { children: [item("filho-1"), item("filho-2")] })];
	const result = filterNavigation(items, (i) => i.id !== "filho-2");
	assert.deepEqual(
		result[0]?.children?.map((i) => i.id),
		["filho-1"],
	);
});

test("filterNavigation remove grupo sem href que ficou sem filhos", () => {
	const items = [item("grupo", { children: [item("filho")] })];
	assert.deepEqual(
		filterNavigation(items, (i) => i.id !== "filho"),
		[],
	);
});

test("filterNavigation preserva pai com href que ficou sem filhos", () => {
	const items = [item("pai", { href: "/pai", children: [item("filho")] })];
	const result = filterNavigation(items, (i) => i.id !== "filho");
	assert.deepEqual(
		result.map((i) => i.id),
		["pai"],
	);
	assert.deepEqual(result[0]?.children, []);
});

test("containsActiveItem é falso sem item ativo", () => {
	assert.equal(containsActiveItem(item("a")), false);
});

test("containsActiveItem encontra o próprio item", () => {
	assert.equal(containsActiveItem(item("a"), "a"), true);
});

test("containsActiveItem encontra descendente em profundidade", () => {
	const tree = item("a", { children: [item("b", { children: [item("c")] })] });
	assert.equal(containsActiveItem(tree, "c"), true);
	assert.equal(containsActiveItem(tree, "z"), false);
});
