import assert from "node:assert/strict";
import { test } from "node:test";

import { TONES, type ToneEmphasis, resolveTone, toneClass } from "../src/_internal/tone.ts";

const EMPHASES: ToneEmphasis[] = ["solid", "subtle", "surface", "text", "border", "dot"];

test("todo tom responde a toda ênfase", () => {
	for (const tone of TONES) {
		for (const emphasis of EMPHASES) {
			assert.ok(toneClass(tone, emphasis).length > 0, `${tone}/${emphasis} vazio`);
		}
	}
});

test("nenhuma classe usa paleta crua do Tailwind", () => {
	const rawPalette = /\b(?:bg|text|border|ring)-(?:emerald|amber|red|blue|slate|gray|green)-\d/;
	for (const tone of TONES) {
		for (const emphasis of EMPHASES) {
			const classes = toneClass(tone, emphasis);
			assert.doesNotMatch(classes, rawPalette, `${tone}/${emphasis}: ${classes}`);
		}
	}
});

test("o tom sólido sempre traz um foreground legível", () => {
	for (const tone of TONES) {
		assert.match(toneClass(tone, "solid"), /\btext-/, tone);
	}
});

test("resolveTone aceita os sinônimos herdados dos blocos", () => {
	assert.equal(resolveTone("error"), "danger");
	assert.equal(resolveTone("destructive"), "danger");
	assert.equal(resolveTone("pending"), "warning");
	assert.equal(resolveTone("done"), "success");
	assert.equal(resolveTone("default"), "neutral");
});

test("resolveTone cai em neutral para tom ausente ou desconhecido", () => {
	assert.equal(resolveTone(undefined), "neutral");
	assert.equal(resolveTone(null), "neutral");
	assert.equal(resolveTone("fúcsia"), "neutral");
});

test("ênfase default é subtle", () => {
	assert.equal(toneClass("success"), toneClass("success", "subtle"));
});
