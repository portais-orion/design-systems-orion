import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { runBrandCatalogCli } from "./brand-catalog.mjs";
import {
	deriveBrandArtifacts,
	synchronizeBrandArtifacts,
	validateBrandState,
} from "./lib/brand-catalog.mjs";

const catalog = {
	defaultBrand: "supertrans",
	brands: [
		{ id: "supertrans", label: "Supertrans" },
		{ id: "aurora", label: "Aurora" },
	],
};

test("token validator preserves its executable success contract", () => {
	const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
	const result = spawnSync(
		process.execPath,
		[path.join(repositoryRoot, "packages/tokens/scripts/validate-tokens.mjs")],
		{ cwd: repositoryRoot, encoding: "utf8" },
	);

	assert.equal(result.error, undefined);
	assert.equal(result.status, 0, result.stderr);
	assert.match(result.stdout, /^validate-tokens OK/);
});

test("derives ordered theme imports, exports, toolbar, and default", () => {
	assert.deepEqual(deriveBrandArtifacts(catalog), {
		defaultBrand: "supertrans",
		toolbarItems: [
			{ value: "supertrans", title: "Supertrans" },
			{ value: "aurora", title: "Aurora" },
		],
		themeImports: ['@import "./themes/supertrans.css";', '@import "./themes/aurora.css";'],
		sourceThemeExports: {
			"./themes/supertrans.css": "./src/themes/supertrans.css",
			"./themes/aurora.css": "./src/themes/aurora.css",
		},
		distThemeExports: {
			"./themes/supertrans.css": "./dist/themes/supertrans.css",
			"./themes/aurora.css": "./dist/themes/aurora.css",
		},
	});
});

const identityTokens = [
	"primary",
	"primary-foreground",
	"primary-hover",
	"ring",
	"brand-primary",
	"brand-hover",
	"brand-accent",
	"sidebar",
	"sidebar-foreground",
	"sidebar-primary",
	"sidebar-primary-foreground",
	"sidebar-accent",
	"sidebar-accent-foreground",
	"sidebar-border",
	"sidebar-ring",
];

function createBaseCss() {
	return [
		...identityTokens.map((token) => `--${token}: initial;`),
		...identityTokens.map((token) => `--color-${token}: var(--${token});`),
	].join("\n");
}

function createThemeCss(brand) {
	return [
		":root:not([data-brand]),",
		`:root[data-brand="${brand}"],`,
		`[data-brand="${brand}"] {`,
		...identityTokens.map((token) => `\t--${token}: value;`),
		"}",
	].join("\n");
}

function createState(overrides = {}) {
	return {
		catalog,
		themes: {
			supertrans: createThemeCss("supertrans"),
			aurora: createThemeCss("aurora"),
		},
		baseCss: createBaseCss(),
		indexCss: [
			"/* imports */",
			'@import "./base.css";',
			'@import "./themes/supertrans.css";',
			'@import "./themes/aurora.css";',
			"",
		].join("\n"),
		manifest: {
			name: "@portais-orion/tokens",
			exports: {
				"./index.css": "./src/index.css",
				"./base.css": "./src/base.css",
				"./themes/supertrans.css": "./src/themes/supertrans.css",
				"./themes/aurora.css": "./src/themes/aurora.css",
			},
			publishConfig: {
				access: "restricted",
				exports: {
					"./index.css": "./dist/index.css",
					"./base.css": "./dist/base.css",
					"./themes/supertrans.css": "./dist/themes/supertrans.css",
					"./themes/aurora.css": "./dist/themes/aurora.css",
				},
			},
		},
		...overrides,
	};
}

function findDiagnostic(diagnostics, code) {
	return diagnostics.find((diagnostic) => diagnostic.code === code);
}

