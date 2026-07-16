import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
	derivePackageDistribution,
	synchronizePackageManifest,
	validateDistArtifacts,
	validatePackageManifest,
	validatePackedArtifact,
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

test("reports each missing runtime and declaration artifact", () => {
	const diagnostics = validateDistArtifacts(manifest, new Set(["dist/index.mjs"]));
	assert.ok(diagnostics.some((item) => item.includes("dist/index.d.mts")));
	assert.ok(diagnostics.some((item) => item.includes("dist/button/index.mjs")));
	assert.ok(diagnostics.some((item) => item.includes("dist/button/index.d.mts")));
});

test("accepts complete dist inventory", () => {
	const files = new Set([
		"dist/index.mjs",
		"dist/index.d.mts",
		"dist/button/index.mjs",
		"dist/button/index.d.mts",
	]);
	assert.deepEqual(validateDistArtifacts(manifest, files), []);
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

const synchronized = synchronizePackageManifest(manifest);
const packed = {
	...synchronized,
	main: synchronized.publishConfig.main,
	module: synchronized.publishConfig.module,
	types: synchronized.publishConfig.types,
	exports: synchronized.publishConfig.exports,
	dependencies: { internal: "1.2.3" },
};

test("accepts package.json plus dist files", () => {
	assert.deepEqual(
		validatePackedArtifact({
			manifest: packed,
			files: new Set([
				"package/package.json",
				"package/dist/index.mjs",
				"package/dist/index.d.mts",
				"package/dist/button/index.mjs",
				"package/dist/button/index.d.mts",
			]),
		}),
		[],
	);
});

test("rejects source, credentials, unknown roots, and workspace dependencies", () => {
	const diagnostics = validatePackedArtifact({
		manifest: {
			...packed,
			exports: { ".": "./src/index.ts" },
			dependencies: { internal: "workspace:*" },
		},
		files: new Set([
			"package/package.json",
			"package/dist/../src/hidden.ts",
			"package/src/index.ts",
			"package/.npmrc",
			"package/private.txt",
		]),
	});
	for (const fragment of [
		"exports",
		"../src/hidden.ts",
		"src",
		".npmrc",
		"private.txt",
		"workspace:*",
	]) {
		assert.ok(diagnostics.some((item) => item.includes(fragment)));
	}
});

test("rejects nested entry targets outside dist and sensitive filenames", () => {
	const diagnostics = validatePackedArtifact({
		manifest: {
			...packed,
			main: "./index.js",
			exports: {
				".": {
					import: "./dist/index.mjs",
					development: { types: "./types/index.d.ts" },
				},
			},
			optionalDependencies: { optional: "workspace:^" },
			peerDependencies: { peer: "workspace:~" },
		},
		files: new Set([
			"package/package.json",
			"package/dist/index.mjs",
			"package/dist/client-secret.json",
			"package/.env.production",
		]),
	});

	for (const fragment of [
		"main",
		"exports",
		"types/index.d.ts",
		"workspace:^",
		"workspace:~",
		"client-secret.json",
		".env.production",
	]) {
		assert.ok(diagnostics.some((item) => item.includes(fragment)));
	}
});

test("rejects encoded and Windows traversal in packed entry targets", () => {
	for (const target of ["./dist/%2e%2e/package.json", "./dist/a\\..\\..\\package.json"]) {
		const diagnostics = validatePackedArtifact({
			manifest: {
				...packed,
				exports: { ".": target },
			},
			files: new Set(["package/package.json", "package/dist/index.mjs"]),
		});

		assert.ok(
			diagnostics.some((item) => item.includes(target)),
			`expected ${target} to be rejected`,
		);
	}
});

test("rejects conventional private key filenames inside dist", () => {
	const diagnostics = validatePackedArtifact({
		manifest: packed,
		files: new Set([
			"package/package.json",
			"package/dist/id_ed25519",
			"package/dist/id-rsa",
			"package/dist/foo-id-rsa.pem",
			"package/dist/foo-id_rsa.pem",
			"package/dist/private.pem",
			"package/dist/private-key.mjs",
		]),
	});

	for (const filename of [
		"id_ed25519",
		"id-rsa",
		"foo-id-rsa.pem",
		"foo-id_rsa.pem",
		"private.pem",
		"private-key.mjs",
	]) {
		assert.ok(diagnostics.some((item) => item.includes(filename)));
	}
});

test("accepts public SSH keys and private-named runtime modules", () => {
	assert.deepEqual(
		validatePackedArtifact({
			manifest: packed,
			files: new Set([
				"package/package.json",
				"package/dist/id_rsa.pub",
				"package/dist/id_ed25519.pub",
				"package/dist/private-api.mjs",
			]),
		}),
		[],
	);
});

test("rejects layered, separated, malformed, and excessive encoding in packed targets", () => {
	for (const target of [
		"./dist/%252e%252e/package.json",
		"./dist/folder%2findex.mjs",
		"./dist/folder%5cindex.mjs",
		"./dist/%zz/index.mjs",
		"./dist/%25252525252e/index.mjs",
	]) {
		const diagnostics = validatePackedArtifact({
			manifest: { ...packed, exports: { ".": target } },
			files: new Set(["package/package.json", "package/dist/index.mjs"]),
		});

		assert.ok(
			diagnostics.some((item) => item.includes(target)),
			`expected ${target} to be rejected`,
		);
	}
});

test("rejects non-canonical packed targets", () => {
	for (const target of ["./dist/a/../index.mjs", "./dist/a//index.mjs", "./dist/./index.mjs"]) {
		const diagnostics = validatePackedArtifact({
			manifest: { ...packed, exports: { ".": target } },
			files: new Set(["package/package.json", "package/dist/index.mjs"]),
		});

		assert.ok(
			diagnostics.some((item) => item.includes(target)),
			`expected ${target} to be rejected`,
		);
	}
});
