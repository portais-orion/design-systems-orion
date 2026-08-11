import assert from "node:assert/strict";
import { test } from "node:test";

import {
	PAGE_MAX_WIDTH_CLASS,
	PAGE_VARIANTS,
	pageContentClass,
} from "../src/_internal/page-regions.ts";

test("só o formulário sozinho centraliza e limita a largura", () => {
	assert.equal(pageContentClass("form", false), "mx-auto w-full max-w-3xl");
	for (const variant of PAGE_VARIANTS) {
		if (variant === "form") continue;
		assert.doesNotMatch(pageContentClass(variant, false), /max-w-/, variant);
	}
});

test("com aside toda variante protege a coluna com min-w-0", () => {
	for (const variant of PAGE_VARIANTS) {
		assert.match(pageContentClass(variant, true), /\bmin-w-0\b/, variant);
	}
});

test("sem aside nenhuma variante carrega min-w-0", () => {
	for (const variant of PAGE_VARIANTS) {
		assert.doesNotMatch(pageContentClass(variant, false), /\bmin-w-0\b/, variant);
	}
});

test("o formulário com aside não empilha o próprio espaçamento", () => {
	assert.equal(pageContentClass("form", true), "min-w-0");
});

test("toda largura máxima nomeada existe", () => {
	assert.equal(PAGE_MAX_WIDTH_CLASS.none, "");
	assert.match(PAGE_MAX_WIDTH_CLASS["screen-xl"], /max-w-screen-xl/);
	assert.match(PAGE_MAX_WIDTH_CLASS["screen-2xl"], /max-w-screen-2xl/);
});
