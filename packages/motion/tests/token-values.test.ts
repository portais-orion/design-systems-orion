import assert from "node:assert/strict";
import test from "node:test";
import { durationInSeconds, parseEasing } from "../src/token-values.ts";

test("converts CSS milliseconds at the Motion boundary", () => {
	assert.equal(durationInSeconds("240ms"), 0.24);
	assert.equal(durationInSeconds("0.12s"), 0.12);
});

test("missing or invalid tokens cannot create a delayed or negative animation", () => {
	assert.equal(durationInSeconds(""), 0);
	assert.equal(durationInSeconds("-1s"), 0);
	assert.equal(durationInSeconds("240px"), 0);
});

test("preserves the cubic-bezier token without replacing it with an engine default", () => {
	assert.deepEqual(parseEasing("cubic-bezier(0.16, 1, 0.3, 1)"), [0.16, 1, 0.3, 1]);
});
