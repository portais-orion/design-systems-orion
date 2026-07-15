import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
	derivePackageDistribution,
	synchronizePackageManifest,
	validatePackageManifest,
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

test("reports missing source and stale publish map", () => {
	const stale = {
		...manifest,
		publishConfig: {
			...manifest.publishConfig,
			exports: { ".": { types: "./old.d.ts", import: "./old.js" } },
		},
	};
	const diagnostics = validatePackageManifest(stale, new Set(["src/index.ts"]));
	assert.ok(diagnostics.some((item) => item.includes("src/button/index.tsx")));
	assert.ok(diagnostics.some((item) => item.includes("publishConfig.exports")));
});

test("accepts synchronized manifest with every source present", () => {
	const synced = synchronizePackageManifest(manifest);
	assert.deepEqual(
		validatePackageManifest(synced, new Set(["src/index.ts", "src/button/index.tsx"])),
		[],
	);
});

test("real package catalogs expose their complete tsup entries", () => {
	for (const path of ["packages/ui/package.json", "packages/blocks/package.json"]) {
		const real = JSON.parse(readFileSync(path, "utf8"));
		const result = derivePackageDistribution(real);
		assert.equal(result.entries.length, Object.keys(real.exports).length);
		assert.ok(result.entries.every((entry) => entry.source.startsWith("src/")));
		assert.deepEqual(
			result.entries.map((entry) => entry.source),
			Object.values(real.exports).map((target) => target.slice(2)),
		);
	}

	const blocks = JSON.parse(readFileSync("packages/blocks/package.json", "utf8"));
	assert.deepEqual(
		derivePackageDistribution(blocks)
			.entries.map((entry) => entry.source)
			.filter((source) =>
				[
					"src/index.ts",
					"src/crud-modal-header/index.ts",
					"src/filters-card/index.ts",
					"src/launcher-card/index.ts",
				].includes(source),
			),
		[
			"src/index.ts",
			"src/crud-modal-header/index.ts",
			"src/filters-card/index.ts",
			"src/launcher-card/index.ts",
		],
	);
});
