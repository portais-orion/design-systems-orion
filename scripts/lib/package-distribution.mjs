const SOURCE_TARGET = /^\.\/src\/(.+)\.(ts|tsx)$/;

function stableJson(value) {
	if (Array.isArray(value)) {
		return `[${value.map(stableJson).join(",")}]`;
	}
	if (value !== null && typeof value === "object") {
		return `{${Object.keys(value)
			.sort()
			.map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
			.join(",")}}`;
	}
	return JSON.stringify(value);
}

function toEntry(name, subpath, target) {
	const match = target.match(SOURCE_TARGET);
	if (!match) {
		throw new Error(
			`${name}: export ${subpath} aponta para ${target}; esperado ./src/*.ts ou .tsx`,
		);
	}
	const relative = match[1];
	return {
		subpath,
		source: target.slice(2),
		importTarget: `./dist/${relative}.mjs`,
		typesTarget: `./dist/${relative}.d.mts`,
	};
}

export function derivePackageDistribution(manifest) {
	const entries = Object.entries(manifest.exports).map(([subpath, target]) =>
		toEntry(manifest.name, subpath, target),
	);
	const root = entries.find((entry) => entry.subpath === ".");
	const exports = Object.fromEntries(
		entries.map((entry) => [
			entry.subpath,
			{
				types: entry.typesTarget,
				import: entry.importTarget,
			},
		]),
	);

	return {
		entries,
		publishConfig: {
			main: root.importTarget,
			module: root.importTarget,
			types: root.typesTarget,
			exports,
		},
	};
}

export function synchronizePackageManifest(manifest) {
	const distribution = derivePackageDistribution(manifest);

	return {
		...manifest,
		files: ["dist"],
		publishConfig: {
			...manifest.publishConfig,
			...distribution.publishConfig,
		},
	};
}

export function validatePackageManifest(manifest, sourceFiles) {
	const distribution = derivePackageDistribution(manifest);
	const diagnostics = [];

	for (const entry of distribution.entries) {
		if (!sourceFiles.has(entry.source)) {
			diagnostics.push(`${manifest.name}: source ausente: ${entry.source}`);
		}
	}

	const derivedFields = [
		["files", manifest.files, ["dist"]],
		["publishConfig.main", manifest.publishConfig?.main, distribution.publishConfig.main],
		["publishConfig.module", manifest.publishConfig?.module, distribution.publishConfig.module],
		["publishConfig.types", manifest.publishConfig?.types, distribution.publishConfig.types],
		["publishConfig.exports", manifest.publishConfig?.exports, distribution.publishConfig.exports],
	];
	for (const [field, actual, expected] of derivedFields) {
		if (stableJson(actual) !== stableJson(expected)) {
			diagnostics.push(`${manifest.name}: ${field} fora de sincronia`);
		}
	}

	return diagnostics;
}
