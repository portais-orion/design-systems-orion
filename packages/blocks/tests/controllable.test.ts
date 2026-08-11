import assert from "node:assert/strict";
import { test } from "node:test";

import { resolveControllable, shouldUpdateInternal } from "../src/_internal/use-controllable.ts";

test("quem controla de fora vence o estado interno", () => {
	assert.equal(resolveControllable(true, false), true);
	assert.equal(resolveControllable(false, true), false);
});

test("sem valor controlado, vale o interno", () => {
	assert.equal(resolveControllable(undefined, true), true);
	assert.equal(resolveControllable<boolean>(undefined, false), false);
});

test("false controlado não é confundido com ausência de controle", () => {
	assert.equal(shouldUpdateInternal(false), false);
	assert.equal(shouldUpdateInternal(undefined), true);
});