test("reports exact catalog diagnostics", () => {
	const cases = [
		[
			{ ...catalog, defaultBrand: "unknown" },
			{
				code: "catalog.defaultBrand",
				path: "packages/tokens/brands.json",
				actual: "unknown",
				expected: ["supertrans", "aurora"],
			},
		],
		[
			{ defaultBrand: "Aurora", brands: [{ id: "Aurora", label: "Aurora" }] },
			{
				code: "catalog.brands[0].id",
				path: "packages/tokens/brands.json",
				actual: "Aurora",
				expected: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
			},
		],
		[
			{
				defaultBrand: "aurora",
				brands: [
					{ id: "aurora", label: "Aurora" },
					{ id: "aurora", label: "Outra" },
				],
			},
			{
				code: "catalog.brand.duplicate-id",
				path: "packages/tokens/brands.json",
				actual: "aurora",
				expected: "unique brand id",
			},
		],
		[
			{
				defaultBrand: "a",
				brands: [
					{ id: "a", label: "Marca X" },
					{ id: "b", label: "  marca   x " },
				],
			},
			{
				code: "catalog.brand.duplicate-label",
				path: "packages/tokens/brands.json",
				actual: "marca x",
				expected: "unique normalized brand label",
			},
		],
	];

	for (const [invalidCatalog, expected] of cases) {
		const diagnostics = validateBrandState(createState({ catalog: invalidCatalog }));
		assert.deepEqual(findDiagnostic(diagnostics, expected.code), expected);
	}
});

test("reports deterministic diagnostics for invalid state and catalog roots", () => {
	assert.deepEqual(validateBrandState(null), [
		{
			code: "state.invalid",
			path: "packages/tokens/brands.json",
			actual: null,
			expected: "object",
		},
	]);
	assert.deepEqual(validateBrandState(createState({ catalog: null })), [
		{
			code: "catalog.invalid",
			path: "packages/tokens/brands.json",
			actual: null,
			expected: "object",
		},
	]);
});

test("aggregates independent state diagnostics when the catalog is invalid", () => {
	assert.deepEqual(
		validateBrandState(
			createState({
				catalog: { ...catalog, defaultBrand: "unknown" },
				indexCss: null,
			}),
		),
		[
			{
				code: "catalog.defaultBrand",
				path: "packages/tokens/brands.json",
				actual: "unknown",
				expected: ["supertrans", "aurora"],
			},
			{
				code: "state.indexCss",
				path: "packages/tokens/src/index.css",
				actual: null,
				expected: "string",
			},
		],
	);
});

test("aggregates missing and orphan theme diagnostics", () => {
	const themes = { supertrans: createThemeCss("supertrans"), polar: createThemeCss("polar") };
	assert.deepEqual(validateBrandState(createState({ themes })), [
		{
			code: "theme.missing",
			path: "packages/tokens/src/themes/aurora.css",
			brand: "aurora",
			actual: null,
			expected: "theme content",
		},
		{
			code: "theme.orphan",
			path: "packages/tokens/src/themes/polar.css",
			brand: "polar",
			actual: "theme content",
			expected: null,
		},
	]);
});

test("reports every required selector independently", () => {
	const selectors = [
		":root:not([data-brand])",
		':root[data-brand="aurora"]',
		'[data-brand="aurora"]',
	];
	for (const selector of selectors) {
		const selectorOccurrence = selector.startsWith(":root") ? selector : `${selector} {`;
		const themes = {
			supertrans: createThemeCss("supertrans"),
			aurora: createThemeCss("aurora").replace(selectorOccurrence, "missing-selector"),
		};
		assert.deepEqual(
			findDiagnostic(validateBrandState(createState({ themes })), "theme.missing-selector"),
			{
				code: "theme.missing-selector",
				path: "packages/tokens/src/themes/aurora.css",
				brand: "aurora",
				actual: null,
				expected: selector,
			},
		);
	}
});

test("reports every required identity token independently", () => {
	for (const token of identityTokens) {
		const themes = {
			supertrans: createThemeCss("supertrans"),
			aurora: createThemeCss("aurora").replace(`--${token}:`, `--missing-${token}:`),
		};
		assert.deepEqual(
			findDiagnostic(validateBrandState(createState({ themes })), "theme.missing-token"),
			{
				code: "theme.missing-token",
				path: "packages/tokens/src/themes/aurora.css",
				brand: "aurora",
				actual: null,
				expected: `--${token}`,
			},
		);
	}
});

test("reports missing base defaults and theme mappings", () => {
	const baseCss = createBaseCss()
		.replace("--sidebar-ring:", "--missing-sidebar-ring:")
		.replace("--color-primary: var(--primary);", "--color-primary: missing;");
	assert.deepEqual(validateBrandState(createState({ baseCss })), [
		{
			code: "base.missing-mapping",
			path: "packages/tokens/src/base.css",
			actual: null,
			expected: "--color-primary: var(--primary)",
		},
		{
			code: "base.missing-default",
			path: "packages/tokens/src/base.css",
			actual: null,
			expected: "--sidebar-ring",
		},
	]);
});

