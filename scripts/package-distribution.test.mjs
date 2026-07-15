import assert from "node:assert/strict";
import test from "node:test";
import {
	derivePackageDistribution,
	synchronizePackageManifest,
} from "./lib/package-distribution.mjs";

const manifest = {
	name: "@portais-orion/example",
	files: ["legacy"],
	exports: {
		".": "./src/index.ts",
		"./button": "./src/button/index.tsx",
	},
	publishConfig: {
		access: "restricted",
		registry: "https://npm.pkg.github.com",
	},
};

test("derives tsup entries and dist targets from source exports", () => {
	const result = derivePackageDistribution(manifest);
	assert.deepEqual(result.entries, [
		{
			subpath: ".",
			source: "src/index.ts",
			importTarget: "./dist/index.mjs",
			typesTarget: "./dist/index.d.mts",
		},
		{
			subpath: "./button",
			source: "src/button/index.tsx",
			importTarget: "./dist/button/index.mjs",
			typesTarget: "./dist/button/index.d.mts",
		},
	]);
	assert.deepEqual(result.publishConfig.exports["./button"], {
		types: "./dist/button/index.d.mts",
		import: "./dist/button/index.mjs",
	});
});

test("synchronizes only derived distribution fields", () => {
	const result = synchronizePackageManifest(manifest);
	assert.deepEqual(result.files, ["dist"]);
	assert.equal(result.publishConfig.access, "restricted");
	assert.equal(result.publishConfig.registry, "https://npm.pkg.github.com");
	assert.equal(result.publishConfig.main, "./dist/index.mjs");
	assert.equal(result.exports, manifest.exports);
	assert.notEqual(result, manifest);
});

test("rejects non-TypeScript source exports", () => {
	assert.throws(
		() => derivePackageDistribution({ name: "bad", exports: { ".": "./src/index.js" } }),
		/bad.*\.\/src\/index\.js.*\.ts|\.tsx/s,
	);
});
