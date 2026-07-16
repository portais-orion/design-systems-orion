const BRAND_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeLabel(value) {
	return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");
}

function catalogDiagnostics(catalog) {
	if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
		return [
			{
				code: "catalog.invalid",
				path: "packages/tokens/brands.json",
				actual: catalog ?? null,
				expected: "object",
			},
		];
	}

	const diagnostics = [];
	const brands = Array.isArray(catalog.brands) ? catalog.brands : [];
	if (!Array.isArray(catalog.brands) || brands.length === 0) {
		diagnostics.push({
			code: "catalog.brands",
			path: "packages/tokens/brands.json",
			actual: catalog.brands ?? null,
			expected: "non-empty array",
		});
	}

	const seenIds = new Set();
	const seenLabels = new Set();
	for (const [index, brand] of brands.entries()) {
		if (!brand || typeof brand !== "object" || Array.isArray(brand)) {
			diagnostics.push({
				code: `catalog.brands[${index}]`,
				path: "packages/tokens/brands.json",
				actual: brand ?? null,
				expected: "object",
			});
			continue;
		}

		if (typeof brand.id !== "string" || !BRAND_ID.test(brand.id)) {
			diagnostics.push({
				code: `catalog.brands[${index}].id`,
				path: "packages/tokens/brands.json",
				actual: brand.id ?? null,
				expected: BRAND_ID.source,
			});
		} else if (seenIds.has(brand.id)) {
			diagnostics.push({
				code: "catalog.brand.duplicate-id",
				path: "packages/tokens/brands.json",
				actual: brand.id,
				expected: "unique brand id",
			});
		} else {
			seenIds.add(brand.id);
		}

		if (typeof brand.label !== "string" || brand.label.trim() === "") {
			diagnostics.push({
				code: `catalog.brands[${index}].label`,
				path: "packages/tokens/brands.json",
				actual: brand.label ?? null,
				expected: "non-empty string",
			});
		} else {
			const normalizedLabel = normalizeLabel(brand.label);
			if (seenLabels.has(normalizedLabel)) {
				diagnostics.push({
					code: "catalog.brand.duplicate-label",
					path: "packages/tokens/brands.json",
					actual: normalizedLabel,
					expected: "unique normalized brand label",
				});
			} else {
				seenLabels.add(normalizedLabel);
			}
		}
	}

	if (typeof catalog.defaultBrand !== "string" || !seenIds.has(catalog.defaultBrand)) {
		diagnostics.push({
			code: "catalog.defaultBrand",
			path: "packages/tokens/brands.json",
			actual: catalog.defaultBrand ?? null,
			expected: [...seenIds],
		});
	}

	return diagnostics;
}

export function deriveBrandArtifacts(catalog) {
	const diagnostics = catalogDiagnostics(catalog);
	if (diagnostics.length > 0) {
		const first = diagnostics[0];
		throw new TypeError(`${first.code}: ${first.path}`);
	}

	const themeImports = [];
	const sourceThemeExports = {};
	const distThemeExports = {};
	const toolbarItems = [];

	for (const brand of catalog.brands) {
		const exportPath = `./themes/${brand.id}.css`;
		themeImports.push(`@import "${exportPath}";`);
		sourceThemeExports[exportPath] = `./src/themes/${brand.id}.css`;
		distThemeExports[exportPath] = `./dist/themes/${brand.id}.css`;
		toolbarItems.push({ value: brand.id, title: brand.label });
	}

	return {
		defaultBrand: catalog.defaultBrand,
		toolbarItems,
		themeImports,
		sourceThemeExports,
		distThemeExports,
	};
}

