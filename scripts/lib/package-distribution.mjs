import { posix } from "node:path";

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

function packageDiagnostic(name, subpath, field, actual, expected) {
	return `${name}: subpath ${subpath}; ${field}; atual=${stableJson(actual)}; esperado=${stableJson(expected)}`;
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
		files: ["dist"],
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
		files: distribution.files,
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
			diagnostics.push(
				packageDiagnostic(manifest.name, entry.subpath, "source", "ausente", entry.source),
			);
		}
	}

	const derivedFields = [
		["<pacote>", "files", manifest.files, distribution.files],
		[".", "publishConfig.main", manifest.publishConfig?.main, distribution.publishConfig.main],
		[
			".",
			"publishConfig.module",
			manifest.publishConfig?.module,
			distribution.publishConfig.module,
		],
		[".", "publishConfig.types", manifest.publishConfig?.types, distribution.publishConfig.types],
		[
			Object.keys(distribution.publishConfig.exports).join(", "),
			"publishConfig.exports",
			manifest.publishConfig?.exports,
			distribution.publishConfig.exports,
		],
	];
	for (const [subpath, field, actual, expected] of derivedFields) {
		if (stableJson(actual) !== stableJson(expected)) {
			diagnostics.push(packageDiagnostic(manifest.name, subpath, field, actual, expected));
		}
	}

	return diagnostics;
}

export function validateDistArtifacts(manifest, distFiles) {
	const diagnostics = [];
	const distribution = derivePackageDistribution(manifest);

	for (const entry of distribution.entries) {
		for (const target of [entry.importTarget, entry.typesTarget]) {
			const artifact = target.slice(2);
			if (!distFiles.has(artifact)) {
				diagnostics.push(`${manifest.name}: artefato de distribuição ausente: ${artifact}`);
			}
		}
	}

	return diagnostics;
}

const PACKED_ENTRY_FIELDS = ["main", "module", "types"];
const DEPENDENCY_FIELDS = ["dependencies", "optionalDependencies", "peerDependencies"];

function visitStrings(value, path, visit) {
	if (typeof value === "string") {
		visit(value, path);
		return;
	}
	if (Array.isArray(value)) {
		for (const [index, item] of value.entries()) {
			visitStrings(item, `${path}[${index}]`, visit);
		}
		return;
	}
	if (value !== null && typeof value === "object") {
		for (const [key, item] of Object.entries(value)) {
			visitStrings(item, `${path}.${key}`, visit);
		}
	}
}

function decodePathTarget(target) {
	let decoded = target;
	for (let depth = 0; depth < 5; depth += 1) {
		if (/%(?:2e|2f|5c)/i.test(decoded)) {
			return null;
		}

		let next;
		try {
			next = decodeURIComponent(decoded);
		} catch {
			return null;
		}
		if (next === decoded) {
			return decoded;
		}
		decoded = next;
	}
	return null;
}

function isDistTarget(target) {
	if (!target.startsWith("./dist/") || target.includes("\\")) {
		return false;
	}
	const decoded = decodePathTarget(target);
	if (decoded === null || !decoded.startsWith("./dist/") || decoded.includes("\\")) {
		return false;
	}
	const segments = decoded.slice(2).split("/");
	if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
		return false;
	}
	const normalized = posix.normalize(decoded.slice(2));
	const relativeToDist = posix.relative("dist", normalized);
	return (
		relativeToDist !== "" &&
		!posix.isAbsolute(relativeToDist) &&
		relativeToDist !== ".." &&
		!relativeToDist.startsWith("../")
	);
}

function validatePackedTarget(packageName, field, target, files, diagnostics) {
	if (typeof target !== "string" || !isDistTarget(target)) {
		diagnostics.push(`${packageName}: ${field} aponta fora de ./dist/: ${String(target)}`);
		return;
	}

	const packedFile = `package/${target.slice(2)}`;
	if (!files.has(packedFile)) {
		diagnostics.push(
			`${packageName}: ${field} aponta para ${target}, ausente do inventario; esperado ${packedFile}`,
		);
	}
}

function isAllowedPackedFile(file) {
	if (file === "package/package.json" || /^package\/(README|LICENSE)[^/]*$/i.test(file)) {
		return true;
	}
	if (!file.startsWith("package/dist/") || file.includes("\\")) {
		return false;
	}
	const segments = file.slice("package/dist/".length).split("/");
	return (
		segments.length > 0 &&
		!segments.some((segment) => segment === "" || segment === "." || segment === "..")
	);
}

function isSensitiveFilename(file) {
	const filename = file.split("/").at(-1);
	const sshKeyName = /(^|[._-])id[-_]?(?:rsa|dsa|ecdsa|ed25519)(?:[._-]|$)/i;
	const publicSshKey = /(^|[._-])id[-_]?(?:rsa|dsa|ecdsa|ed25519)(?:-cert)?\.pub$/i;
	const privateKeyword = /(^|[._-])private([._-]|$)/i;
	const privateKeyKeyword = /(^|[._-])private[-_]?key([._-]|$)/i;
	const runtimeModule = /\.(?:[cm]?js|d\.[cm]?ts|map)$/i;

	return (
		/^\.env(?:\..*)?$/i.test(filename) ||
		/^\.npmrc$/i.test(filename) ||
		(sshKeyName.test(filename) && !publicSshKey.test(filename)) ||
		/\.(?:key|p12|pfx|jks|keystore)$/i.test(filename) ||
		/(^|[._-])(secrets?|credentials?|service[-_]?account)([._-]|$)/i.test(filename) ||
		privateKeyKeyword.test(filename) ||
		(privateKeyword.test(filename) && !runtimeModule.test(filename))
	);
}

export function validatePackedArtifact({ manifest, files }) {
	const diagnostics = [];
	const packageName = manifest.name ?? "pacote sem nome";

	if (!files.has("package/package.json")) {
		diagnostics.push(`${packageName}: package/package.json ausente do tarball`);
	}

	for (const file of files) {
		if (!isAllowedPackedFile(file)) {
			diagnostics.push(`${packageName}: arquivo fora das raizes permitidas: ${file}`);
		}
		if (isSensitiveFilename(file)) {
			diagnostics.push(`${packageName}: arquivo sensivel no tarball: ${file}`);
		}
	}

	const exportsIsEmpty =
		manifest.exports === undefined ||
		manifest.exports === null ||
		manifest.exports === "" ||
		(typeof manifest.exports === "object" && Object.keys(manifest.exports).length === 0);
	if (exportsIsEmpty) {
		diagnostics.push(`${packageName}: exports vazio ou ausente no manifest empacotado`);
	}

	for (const field of PACKED_ENTRY_FIELDS) {
		const target = manifest[field];
		if (target !== undefined) {
			validatePackedTarget(packageName, field, target, files, diagnostics);
		}
	}

	visitStrings(manifest.exports, "exports", (target, field) => {
		validatePackedTarget(packageName, field, target, files, diagnostics);
	});

	for (const dependencyField of DEPENDENCY_FIELDS) {
		visitStrings(manifest[dependencyField], dependencyField, (version, field) => {
			if (version.startsWith("workspace:")) {
				diagnostics.push(`${packageName}: ${field} preservou protocolo ${version}`);
			}
		});
	}

	return diagnostics;
}
