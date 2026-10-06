import assert from "node:assert/strict";
import test from "node:test";
import { resolveMotionPolicy } from "../src/policy.ts";

test("disabled motion remains disabled regardless of system preference", () => {
	assert.deepEqual(
		resolveMotionPolicy({ enabled: false, reducedMotion: "user", userPrefersReducedMotion: false }),
		{ enabled: false, reduceMotion: true },
	);
});

test("system reduced motion takes precedence over local activation", () => {
	assert.deepEqual(
		resolveMotionPolicy({ enabled: true, reducedMotion: "user", userPrefersReducedMotion: true }),
		{ enabled: true, reduceMotion: true },
	);
});

test("always reduces motion even if the system permits it", () => {
	assert.deepEqual(
		resolveMotionPolicy({
			enabled: true,
			reducedMotion: "always",
			userPrefersReducedMotion: false,
		}),
		{ enabled: true, reduceMotion: true },
	);
});

test("unknown preference stays reduced until the client resolves it", () => {
	assert.deepEqual(
		resolveMotionPolicy({ enabled: true, reducedMotion: "user", userPrefersReducedMotion: null }),
		{ enabled: true, reduceMotion: true },
	);
});

test("activated motion follows a known unrestricted system preference", () => {
	assert.deepEqual(
		resolveMotionPolicy({ enabled: true, reducedMotion: "user", userPrefersReducedMotion: false }),
		{ enabled: true, reduceMotion: false },
	);
});