const REQUIRED_IDENTITY_TOKENS = [
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

const CATALOG_PATH = "packages/tokens/brands.json";
const BASE_PATH = "packages/tokens/src/base.css";
const INDEX_PATH = "packages/tokens/src/index.css";
const MANIFEST_PATH = "packages/tokens/package.json";

function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function themePath(brand) {
	return `packages/tokens/src/themes/${brand}.css`;
}

function pickThemeExports(exports) {
	if (!isRecord(exports)) return {};
	return Object.fromEntries(Object.entries(exports).filter(([key]) => key.startsWith("./themes/")));
}

function extractThemeImports(indexCss) {
	if (typeof indexCss !== "string") return [];
	const imports = [];
	const pattern = /^[\t ]*@import\s+["']\.\/themes\/([^"']+\.css)["'];(?=[\t ]*(?:\/\*|\r?$))/gm;
	for (const match of indexCss.matchAll(pattern)) {
		imports.push(`@import "./themes/${match[1]}";`);
	}
	return imports;
}

function sameValue(actual, expected) {
	return JSON.stringify(actual) === JSON.stringify(expected);
}

function hasSelector(content, selector) {
	return content.split(/\r?\n/).some((line) => {
		const trimmed = line.trim();
		return trimmed === `${selector},` || trimmed.startsWith(`${selector} {`);
	});
}

export function validateBrandState(input) {
	if (!isRecord(input)) {
		return [
			{
				code: "state.invalid",
				path: CATALOG_PATH,
				actual: input ?? null,
				expected: "object",
			},
		];
	}

	const diagnostics = catalogDiagnostics(input.catalog);
	const hasValidCatalog = diagnostics.length === 0;
	const derived = hasValidCatalog ? deriveBrandArtifacts(input.catalog) : null;
	const registeredIds = hasValidCatalog
		? new Set(input.catalog.brands.map((brand) => brand.id))
		: null;
	const themes = isRecord(input.themes) ? input.themes : null;

	if (!themes) {
		diagnostics.push({
			code: "state.themes",
			path: "packages/tokens/src/themes",
			actual: input.themes ?? null,
			expected: "object keyed by brand id",
		});
	} else if (hasValidCatalog) {
		for (const brand of input.catalog.brands) {
			if (!Object.hasOwn(themes, brand.id)) {
				diagnostics.push({
					code: "theme.missing",
					path: themePath(brand.id),
					brand: brand.id,
					actual: null,
					expected: "theme content",
				});
			}
		}

		for (const [brand, content] of Object.entries(themes)) {
			if (!registeredIds.has(brand)) {
				diagnostics.push({
					code: "theme.orphan",
					path: themePath(brand),
					brand,
					actual: typeof content === "string" ? "theme content" : (content ?? null),
					expected: null,
				});
			}
		}

		for (const brand of input.catalog.brands) {
			const content = themes[brand.id];
			if (typeof content !== "string") {
				if (Object.hasOwn(themes, brand.id))
					diagnostics.push({
						code: "theme.invalid-content",
						path: themePath(brand.id),
						brand: brand.id,
						actual: content ?? null,
						expected: "string",
					});
				continue;
			}
			for (const selector of [
				":root:not([data-brand])",
				`:root[data-brand="${brand.id}"]`,
				`[data-brand="${brand.id}"]`,
			]) {
				if (!hasSelector(content, selector)) {
					diagnostics.push({
						code: "theme.missing-selector",
						path: themePath(brand.id),
						brand: brand.id,
						actual: null,
						expected: selector,
					});
				}
			}
			for (const token of REQUIRED_IDENTITY_TOKENS) {
				if (!content.includes(`--${token}:`)) {
					diagnostics.push({
						code: "theme.missing-token",
						path: themePath(brand.id),
						brand: brand.id,
						actual: null,
						expected: `--${token}`,
					});
				}
			}
		}
	}

	if (typeof input.baseCss !== "string") {
		diagnostics.push({
			code: "state.baseCss",
			path: BASE_PATH,
			actual: input.baseCss ?? null,
			expected: "string",
		});
	} else {
		for (const token of REQUIRED_IDENTITY_TOKENS) {
			if (!input.baseCss.includes(`--${token}:`)) {
				diagnostics.push({
					code: "base.missing-default",
					path: BASE_PATH,
					actual: null,
					expected: `--${token}`,
				});
			}
			const mapping = `--color-${token}: var(--${token})`;
			if (!input.baseCss.includes(mapping)) {
				diagnostics.push({
					code: "base.missing-mapping",
					path: BASE_PATH,
					actual: null,
					expected: mapping,
				});
			}
		}
	}
	if (typeof input.indexCss !== "string") {
		diagnostics.push({
			code: "state.indexCss",
			path: INDEX_PATH,
			actual: input.indexCss ?? null,
			expected: "string",
		});
	} else if (derived) {
		const actualImports = extractThemeImports(input.indexCss);
		if (!sameValue(actualImports, derived.themeImports)) {
			diagnostics.push({
				code: "index.theme-imports",
				path: INDEX_PATH,
				actual: actualImports,
				expected: derived.themeImports,
			});
		}
	}
	if (!isRecord(input.manifest?.exports))
		diagnostics.push({
			code: "state.manifest.exports",
			path: MANIFEST_PATH,
			actual: input.manifest?.exports ?? null,
			expected: "object",
		});
	if (!isRecord(input.manifest?.publishConfig?.exports))
		diagnostics.push({
			code: "state.manifest.publishConfig.exports",
			path: MANIFEST_PATH,
			actual: input.manifest?.publishConfig?.exports ?? null,
			expected: "object",
		});

	const sourceExports = pickThemeExports(input.manifest?.exports);
	if (
		derived &&
		isRecord(input.manifest?.exports) &&
		!sameValue(sourceExports, derived.sourceThemeExports)
	) {
		diagnostics.push({
			code: "manifest.source-theme-exports",
			path: MANIFEST_PATH,
			actual: sourceExports,
			expected: derived.sourceThemeExports,
		});
	}

	const publishExports = pickThemeExports(input.manifest?.publishConfig?.exports);
	if (
		derived &&
		isRecord(input.manifest?.publishConfig?.exports) &&
		!sameValue(publishExports, derived.distThemeExports)
	) {
		diagnostics.push({
			code: "manifest.publish-theme-exports",
			path: MANIFEST_PATH,
			actual: publishExports,
			expected: derived.distThemeExports,
		});
	}

	return diagnostics;
}

const REPAIRABLE_DIAGNOSTICS = new Set([
	"index.theme-imports",
	"manifest.source-theme-exports",
	"manifest.publish-theme-exports",
]);

function replaceThemeExports(exports, derivedThemeExports) {
	const synchronized = {};
	let insertedThemes = false;

	for (const [key, value] of Object.entries(exports)) {
		if (key.startsWith("./themes/")) {
			if (!insertedThemes) {
				Object.assign(synchronized, derivedThemeExports);
				insertedThemes = true;
			}
			continue;
		}
		synchronized[key] = value;
	}

	if (!insertedThemes) Object.assign(synchronized, derivedThemeExports);
	return synchronized;
}

function synchronizeIndexCss(indexCss, themeImports) {
	const eol = indexCss.includes("\r\n") ? "\r\n" : "\n";
	const themePattern =
		/^[\t ]*@import\s+["']\.\/themes\/[^"']+\.css["'];(?:[\t ]*(?:\r?\n|$)|(?=[\t ]*\/\*))/gm;
	let replacedFirst = false;
	let synchronized = indexCss.replace(themePattern, (match) => {
		if (replacedFirst) return "";
		replacedFirst = true;
		const ending = match.endsWith("\r\n") ? "\r\n" : match.endsWith("\n") ? "\n" : "";
		return `${themeImports.join(eol)}${ending}`;
	});

	if (replacedFirst) return synchronized;

	const importPattern = /^[\t ]*@import\s+["'][^"']+["'];[\t ]*(?:\r?\n|$)/gm;
	const imports = [...indexCss.matchAll(importPattern)];
	if (imports.length === 0) return `${themeImports.join(eol)}${eol}${indexCss}`;
	const lastImport = imports.at(-1);
	const insertionPoint = lastImport.index + lastImport[0].length;
	const separator = lastImport[0].endsWith("\n") ? "" : eol;
	synchronized = [
		indexCss.slice(0, insertionPoint),
		`${separator}${themeImports.join(eol)}${eol}`,
		indexCss.slice(insertionPoint),
	].join("");
	return synchronized;
}

export function synchronizeBrandArtifacts(input) {
	const diagnostics = validateBrandState(input);
	const blocking = diagnostics.filter((diagnostic) => !REPAIRABLE_DIAGNOSTICS.has(diagnostic.code));
	if (blocking.length > 0) {
		const error = new TypeError(`brand state cannot be synchronized: ${blocking[0].code}`);
		error.diagnostics = blocking;
		throw error;
	}

	const derived = deriveBrandArtifacts(input.catalog);
	return {
		indexCss: synchronizeIndexCss(input.indexCss, derived.themeImports),
		manifest: {
			...input.manifest,
			exports: replaceThemeExports(input.manifest.exports, derived.sourceThemeExports),
			publishConfig: {
				...input.manifest.publishConfig,
				exports: replaceThemeExports(
					input.manifest.publishConfig.exports,
					derived.distThemeExports,
				),
			},
		},
	};
}