test("reports stale index, source exports, and publish exports", () => {
	const state = createState({
		indexCss: '@import "./themes/aurora.css";\n',
		manifest: {
			name: "@portais-orion/tokens",
			exports: {
				"./base.css": "./src/base.css",
				"./themes/legacy.css": "./src/themes/legacy.css",
			},
			publishConfig: {
				exports: {
					"./base.css": "./dist/base.css",
					"./themes/legacy.css": "./dist/themes/legacy.css",
				},
			},
		},
	});
	const derived = deriveBrandArtifacts(catalog);
	assert.deepEqual(validateBrandState(state), [
		{
			code: "index.theme-imports",
			path: "packages/tokens/src/index.css",
			actual: ['@import "./themes/aurora.css";'],
			expected: derived.themeImports,
		},
		{
			code: "manifest.source-theme-exports",
			path: "packages/tokens/package.json",
			actual: { "./themes/legacy.css": "./src/themes/legacy.css" },
			expected: derived.sourceThemeExports,
		},
		{
			code: "manifest.publish-theme-exports",
			path: "packages/tokens/package.json",
			actual: { "./themes/legacy.css": "./dist/themes/legacy.css" },
			expected: derived.distThemeExports,
		},
	]);
});

test("valid state has no diagnostics and validation does not mutate input", () => {
	const state = createState();
	const before = structuredClone(state);
	assert.deepEqual(validateBrandState(state), []);
	assert.deepEqual(state, before);
});

test("synchronizes only theme imports and preserves all other CSS bytes", () => {
	const indexCss = [
		"/* stable header */",
		'@import "./base.css";',
		'@import "./fonts.css";',
		'@import "./themes/legacy.css";',
		"/* stable middle */",
		'@import "./themes/other.css";',
		"body { color: inherit; }",
		"",
	].join("\r\n");
	const state = createState({
		indexCss,
		manifest: {
			...createState().manifest,
			exports: {
				"./index.css": "./src/index.css",
				"./themes/legacy.css": "./src/themes/legacy.css",
			},
			publishConfig: {
				...createState().manifest.publishConfig,
				exports: {
					"./index.css": "./dist/index.css",
					"./themes/legacy.css": "./dist/themes/legacy.css",
				},
			},
		},
	});

	const result = synchronizeBrandArtifacts(state);
	assert.equal(
		result.indexCss,
		[
			"/* stable header */",
			'@import "./base.css";',
			'@import "./fonts.css";',
			'@import "./themes/supertrans.css";',
			'@import "./themes/aurora.css";',
			"/* stable middle */",
			"body { color: inherit; }",
			"",
		].join("\r\n"),
	);
});

test("separates inserted theme imports from a final import without a newline", () => {
	const result = synchronizeBrandArtifacts(createState({ indexCss: '@import "./base.css";' }));

	assert.equal(
		result.indexCss,
		[
			'@import "./base.css";',
			'@import "./themes/supertrans.css";',
			'@import "./themes/aurora.css";',
			"",
		].join("\n"),
	);
});

test("synchronizes only theme exports and does not mutate the manifest", () => {
	const manifest = {
		name: "@portais-orion/tokens",
		version: "9.9.9",
		exports: {
			"./index.css": "./src/index.css",
			"./themes/legacy.css": "./src/themes/legacy.css",
			"./base.css": "./src/base.css",
		},
		publishConfig: {
			access: "restricted",
			registry: "https://registry.example",
			exports: {
				"./index.css": "./dist/index.css",
				"./themes/legacy.css": "./dist/themes/legacy.css",
				"./base.css": "./dist/base.css",
			},
		},
		custom: { nested: ["preserve", { exactly: true }] },
	};
	const state = createState({ manifest });
	const before = structuredClone(state);
	const result = synchronizeBrandArtifacts(state);

	assert.deepEqual(result.manifest, {
		...manifest,
		exports: {
			"./index.css": "./src/index.css",
			"./themes/supertrans.css": "./src/themes/supertrans.css",
			"./themes/aurora.css": "./src/themes/aurora.css",
			"./base.css": "./src/base.css",
		},
		publishConfig: {
			...manifest.publishConfig,
			exports: {
				"./index.css": "./dist/index.css",
				"./themes/supertrans.css": "./dist/themes/supertrans.css",
				"./themes/aurora.css": "./dist/themes/aurora.css",
				"./base.css": "./dist/base.css",
			},
		},
	});
	assert.deepEqual(state, before);
});

