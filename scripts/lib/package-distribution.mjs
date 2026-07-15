const SOURCE_TARGET = /^\.\/src\/(.+)\.(ts|tsx)$/;

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
