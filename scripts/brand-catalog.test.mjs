import assert from "node:assert/strict";
import test from "node:test";

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