test("rejects invalid catalog and unsafe theme state before synchronization", () => {
	const cases = [
		[createState({ catalog: { ...catalog, defaultBrand: "unknown" } }), "catalog.defaultBrand"],
		[createState({ themes: { supertrans: createThemeCss("supertrans") } }), "theme.missing"],
		[
			createState({
				themes: {
					supertrans: createThemeCss("supertrans"),
					aurora: createThemeCss("aurora").replace("--ring:", "--missing-ring:"),
				},
			}),
			"theme.missing-token",
		],
		[createState({ indexCss: null }), "state.indexCss"],
		[
			createState({
				themes: {
					supertrans: createThemeCss("supertrans"),
					aurora: null,
				},
			}),
			"theme.invalid-content",
		],
		[createState({ manifest: {} }), "state.manifest.exports"],
	];
	for (const [state, code] of cases) {
		assert.throws(() => synchronizeBrandArtifacts(state), {
			name: "TypeError",
			message: `brand state cannot be synchronized: ${code}`,
		});
	}
});

test("throws a deterministic TypeError for a structurally invalid catalog", () => {
	assert.throws(() => deriveBrandArtifacts(null), {
		name: "TypeError",
		message: "catalog.invalid: packages/tokens/brands.json",
	});
});

test("reports theme imports that have inline comments", () => {
	const diagnostics = validateBrandState(
		createState({
			indexCss: [
				'@import "./base.css";',
				'@import "./themes/legacy.css"; /* keep this comment */',
				"",
			].join("\n"),
		}),
	);

	assert.deepEqual(findDiagnostic(diagnostics, "index.theme-imports"), {
		code: "index.theme-imports",
		path: "packages/tokens/src/index.css",
		actual: ['@import "./themes/legacy.css";'],
		expected: deriveBrandArtifacts(catalog).themeImports,
	});
});

test("replaces a commented theme import and preserves its inline comment", () => {
	const result = synchronizeBrandArtifacts(
		createState({
			indexCss: [
				'@import "./base.css";',
				'@import "./themes/legacy.css"; /* keep this comment */',
				"",
			].join("\n"),
		}),
	);

	assert.equal(
		result.indexCss,
		[
			'@import "./base.css";',
			'@import "./themes/supertrans.css";',
			'@import "./themes/aurora.css"; /* keep this comment */',
			"",
		].join("\n"),
	);
});

function createAdapterFileSystem(rootDir, overrides = {}) {
	const state = createState(overrides);
	const files = new Map([
		[path.join(rootDir, "packages/tokens/brands.json"), JSON.stringify(state.catalog)],
		[path.join(rootDir, "packages/tokens/src/base.css"), state.baseCss],
		[path.join(rootDir, "packages/tokens/src/index.css"), state.indexCss],
		[path.join(rootDir, "packages/tokens/package.json"), JSON.stringify(state.manifest)],
		[path.join(rootDir, "packages/tokens/src/themes/supertrans.css"), state.themes.supertrans],
		[path.join(rootDir, "packages/tokens/src/themes/aurora.css"), state.themes.aurora],
	]);
	const writes = [];

	return {
		files,
		writes,
		readDir: async () => ["supertrans.css", "aurora.css"],
		readFile: async (filePath) => {
			if (!files.has(filePath)) throw new Error(`unexpected read: ${filePath}`);
			return files.get(filePath);
		},
		writeFile: async (filePath, content) => {
			writes.push([filePath, content]);
			files.set(filePath, content);
		},
	};
}

test("returns usage failure for missing and unknown modes without file-system access", async () => {
	for (const mode of [undefined, "--unknown"]) {
		const failOnAccess = async () => assert.fail("must not access the file system");
		const result = await runBrandCatalogCli({
			mode,
			rootDir: path.resolve("repo"),
			readFile: failOnAccess,
			writeFile: failOnAccess,
			readDir: failOnAccess,
		});

		assert.equal(result.exitCode, 2);
		assert.match(result.message, /--check\|--write/);
	}
});

test("check aggregates diagnostics and never writes", async () => {
	const rootDir = path.resolve("repo");
	const fs = createAdapterFileSystem(rootDir, {
		baseCss: "",
		indexCss: '@import "./themes/legacy.css";\n',
		manifest: {
			name: "@portais-orion/tokens",
			exports: { "./themes/legacy.css": "./src/themes/legacy.css" },
			publishConfig: {
				exports: { "./themes/legacy.css": "./dist/themes/legacy.css" },
			},
		},
	});

	const result = await runBrandCatalogCli({ mode: "--check", rootDir, ...fs });
	const codes = new Set(result.diagnostics.map(({ code }) => code));

	assert.equal(result.exitCode, 1);
	assert.ok(codes.has("base.missing-default"));
	assert.ok(codes.has("index.theme-imports"));
	assert.ok(codes.has("manifest.source-theme-exports"));
	assert.ok(codes.has("manifest.publish-theme-exports"));
	assert.deepEqual(fs.writes, []);
});

test("write refuses structural or theme failures", async () => {
	const rootDir = path.resolve("repo");
	const fs = createAdapterFileSystem(rootDir, {
		themes: {
			supertrans: createThemeCss("supertrans"),
			aurora: createThemeCss("aurora").replace('[data-brand="aurora"] {', "missing {"),
		},
		indexCss: '@import "./themes/legacy.css";\n',
	});

	const result = await runBrandCatalogCli({ mode: "--write", rootDir, ...fs });

	assert.equal(result.exitCode, 1);
	assert.ok(result.diagnostics.some(({ code }) => code === "theme.missing-selector"));
	assert.deepEqual(fs.writes, []);
});

test("write changes exactly the absolute index and manifest targets", async () => {
	const rootDir = path.resolve("repo");
	const fs = createAdapterFileSystem(rootDir, {
		indexCss: '@import "./base.css";\n@import "./themes/legacy.css";\n',
		manifest: {
			name: "@portais-orion/tokens",
			exports: {
				"./index.css": "./src/index.css",
				"./themes/legacy.css": "./src/themes/legacy.css",
			},
			publishConfig: {
				exports: {
					"./index.css": "./dist/index.css",
					"./themes/legacy.css": "./dist/themes/legacy.css",
				},
			},
		},
	});

	const result = await runBrandCatalogCli({ mode: "--write", rootDir, ...fs });

	assert.equal(result.exitCode, 0);
	assert.deepEqual(
		fs.writes.map(([filePath]) => filePath),
		[
			path.join(rootDir, "packages/tokens/src/index.css"),
			path.join(rootDir, "packages/tokens/package.json"),
		],
	);
	assert.ok(fs.writes.every(([filePath]) => path.isAbsolute(filePath)));
});

test("write rejects an unanchored root before any file-system access", async () => {
	const accesses = [];
	const recordAccess = async (...args) => accesses.push(args);
	const result = await runBrandCatalogCli({
		mode: "--write",
		rootDir: path.join("..", "outside-repo"),
		readFile: recordAccess,
		writeFile: recordAccess,
		readDir: recordAccess,
	});

	assert.equal(result.exitCode, 1);
	assert.equal(result.diagnostics[0].code, "path.root-not-absolute");
	assert.deepEqual(accesses, []);
});

test("successful write preserves unrelated manifest content and stable serialization", async () => {
	const rootDir = path.resolve("repo");
	const fs = createAdapterFileSystem(rootDir, {
		indexCss: '@import "./themes/legacy.css";\n',
		manifest: {
			name: "@portais-orion/tokens",
			version: "9.9.9",
			custom: { keep: true },
			exports: {
				"./base.css": "./src/base.css",
				"./themes/legacy.css": "./src/themes/legacy.css",
			},
			publishConfig: {
				access: "restricted",
				exports: {
					"./base.css": "./dist/base.css",
					"./themes/legacy.css": "./dist/themes/legacy.css",
				},
			},
		},
	});

	const result = await runBrandCatalogCli({ mode: "--write", rootDir, ...fs });
	const manifestWrite = fs.writes.find(
		([filePath]) => filePath === path.join(rootDir, "packages/tokens/package.json"),
	);
	const serialized = manifestWrite[1];
	const manifest = JSON.parse(serialized);

	assert.equal(result.exitCode, 0);
	assert.equal(manifest.version, "9.9.9");
	assert.deepEqual(manifest.custom, { keep: true });
	assert.equal(manifest.publishConfig.access, "restricted");
	assert.match(serialized, /^\{\n\t"name"/);
	assert.ok(serialized.endsWith("\n"));
});
